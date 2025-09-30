import { useGet } from "@/hooks/api/useReactQueryHooks";
import { GetCommentsAdminApiResponse } from "@/types/admin";

export const useGetCommentsAdmin = ({
  limit = 10,
  page = 1,
  accept,
  sortBy,
}: {
  limit?: number;
  page?: number;
  accept?: boolean;
  sortBy?: string;
}) => {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    ...(accept !== undefined ? { accept: String(accept) } : {}),
    ...(sortBy ? { sortBy } : {}),
  });

  const url = `/v1/comment?${params.toString()}`;

  const { data, isLoading, error } = useGet<GetCommentsAdminApiResponse>(url, {
    queryKey: ["comments-admin", limit, page, accept, sortBy],
  });

  return {
    comments: data?.data?.comments || [],
    total: data?.data?.total || 0,
    page: data?.data?.page || 1,
    limit: data?.data?.limit || limit,
    isLoading,
    error,
  };
};
