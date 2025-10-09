import { useGet } from "@/hooks/api/useReactQueryHooks";
import { MenuItemResponse } from "@/types/main";
import { UseGetItemsAdminProps } from "@/types/admin";

export const useGetItemsAdmin = ({
  page,
  limit,
  search,
  sortBy,
}: UseGetItemsAdminProps) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    ...(search && { search: search }),
  });

  const { data, isLoading, error } = useGet<MenuItemResponse>(
    `/v1/item/admin?${params.toString()}`,
    { queryKey: ["items-admin", page, limit, search, sortBy] }
  );

  return {
    items: data?.data?.items || [],
    total: data?.data?.total || 0,
    page: data?.data?.page || 1,
    limit: data?.data?.limit || limit,
    isLoading,
    error,
  };
};
