import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

// const getApiUrl = (endpoint: string) => {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   if (!baseUrl) {
//     throw new Error("NEXT_PUBLIC_API_URL is not defined");
//   }
//   return baseUrl.endsWith("/")
//     ? `${baseUrl}${endpoint.startsWith("/") ? endpoint.slice(1) : endpoint}`
//     : `${baseUrl}${endpoint}`;
// };

export const getApiUrl = (endpoint: string) => {
  return endpoint.startsWith("/api") ? endpoint : `/api${endpoint}`;
};

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

  throw customError;
};

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const response = await makeRequest(url, options);

    if (response.status === 401) {
      const authState = useAuthStore.getState();
      if (!authState.isAuthenticated && !authState.user) {
        throw { status: 401, message: "کاربر لاگین نیست" };
      }

      console.log("🔄 Trying to refresh token...");

      const refreshResponse = await fetch(getApiUrl("/v1/auth/refresh"), {
        method: "GET",
        credentials: "include",
      });

      if (refreshResponse.ok) {
        console.log("✅ Token refreshed. Retrying original request...");
        useAuthStore.getState().setAuthenticated(true);
        const retry = await makeRequest(url, options);
        return await retry.json();
      } else {
        useAuthStore.getState().resetAuth();
        toast.error("نشست شما منقضی شده، لطفاً دوباره وارد شوید.");
        throw { status: 401, message: "نشست منقضی شده" };
      }
    }

    if (response.ok) {
      return await response.json();
    }

    await onError(response, url);
  } catch (error) {
    if (error instanceof Error && (error as any).statusCode) {
      throw error;
    }
  }
}

type FetchOptions = Omit<RequestInit, "method" | "body">;

export const fetchApi = {
  get: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetchWithAuth(url, { ...options, method: "GET" }) as Promise<T>,

  post: <T, D = any>(
    url: string,
    data?: D,
    options: FetchOptions = {}
  ): Promise<T> => {
    const isFormData = data instanceof FormData;

    return fetchWithAuth(url, {
      ...options,
      method: "POST",
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
      headers: {
        ...(options.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    }) as Promise<T>;
  },

  put: <T, D = any>(
    url: string,
    data?: D,
    options: FetchOptions = {}
  ): Promise<T> => {
    const isFormData = data instanceof FormData;

    return fetchWithAuth(url, {
      ...options,
      method: "PUT",
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
      headers: {
        ...(options.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    }) as Promise<T>;
  },

  delete: <T, D = any>(
    url: string,
    data?: D,
    options: FetchOptions = {}
  ): Promise<T> => {
    const isFormData = data instanceof FormData;

    return fetchWithAuth(url, {
      ...options,
      method: "DELETE",
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
      headers: {
        ...(options.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    }) as Promise<T>;
  },

  patch: <T, D = any>(
    url: string,
    data?: D,
    options: FetchOptions = {}
  ): Promise<T> => {
    const isFormData = data instanceof FormData;

    return fetchWithAuth(url, {
      ...options,
      method: "PATCH",
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
      headers: {
        ...(options.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    }) as Promise<T>;
  },
};
