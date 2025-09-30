import { useGet } from "@/hooks/api/useReactQueryHooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchApi } from "@/hooks/api/useAuthToken";
import { Item, ItemResponse } from "@/types/main";
import { MenuItemResponse } from "@/types/main/menu";

// useGetItems is used to get the items useQuery
export const useGetItems = (
  queryString: string,
  initialData?: MenuItemResponse
) => {
  const endpoint = `/v1/item?${queryString}`;

  return useGet<MenuItemResponse>(endpoint, {
    queryKey: ["items", queryString],
    initialData: initialData,
  });
};

// useGetItemsLanding is used to get the items useQuery
export const useGetItemsLanding = (
  page: number = 1,
  limit: number = 15,
  sortBy: string = "topRated",
  items: Item[] = []
) => {
  const { data, isLoading, isFetching, isRefetching } = useGet<ItemResponse>(
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

  return { data, isLoading: shouldShowLoading, isFetching, isRefetching };
};

// useGetItemsSuspense is used to get the items useSuspenseQuery
export const useGetItemsSuspense = (queryString: string) => {
  return useSuspenseQuery<MenuItemResponse>({
    queryKey: ["items", queryString],
    queryFn: () =>
      fetchApi.get<MenuItemResponse>(`/v1/item?${queryString}`).then((res) => {
        return res;
      }),

    staleTime: 10 * 1000,
  });
};
