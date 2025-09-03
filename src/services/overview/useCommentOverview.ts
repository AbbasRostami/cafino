import { useGet } from "@/hooks/useReactQueryHooks";
import { CommentOverviewResponse } from "@/types/admin/overview";

export const useCommentOverview = () => {
  const { data, isLoading, error } = useGet<CommentOverviewResponse>(
    "/v1/admin/overview/comments",
    {
      queryKey: ["comment-overview"],
    }
  );

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
