import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { fetchApi } from "@/hooks/api/useAuthToken";

type ServerError = Error;

// GET
export const useGet = <T>(
  endpoint: string,
  options?: UseQueryOptions<T, ServerError>
) => {
  return useQuery<T, ServerError>({
    queryKey: options?.queryKey ?? [endpoint],
    queryFn: () => fetchApi.get<T>(endpoint),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// POST
export const usePost = <T, D = any>(
  getUrl: string | ((data: D) => string),
  getBody?: (data: D) => unknown,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => {
      const url = typeof getUrl === "string" ? getUrl : getUrl(data);
      const body = getBody ? getBody(data) : data;
      return fetchApi.post<T>(url, body);
    },
    ...options,
  });
};

// PUT
export const usePut = <T, D = any>(
  getUrl?: (data: D) => string,
  getBody?: (data: D) => unknown,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => {
      const url = getUrl ? getUrl(data) : "";
      const hasBody = typeof getBody === "function";
      const body = hasBody ? getBody(data) : undefined;

      return fetchApi.put<T>(url, body);
    },
    ...options,
  });
};

// DELETE
export const useDelete = <T, D = any>(
  getUrl: (data: D) => string,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => fetchApi.delete<T>(getUrl(data), data),
    ...options,
  });
};

// PATCH
export const usePatch = <T, D = any>(
  getUrl: string | ((data: D) => string),
  getBody?: (data: D) => unknown,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => {
      const url = typeof getUrl === "string" ? getUrl : getUrl(data);
      const body = getBody ? getBody(data) : data;
      return fetchApi.patch<T>(url, body);
    },
    ...options,
  });
};
