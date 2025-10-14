import { usePost } from "@/hooks/api/useReactQueryHooks";
import { CreateContactRequest, CreateContactResponse } from "@/types/admin";
import { formatBlockType, formatRetryAfter } from "@/utils/formatters";
import { toast } from "sonner";

export const useCreateContact = () => {
  return usePost<CreateContactResponse, CreateContactRequest>(
    "/v1/contact",
    (data) => data,
    {
      onSuccess: () => {
        toast.success(
          "پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت."
        );
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 400:
            toast.error(error?.response?.data?.message);
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
            toast.error("خطا در ارسال پیام. لطفاً دوباره تلاش کنید.");
            break;
        }
      },
    }
  );
};
