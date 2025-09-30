import { useGet } from "@/hooks/api/useReactQueryHooks";
import { Item } from "@/types";

export const useGetItemDetails = (
  id: string,
  slug: string,
  initialData?: Item
) => {
  const endpoint = `/v1/item/item-${id}/${slug}`;

  return useGet<Item>(endpoint, {
    queryKey: ["item-details", id, slug],
    initialData: initialData,
  });
};
