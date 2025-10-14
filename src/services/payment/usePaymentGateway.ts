import { usePost } from "@/hooks/api/useReactQueryHooks";
import { formatRetryAfter } from "@/utils/formatters";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface PaymentGatewayRequest {
  addressId: string;
  description: string;
}

export const usePaymentGateway = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePost<PaymentGatewayRequest>(
    "/v1/Payment/gateway",
    (data) => data,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
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
            toast.error("خطا در پرداخت. لطفاً دوباره تلاش کنید.");
            break;
        }
      },
    }
  );

  return { mutate, isPending, error };
};
