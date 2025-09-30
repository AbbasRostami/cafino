import { useGet } from "@/hooks/api/useReactQueryHooks";
import { RevenueOverview } from "@/types/admin";

export const useRevenueOverview = () => {
  const { data, isLoading, error } = useGet<{ data: RevenueOverview }>(
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
