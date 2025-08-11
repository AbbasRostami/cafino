import { useGet, usePost, usePut } from "@/hooks/useReactQueryHooks";
import { ItemUser } from "@/types/main/items-details/items-details";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// See all comments by admin

interface CommentAdmin {
  id: string;
  text: string;
  accept: boolean;
  created_at: string;
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
  };
}

export const useGetCommentsAdmin = ({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page?: number;
}) => {
  const { data, isLoading, error } = useGet<{
    data: CommentAdmin[];
    total: number;
    page: number;
    limit: number;
  }>(`/v1/comment?limit=${limit}&page=${page}`, {
    queryKey: ["comments-admin", limit, page],
  });

  return {
    comments: data?.data || [],
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || limit,
    isLoading,
    error,
  };
};

// get comments for menu item
export interface UserComment {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export interface Comment {
  itemId: string;
  id: string;
  text: string;
  star?: number;
  created_at: string;
  user: ItemUser;
  children?: Comment[];
}

export interface GetCommentsResponse {
  data: {
    comments: Comment[];
    total: number;
    page: number;
    lastPage: number;
  };
  statusCode: number;
}
export type SortBy = "lowestRated" | "highestRated" | "newest" | "oldest";

interface UseGetCommentsItemsProps {
  itemId: string;
  page?: number;
  limit?: number;
  sortBy?: SortBy;
}

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

// Create new comment for menu item

interface AddCommentRequest {
  text: string;
  itemId: string;
  parentId?: string;
  star: number;
}
export const useAddComment = () => {
  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = usePost<AddCommentRequest>(
    () => `/v1/comment`,
    undefined,
    {
      onSuccess: () => {
        toast.success("بعد تایید توسط مدیریت نظر شما با موفقیت اضافه خواهد شد");
        queryClient.invalidateQueries({ queryKey: ["v1/item"] });
        queryClient.invalidateQueries({ queryKey: ["comments-admin"] });
      },
      onError: () => {
        toast.error("خطا در اضافه کردن نظر");
      },
    }
  );

  return { addComment, isPending };
};

// Accept comment for menu item by admin

interface AcceptCommentRequest {
  id: string;
}
export const useAcceptComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = usePut<AcceptCommentRequest>(
    (data) => `/v1/comment/accept/${data?.id}`,
    undefined,
    {
      onSuccess: () => {
        toast.success("نظر با موفقیت قبول شد");
        queryClient.invalidateQueries({ queryKey: ["comments-admin"] });
      },
      onError: () => {
        toast.error("خطا در قبول نظر");
      },
    }
  );

  return { mutate, isPending };
};

// Reject comment for menu item by admin

interface RejectCommentRequest {
  id: string;
}
export const useRejectComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = usePut<RejectCommentRequest>(
    (data) => `/v1/comment/reject/${data?.id}`,
    undefined,
    {
      onSuccess: () => {
        toast.success("نظر با موفقیت رد شد");
        queryClient.invalidateQueries({ queryKey: ["comments-admin"] });
      },
      onError: () => {
        toast.error("خطا در رد نظر");
      },
    }
  );

  return { mutate, isPending };
};
