import { usePost } from "@/hooks/api/useReactQueryHooks";
import { ReplyToContactResponse, UseReplyToContactProps } from "@/types/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useReplyToContact = () => {
  const queryClient = useQueryClient();
  return usePost<ReplyToContactResponse, UseReplyToContactProps>(
    (data) => `/v1/contact/${data.id}/reply`,
    (data) => data.data,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["contacts"] });
        toast.success("پاسخ با موفقیت ارسال شد.");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            "خطا در ارسال پاسخ. لطفاً دوباره تلاش کنید."
        );
      },
    }
  );
};
