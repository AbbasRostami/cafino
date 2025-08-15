import { useGet } from "@/hooks/useReactQueryHooks";
import { FavoriteListResponse } from "@/types/Profile/favorites";

export const useGetFavorites = (limit: number, page: number) => {
  const { data, isLoading, isError, isPending } = useGet<FavoriteListResponse>(
    `/v1/profile/favorites?limit=${limit}&page=${page}`,
    {
      queryKey: ["favorites", limit, page],
    }
  );
  return {
    data: data?.data || [],
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    isLoading,
    isError,
    isPending,
  };
};
