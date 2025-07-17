import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { fetchApi } from "@/hooks/useAuthToken";

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
  url: string,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => fetchApi.post<T>(url, data),
    ...options,
  });
};

// PUT
export const usePut = <T, D = any>(
  url: string,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => fetchApi.put<T>(url, data),
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
  url: string,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => fetchApi.patch<T>(url, data),
    ...options,
  });
};
