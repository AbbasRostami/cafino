import { useGet } from "@/hooks/api/useReactQueryHooks";
import { CommentsResponse, UseGetCommentsItemsProps } from "@/types/main";

export const useGetCommentsItems = ({
  itemId,
  page = 1,
  limit = 10,
  sortBy = "newest",
}: UseGetCommentsItemsProps) => {
  const { data, isLoading, error } = useGet<CommentsResponse>(
    `/v1/comment/${itemId}/comments?limit=${limit}&page=${page}&sortBy=${sortBy}`,
    {
      queryKey: ["comments", itemId, page, limit, sortBy],
    }
  );

  return { data, isLoading, error };
};
