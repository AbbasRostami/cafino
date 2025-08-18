import { useGet } from "@/hooks/useReactQueryHooks";
import { Item } from "@/types/main/items-details";

export const useGetItemDetails = (id: string) => {
  return useGet<{
    data: Item;
    statusCode: number;
  }>(`/v1/item/${id}`, {
    queryKey: ["item-details", id],
  });
};
