import { useGet } from "@/hooks/api/useReactQueryHooks";
import { CommentOverview } from "@/types/admin";

export const useCommentOverview = () => {
  const { data, isLoading, error } = useGet<{ data: CommentOverview }>(
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
