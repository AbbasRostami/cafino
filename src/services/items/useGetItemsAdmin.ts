import { useGet } from "@/hooks/useReactQueryHooks";
import { MenuItemResponse } from "@/types/main/menu/menu";
import { UseGetItemsAdminProps } from "@/types/admin/items";

export const useGetItemsAdmin = ({
  page,
  limit,
  search,
}: UseGetItemsAdminProps) => {
  const { data, isLoading, error } = useGet<MenuItemResponse>(
    `/v1/item/admin?page=${page}&limit=${limit}&search=${search}`,
    {
      queryKey: ["items-admin", page, limit, search],
    }
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
