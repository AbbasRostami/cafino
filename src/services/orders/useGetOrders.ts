import { useGet } from "@/hooks/api/useReactQueryHooks";
import { GetOrdersResponseProfile, GetOrdersParams } from "@/types/Profile";

export const useGetOrders = (params?: GetOrdersParams) => {
  const queryParams = new URLSearchParams();

  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.page) queryParams.append("page", params.page.toString());

  const endpoint = `/v1/profile/orders${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  const { data, isLoading, error } = useGet<{ data: GetOrdersResponseProfile }>(
    endpoint,
    {
      queryKey: ["orders", params],
    }
  );

  return {
    data: data?.data,
    isLoading,
    error,
    total: data?.data?.total || 0,
    page: data?.data?.page || params?.page || 1,
    limit: data?.data?.limit || params?.limit || 4,
  };
};
