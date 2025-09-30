import { usePost } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AddCommentRequest {
  itemId: string;
  rating: number;
  comment: string;
}

export const useAddCommentAdmin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = usePost<AddCommentRequest>(
    () => `/v1/comment`,
    undefined,
    {
      onSuccess: () => {
        toast.success("پاسخ با موفقیت ارسال شد");
        queryClient.invalidateQueries({ queryKey: ["comments-admin"] });
      },
      onError: () => {
        toast.error("خطا در ارسال پاسخ");
      },
    }
  );

  return { mutate, isPending };
};
