import { useGet } from "@/hooks/useReactQueryHooks";
import { ItemOverviewResponse } from "@/types/admin/overview";

export const useItemOverview = () => {
  const { data, isLoading, error } = useGet<ItemOverviewResponse>(
    "/v1/admin/overview/items",
    {
      queryKey: ["item-overview"],
    }
  );

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
