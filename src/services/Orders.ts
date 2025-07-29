import { useGet, usePut } from "@/hooks/useReactQueryHooks";
import { toast } from "sonner";

export const useGetOrders = (limit: number = 4, page: number = 1) => {
  const { data, isLoading, error } = useGet<any>(
    `/v1/profile/orders?limit=${limit}&page=${page}`,
    {
      queryKey: ["orders", limit, page],
    }
  );
  return { data, isLoading, error };
};

export const useCancelOrder = () => {
  const { mutate, isPending, error } = usePut<any>(
    (id: string) => `/v1/profile/orders/${id}`,
    undefined,
    {
      onSuccess: () => toast.success("سفارش با موفقیت لغو شد"),
      onError: () => toast.error("خطا در لغو سفارش"),
    }
  );

  return {
    mutate: (id: string) => mutate(id),
    isPending,
    error,
  };
};
