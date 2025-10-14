import { usePost } from "@/hooks/api/useReactQueryHooks";
import { toast } from "sonner";
import { formatRetryAfter, formatBlockType } from "@/utils/formatters";

export const useSendOTP = () => {
  const { mutate, isPending, error } = usePost<any, { phone: string }>(
    () => "/v1/auth/send-otp",
    undefined,
    {
      onSuccess: () => {
        toast.success("کد تایید با موفقیت ارسال شد");
      },
      onError: (error: any) => {
        console.log(error.blockType);

        switch (error?.statusCode) {
          case 403:
            toast.error("شماره تلفن شما در لیست سیاه قرار دارد");
            break;
          case 409:
            if (error?.retryAfter) {
              const timeText = formatRetryAfter(error.retryAfter);

              toast.error(
                `کد تایید قبلی هنوز معتبر است. ${timeText} دیگر منقضی می‌شود.`
              );
            } else {
              toast.error(
                `کد تایید قبلی هنوز معتبر است. لطفاً از آن استفاده کنید.`
              );
            }
            throw error;
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
            toast.error("خطا در ارسال کد تایید");
            break;
        }
      },
    }
  );
  return { mutate, isPending, error };
};
