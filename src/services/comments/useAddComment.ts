import { usePost } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AddCommentRequest {
  itemId: string;
  rating: number;
  comment: string;
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
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      },
      onError: () => {
        toast.error("خطا در اضافه کردن نظر");
      },
    }
  );

  return { mutate: addComment, isPending };
};
