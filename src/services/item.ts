import { useGet } from "@/hooks/useReactQueryHooks";
import { MenuItemResponse } from "@/types/main/menu/menu";

export const useGetItems = (queryString: string) => {
  const endpoint = `/v1/item?${queryString}`;

  return useGet<MenuItemResponse>(endpoint, {
    queryKey: ["items", queryString],
    staleTime: 10 * 1000,
  });
};
