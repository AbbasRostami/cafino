import { useGet } from "@/hooks/useReactQueryHooks";
import { OrdersResponse } from "@/types/Profile/orders";

export const useGetOrders = (limit: number = 4, page: number = 1) => {
  const { data, isLoading, error } = useGet<OrdersResponse>(
    `/v1/profile/orders?limit=${limit}&page=${page}`,
    {
      queryKey: ["orders", limit, page],
    }
  );
  return { data, isLoading, error };
};
