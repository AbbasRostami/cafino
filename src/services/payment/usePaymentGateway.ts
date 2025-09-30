import { usePost } from "@/hooks/api/useReactQueryHooks";
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
      onError: () => {},
    }
  );

  return { mutate, isPending, error };
};
