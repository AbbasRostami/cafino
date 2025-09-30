import { usePost } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AddReplyRequest {
  text: string;
  itemId: string;
  parentId: string;
}

export const useAddReply = () => {
  const queryClient = useQueryClient();

  const { mutate: addReply, isPending } = usePost<AddReplyRequest>(
    () => `/v1/comment`,
    undefined,
    {
      onSuccess: () => {
        toast.success("پاسخ شما بعد از تایید مدیر به نمایش در خواهد آمد");
        queryClient.invalidateQueries({ queryKey: ["v1/item"] });
        queryClient.invalidateQueries({ queryKey: ["comments-admin"] });
      },
      onError: () => {
        toast.error("خطا در اضافه کردن پاسخ");
      },
    }
  );

  return { mutate: addReply, isPending };
};
