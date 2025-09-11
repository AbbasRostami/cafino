import { useGet } from "@/hooks/useReactQueryHooks";
import { Item, ItemResponse } from "@/types/main";
import { MenuItemResponse } from "@/types/main/menu";

export const useGetItems = (
  queryString: string,
  initialData?: MenuItemResponse
) => {
  const endpoint = `/v1/item?${queryString}`;

  return useGet<MenuItemResponse>(endpoint, {
    queryKey: ["items", queryString],
    staleTime: 10 * 1000,
    initialData: initialData,
  });
};

export const useGetItemsLanding = (
  page: number = 1,
  limit: number = 15,
  sortBy: string = "topRated",
  items: Item[] = []
) => {
  const { data, isLoading, isFetching } = useGet<ItemResponse>(
    `/v1/item?page=${page}&limit=${limit}&sortBy=${sortBy}`,
    {
      queryKey: ["items-landing", page, limit, sortBy],
      staleTime: 0,
      initialData:
        items.length > 0
          ? { data: { items: items, total: 0, page: 1, limit: 15 } }
          : undefined,
    }
  );

  const shouldShowLoading =
    isLoading || (isFetching && !data?.data?.items?.length);

  return { data, isLoading: shouldShowLoading };
};
