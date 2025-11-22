import { usePost } from "@/hooks/api/useReactQueryHooks";
import { formatRetryAfter } from "@/utils/formatters";
import { toast } from "sonner";

export const useResendOTP = () => {
  const { mutate, isPending, error } = usePost<
    any,
    { phone: string; captchaToken: string }
  >(() => "/v1/auth/resend-otp", undefined, {
    onSuccess: () => {
      toast.success("کد تایید مجدداً ارسال شد");
    },
    onError: (error: any) => {
      switch (error?.statusCode) {
        case 403:
          toast.error("شماره تلفن شما در لیست سیاه قرار دارد");
          break;
        case 404:
          toast.error("حسابی با این شماره تلفن ثبت نشده است");
          break;
        case 409:
          toast.error("کد تایید قبلی هنوز معتبر است. لطفاً از آن استفاده کنید");
          break;
        case 422:
          toast.error(
            "لطفاً کپچا را کامل انجام دهید. در صورت ادامه مشکل، صفحه را رفرش کنید."
          );
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
          toast.error("خطا در ارسال مجدد کد تایید");
          break;
      }
    },
  });
  return { mutate, isPending, error };
};
