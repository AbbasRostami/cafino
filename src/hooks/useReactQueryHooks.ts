import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  UseMutationResult,
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
  getUrl: (data: D) => string,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => fetchApi.post<T>(getUrl(data), data),
    ...options,
  });
};

// usePut
export const usePut = <T, D = any>(
  getUrl: (data: D) => string,
  getBody?: (data: D) => D,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => {
      const url = getUrl(data);
      const body = getBody ? getBody(data) : data;
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

export const usePatch = <T, D = any>(
  url: string,
  options?: UseMutationOptions<T, ServerError, D>
): UseMutationResult<T, ServerError, D> => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => fetchApi.patch<T>(url, data),
    ...options,
  });
};
