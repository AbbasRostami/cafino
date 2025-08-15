import { useGet } from "@/hooks/useReactQueryHooks";
import {
  GetCommentsResponse,
  UseGetCommentsItemsProps,
} from "@/types/main/comments";

export const useGetCommentsItems = ({
  itemId,
  page = 1,
  limit = 10,
  sortBy = "newest",
}: UseGetCommentsItemsProps) => {
  const { data, isLoading, error } = useGet<GetCommentsResponse>(
    `/v1/comment/${itemId}/comments?limit=${limit}&page=${page}&sortBy=${sortBy}`,
    {
      queryKey: ["comments", itemId, page, limit, sortBy],
    }
  );

  return { data, isLoading, error };
};
