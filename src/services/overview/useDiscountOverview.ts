import { useGet } from "@/hooks/useReactQueryHooks";
import { DiscountOverviewResponse } from "@/types/admin/overview";

export const useDiscountOverview = () => {
  const { data, isLoading, error } = useGet<DiscountOverviewResponse>(
    "/v1/admin/overview/discounts",
    {
      queryKey: ["discount-overview"],
    }
  );

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
