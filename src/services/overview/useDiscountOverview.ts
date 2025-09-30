import { useGet } from "@/hooks/api/useReactQueryHooks";
import { DiscountOverview } from "@/types/admin";

export const useDiscountOverview = () => {
  const { data, isLoading, error } = useGet<{ data: DiscountOverview }>(
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
