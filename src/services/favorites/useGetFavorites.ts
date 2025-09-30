import { useGet } from "@/hooks/api/useReactQueryHooks";
import { FavoriteListResponse, GetFavoritesParams } from "@/types/Profile";

export const useGetFavorites = (params?: GetFavoritesParams) => {
  const queryParams = new URLSearchParams();

  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.sortBy) queryParams.append("sortBy", params.sortBy);

  const endpoint = `/v1/profile/favorites${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  const { data, isLoading, isError, isPending } = useGet<FavoriteListResponse>(
    endpoint,
    {
      queryKey: ["favorites", params],
    }
  );

  return {
    data: data?.data?.items || [],
    total: data?.data?.total || 0,
    page: data?.data?.page || params?.page || 1,
    limit: data?.data?.limit || params?.limit || 6,
    isLoading,
    isError,
    isPending,
  };
};
