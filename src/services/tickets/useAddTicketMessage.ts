import { usePost } from "@/hooks/api/useReactQueryHooks";
import { AddMessageRequest, AddMessageResponse } from "@/types/Profile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddTicketMessage = (ticketId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePost<
    AddMessageResponse,
    AddMessageRequest
  >(`/v1/ticket/${ticketId}/messages`, (data) => data, {
    onSuccess: () => {
      toast.success("پیام با موفقیت ارسال شد");
      queryClient.invalidateQueries({
        queryKey: ["ticket-messages", ticketId],
      });
      queryClient.invalidateQueries({ queryKey: ["user-tickets"] });
    },
    onError: (error: any) => {
      switch (error?.statusCode) {
        case 401:
          toast.error("دسترسی شما به این بخش محدود شده است");
          break;
        case 403:
          toast.error("دسترسی شما به این بخش محدود شده است");
          break;
        case 404:
          toast.error("تیکت یافت نشد");
          break;
        case 409:
          toast.error("تیکت بسته شده است");
          break;
        case 429:
          if (error?.retryAfter) {
            const minutes = Math.ceil(error?.retryAfter / 60);
            toast.error(
              `تعداد درخواست‌های شما بیش از حد مجاز است. دوباره در ${minutes} دقیقه دیگر تلاش کنید.`
            );
          }
          break;
        default:
          toast.error("خطا در ارسال پیام");
      }
    },
  });

  return { mutate, isPending, error };
};
