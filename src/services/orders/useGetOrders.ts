import { useGet } from "@/hooks/useReactQueryHooks";
import { GetOrdersResponseProfile } from "@/types/Profile";

export const useGetOrders = (limit: number = 4, page: number = 1) => {
  const { data, isLoading, error } = useGet<{ data: GetOrdersResponseProfile }>(
    `/v1/profile/orders?limit=${limit}&page=${page}`,
    {
      queryKey: ["orders", limit, page],
    }
  );
  return { data: data?.data, isLoading, error };
};
