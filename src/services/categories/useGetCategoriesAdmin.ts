import { useGet } from "@/hooks/api/useReactQueryHooks";
import { GetCategoriesResponseAdmin } from "@/types/admin/categories";

export const useGetCategoriesAdmin = ({
  page,
  limit,
}: Pick<GetCategoriesResponseAdmin["data"], "page" | "limit">) => {
  const { data, isLoading, error } = useGet<GetCategoriesResponseAdmin>(
    `/v1/category/admin?limit=${limit}&page=${page}`,
    {
      queryKey: ["categories-admin", page, limit],
    }
  );

  return {
    categories: data?.data?.categories || [],
    total: data?.data?.total || 0,
    page: data?.data?.page || 1,
    limit: data?.data?.limit || limit,
    isLoading,
    error,
  };
};
