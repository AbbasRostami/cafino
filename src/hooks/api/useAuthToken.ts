import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

//  CONSTANTS
const AUTH_ENDPOINTS = {
  REFRESH: "/v1/auth/refresh",
} as const;

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

const ERROR_MESSAGES = {
  SESSION_EXPIRED: "نشست شما منقضی شده، لطفاً دوباره وارد شوید.",
  REFRESH_ERROR: "خطا در بروزرسانی نشست",
  ACCESS_DENIED: "دسترسی شما به این بخش محدود شده است",
  USER_NOT_LOGGED_IN: "کاربر لاگین نیست",
  SESSION_EXPIRED_ERROR: "نشست منقضی شده",
  ACCESS_DENIED_ERROR: "دسترسی محدود شده",
} as const;

// REFRESH TOKEN STATE
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

// GET API URL
export const getApiUrl = (endpoint: string, isServer: boolean = false) => {
  if (isServer) {
    return endpoint.startsWith("http")
      ? endpoint
      : `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  }
  return endpoint.startsWith("/api") ? endpoint : `/api${endpoint}`;
};

// MAKE REQUEST
const makeRequest = (url: string, options: RequestInit) => {
  const fullUrl = getApiUrl(url);
  const isFormData = options.body instanceof FormData;

  const headers = {
    Accept: "application/json",
    ...(options.headers || {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  return fetch(fullUrl, {
    ...options,
    headers,
    credentials: "include",
  });
};

// ON ERROR
const onError = async (response: Response, url: string) => {
  let errorData: any = {};
  try {
    errorData = await response.json();
  } catch {
    errorData = {
      statusCode: response.status,
      message: response.statusText || "Server Error",
      timestamp: new Date().toISOString(),
      path: url,
    };
  }

  const customError = new Error(errorData.message || "Server Error");
  (customError as any).statusCode = errorData.statusCode || response.status;
  (customError as any).message = errorData.message || response.statusText;
  (customError as any).timestamp = errorData.timestamp;
  (customError as any).path = errorData.path || url;
  (customError as any).response = { data: errorData };
  (customError as any).retryAfter = errorData.retryAfter;
  (customError as any).blockType = errorData.blockType;

  throw customError;
};

// FETCH WITH AUTH
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const response = await makeRequest(url, options);

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
      const authState = useAuthStore.getState();

      if (!authState.isAuthenticated && !authState.user) {
        throw {
          status: HTTP_STATUS.UNAUTHORIZED,
          message: ERROR_MESSAGES.USER_NOT_LOGGED_IN,
        };
      }

      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = fetch(getApiUrl(AUTH_ENDPOINTS.REFRESH), {
          method: "GET",
          credentials: "include",
        })
          .then(async (refreshResponse) => {
            if (refreshResponse.ok) {
              useAuthStore.getState().setAuthenticated(true);
              return true;
            } else {
              useAuthStore.getState().resetAuth();
              toast.error(ERROR_MESSAGES.SESSION_EXPIRED);
              return false;
            }
          })
          .catch((error) => {
            useAuthStore.getState().resetAuth();
            toast.error(ERROR_MESSAGES.REFRESH_ERROR);
            return false;
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      if (!refreshPromise) {
        throw {
          status: HTTP_STATUS.UNAUTHORIZED,
          message: ERROR_MESSAGES.REFRESH_ERROR,
        };
      }

      const refreshed = await refreshPromise;

      if (refreshed) {
        const retry = await makeRequest(url, options);

        if (!retry.ok) {
          if (retry.status === HTTP_STATUS.UNAUTHORIZED) {
            useAuthStore.getState().resetAuth();
            toast.error(ERROR_MESSAGES.SESSION_EXPIRED);
            throw {
              status: HTTP_STATUS.UNAUTHORIZED,
              message: ERROR_MESSAGES.SESSION_EXPIRED_ERROR,
            };
          }

          await onError(retry, url);
        }

        const result = await retry.json();
        return result;
      } else {
        throw {
          status: HTTP_STATUS.UNAUTHORIZED,
          message: ERROR_MESSAGES.SESSION_EXPIRED_ERROR,
        };
      }
    }

    if (response.status === HTTP_STATUS.FORBIDDEN) {
      toast.error(ERROR_MESSAGES.ACCESS_DENIED);
      throw {
        status: HTTP_STATUS.FORBIDDEN,
        message: ERROR_MESSAGES.ACCESS_DENIED_ERROR,
      };
    }

    if (response.ok) {
      const result = await response.json();
      return result;
    }

    await onError(response, url);
  } catch (error) {
    if (error instanceof Error && (error as any).statusCode) {
      throw error;
    }

    if (error && typeof error === "object" && "status" in error) {
      throw error;
    }

    throw error;
  }
}

// FETCH OPTIONS
type FetchOptions = Omit<RequestInit, "method" | "body">;

// PREPARE REQUEST BODY
const prepareRequestBody = (
  data: any,
  existingHeaders?: HeadersInit
): { body?: BodyInit; headers: HeadersInit } => {
  const isFormData = data instanceof FormData;

  return {
    body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    headers: {
      ...(existingHeaders || {}),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
  };
};

// FETCH API
export const fetchApi = {
  get: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetchWithAuth(url, { ...options, method: "GET" }) as Promise<T>,

  post: <T, D = any>(
    url: string,
    data?: D,
    options: FetchOptions = {}
  ): Promise<T> => {
    const { body, headers } = prepareRequestBody(data, options.headers);
    return fetchWithAuth(url, {
      ...options,
      method: "POST",
      body,
      headers,
    }) as Promise<T>;
  },

  put: <T, D = any>(
    url: string,
    data?: D,
    options: FetchOptions = {}
  ): Promise<T> => {
    const { body, headers } = prepareRequestBody(data, options.headers);
    return fetchWithAuth(url, {
      ...options,
      method: "PUT",
      body,
      headers,
    }) as Promise<T>;
  },

  delete: <T, D = any>(
    url: string,
    data?: D,
    options: FetchOptions = {}
  ): Promise<T> => {
    const { body, headers } = prepareRequestBody(data, options.headers);
    return fetchWithAuth(url, {
      ...options,
      method: "DELETE",
      body,
      headers,
    }) as Promise<T>;
  },

  patch: <T, D = any>(
    url: string,
    data?: D,
    options: FetchOptions = {}
  ): Promise<T> => {
    const { body, headers } = prepareRequestBody(data, options.headers);
    return fetchWithAuth(url, {
      ...options,
      method: "PATCH",
      body,
      headers,
    }) as Promise<T>;
  },
};
