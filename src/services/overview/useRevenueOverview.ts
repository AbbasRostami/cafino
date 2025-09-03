import { useGet } from "@/hooks/useReactQueryHooks";
import { RevenueOverviewResponse } from "@/types/admin/overview";

export const useRevenueOverview = () => {
  const { data, isLoading, error } = useGet<RevenueOverviewResponse>(
    "/v1/admin/overview/revenue",
    {
      queryKey: ["revenue-overview"],
    }
  );

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
