import { useGet } from "@/hooks/useReactQueryHooks";
import {
  CommentResponseAdmin,
  GetCommentsAdminApiResponse,
} from "@/types/admin";

export const useGetCommentsAdmin = ({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page?: number;
}) => {
  const { data, isLoading, error } = useGet<GetCommentsAdminApiResponse>(
    `/v1/comment?limit=${limit}&page=${page}`,
    {
      queryKey: ["comments-admin", limit, page],
    }
  );

  return {
    comments: data?.data?.comments || [],
    total: data?.data?.total || 0,
    page: data?.data?.page || 1,
    limit: data?.data?.limit || limit,
    isLoading,
    error,
  };
};
