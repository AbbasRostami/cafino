import { getApiUrl } from "@/lib/config";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

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

const onSuccess = async (response: Response) => {
  if (response.ok) return await response.json();
  throw response;
};

const handleErrorStatus = (status: number) => {
  switch (status) {
    case 401:
      toast.error("نشست شما منقضی شده است");
      break;
    case 403:
      toast.error("شما مجوز دسترسی ندارید");
      break;
  }
};

const onError = async (error: Response | Error) => {
  if (error instanceof Response) {
    handleErrorStatus(error.status);
    const data = await error.json().catch(() => null);

    const customError = new Error(
      data?.message || error.statusText || "Server Error"
    );
    (customError as any).response = { data };

    throw customError;
  }

  throw error;
};

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const response = await makeRequest(url, options);

    if (response.status === 401) {
      console.log("🔄 Trying to refresh token...");

      const refreshed = await useAuthStore.getState().refreshToken();

      if (refreshed) {
        console.log("✅ Token refreshed. Retrying original request...");
        const retry = await makeRequest(url, options);
        return await onSuccess(retry);
      } else {
        await useAuthStore.getState().logout();
        toast.error("نشست شما منقضی شده، لطفاً دوباره وارد شوید.");
        throw new Error("نشست منقضی شده");
      }
    }

    if (response.status === 403) {
      throw new Error("دسترسی غیرمجاز");
    }

    return await onSuccess(response);
  } catch (error) {
    return await onError(error as Response | Error);
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
        // Don't set Content-Type for FormData - let browser set it with boundary
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    }) as Promise<T>;
  },
};
