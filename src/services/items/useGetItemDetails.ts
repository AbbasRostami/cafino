import { useGet } from "@/hooks/api/useReactQueryHooks";
import { Item } from "@/types";

export const useGetItemDetails = (
  id: string,
  slug: string,
  initialData?: { data: Item }
) => {
  const endpoint = `/v1/item/item-${id}/${slug}`;

  const result = useGet<{ data: Item }>(endpoint, {
    queryKey: ["item-details", id, slug],
    initialData: initialData,
  });

  return {
    data: result.data?.data,
    isLoading: result.isLoading,
  };
};
