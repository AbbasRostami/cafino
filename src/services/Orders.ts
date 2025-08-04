import { useGet, usePut } from "@/hooks/useReactQueryHooks";
import { toast } from "sonner";
import { OrdersResponse } from "@/types/Profile";
import { useQueryClient } from "@tanstack/react-query";

export const useGetOrders = (limit: number = 4, page: number = 1) => {
  const { data, isLoading, error } = useGet<OrdersResponse>(
    `/v1/profile/orders?limit=${limit}&page=${page}`,
    {
      queryKey: ["orders", limit, page],
    }
  );
  return { data, isLoading, error };
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePut(
    (id: string) => `/v1/profile/orders/{id}?id=${id}`,
    () => undefined,
    {
      onSuccess: () => {
        toast.success("سفارش با موفقیت لغو شد");
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
      onError: () => toast.error("خطا در لغو سفارش"),
    }
  );

  return {
    mutate: (id: string) => mutate(id),
    isPending,
    error,
  };
};
