import { useGet } from "@/hooks/api/useReactQueryHooks";
import { ItemOverview } from "@/types/admin";

export const useItemOverview = () => {
  const { data, isLoading, error } = useGet<{ data: ItemOverview }>(
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
