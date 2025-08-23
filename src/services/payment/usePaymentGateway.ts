import { usePost } from "@/hooks/useReactQueryHooks";
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
        toast.success("درگاه پرداخت با موفقیت ایجاد شد");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },
      onError: () => {
        toast.error("خطا در ایجاد درگاه پرداخت");
      },
    }
  );

  return { mutate, isPending, error };
};
