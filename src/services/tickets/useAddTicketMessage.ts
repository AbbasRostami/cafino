import { usePost } from "@/hooks/api/useReactQueryHooks";
import { AddMessageRequest, AddMessageResponse } from "@/types/Profile";
import { formatRetryAfter } from "@/utils/formatters";
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
          const blockType429 = error?.blockType || "temporary";

          if (blockType429 === "permanent") {
            toast.error(
              "دسترسی شما به سیستم محدود شده است. برای رفع این مشکل با پشتیبانی تماس بگیرید.",
              {
                duration: 10000,
                action: {
                  label: "تماس با پشتیبانی",
                  actionButtonStyle: {
                    backgroundColor: "red",
                    color: "white",
                  },
                  onClick: () => {
                    window.location.href = "/contact-us";
                  },
                },
              }
            );
          } else if (error?.retryAfter) {
            const timeText = formatRetryAfter(error.retryAfter);
            toast.error(
              `تعداد درخواست‌ها بیش از حد مجاز است. دوباره در ${timeText} دیگر تلاش کنید.`
            );
          } else {
            toast.error(
              "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً بعداً تلاش کنید."
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
