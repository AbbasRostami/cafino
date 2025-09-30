import { useGet } from "@/hooks/api/useReactQueryHooks";
import { OrderOverview } from "@/types/admin";

export const useOrderOverview = () => {
  const { data, isLoading, error } = useGet<{ data: OrderOverview }>(
    "/v1/admin/overview/orders",
    {
      queryKey: ["order-overview"],
    }
  );

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
