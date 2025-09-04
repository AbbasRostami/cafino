import { useGet } from "@/hooks/useReactQueryHooks";
import { Item } from "@/types";

export const useGetItemDetails = (id: string, initialItem?: Item) => {
  const { data, isLoading, isFetching } = useGet<{
    data: { item: Item };
    statusCode: number;
  }>(`/v1/item/${id}`, {
    queryKey: ["item-details", id],
    initialData: initialItem
      ? { data: { item: initialItem }, statusCode: 200 }
      : undefined,
    staleTime: 0,
  });

  const shouldShowLoading = isLoading || (isFetching && !data?.data?.item);

  return {
    data: data?.data?.item,
    isLoading: shouldShowLoading,
  };
};
