import { useGet } from "@/hooks/useReactQueryHooks";
import { OrderOverviewResponse } from "@/types/admin/overview";

export const useOrderOverview = () => {
  const { data, isLoading, error } = useGet<OrderOverviewResponse>(
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
