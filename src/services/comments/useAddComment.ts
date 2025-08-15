import { usePost } from "@/hooks/useReactQueryHooks";
import { AddCommentRequest } from "@/types/main/comments";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = usePost<AddCommentRequest>(
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

  return { mutate, isPending };
};
