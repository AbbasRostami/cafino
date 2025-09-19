import { useGet } from "@/hooks/useReactQueryHooks";
import { Item } from "@/types";

export const useGetItemDetails = (id: string, initialData?: Item) => {
  const endpoint = `/v1/item/${id}`;

  return useGet<Item>(endpoint, {
    queryKey: ["item-details", id],
    initialData: initialData,
  });
};
