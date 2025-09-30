import { useGet } from "@/hooks/api/useReactQueryHooks";

interface PaymentVerifyRequest {
  authority: string;
  status: string;
}

export const usePaymentVerify = (data: PaymentVerifyRequest) => {
  const {
    data: paymentVerifyData,
    isLoading,
    error,
  } = useGet<PaymentVerifyRequest>(
    `/v1/Payment/verify?Authority=${data?.authority}&Status=${data?.status}`,
    {
      queryKey: ["payment-verify", data?.authority, data?.status],
    }
  );
  return { data: paymentVerifyData, isLoading, error };
};
