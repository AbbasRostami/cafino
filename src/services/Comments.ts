import { useGet, usePost, usePut } from "@/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// See all comments by admin

interface Comment {
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

export const useGetComments = (limit: number = 10, page: number = 1) => {
  return useGet<{
    data: Comment[];
    total: number;
    page: number;
    limit: number;
  }>(`/v1/comment?limit=${limit}&page=${page}`, {
    queryKey: ["comments"],
  });
};

// Create new comment for menu item

interface AddCommentRequest {
  text: string;
  itemId: string;
  parentId?: string;
}
export const useAddComment = () => {
  const queryClient = useQueryClient();

  return usePost<AddCommentRequest>((data) => `/v1/comment`, {
    onSuccess: () => {
      toast.success("بعد تایید توسط مدیریت نظر شما با موفقیت اضافه خواهد شد");
      queryClient.invalidateQueries({ queryKey: ["v1/item"] });
    },
    onError: () => {
      toast.error("خطا در اضافه کردن نظر");
    },
  });
};

// Accept comment for menu item by admin

interface AcceptCommentRequest {
  id: string;
}
export const useAcceptComment = () => {
  const queryClient = useQueryClient();

  return usePut<AcceptCommentRequest>(
    (data) => `/v1/comment/accept/${data?.id}`,
    {
      onSuccess: () => {
        toast.success("نظر با موفقیت قبول شد");
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      },
      onError: () => {
        toast.error("خطا در قبول نظر");
      },
    }
  );
};

// Reject comment for menu item by admin

interface RejectCommentRequest {
  id: string;
}
export const useRejectComment = () => {
  const queryClient = useQueryClient();

  return usePut<RejectCommentRequest>(
    (data) => `/v1/comment/reject/${data?.id}`,
    {
      onSuccess: () => {
        toast.success("نظر با موفقیت رد شد");
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      },
      onError: () => {
        toast.error("خطا در رد نظر");
      },
    }
  );
};
