import { usePost } from "@/hooks/api/useReactQueryHooks";
import { CreateTicketRequest, CreateTicketResponse } from "@/types/Profile";
import { formatRetryAfter } from "@/utils/formatters";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePost<
    CreateTicketResponse,
    CreateTicketRequest
  >("/v1/ticket", (data) => data, {
    gcTime: 0,
    onSuccess: () => {
      toast.success("تیکت با موفقیت ایجاد شد");
      queryClient.invalidateQueries({ queryKey: ["user-tickets"] });
    },
    onError: (error: any) => {
      switch (error?.statusCode) {
        case 409:
          if (error?.retryAfter) {
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
          }
          break;
        default:
          toast.error("خطا در ایجاد تیکت");
          break;
      }
    },
  });

  return { mutate, isPending, error };
};
