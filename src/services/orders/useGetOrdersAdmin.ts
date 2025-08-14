import { useGet } from "@/hooks/useReactQueryHooks";
import { GetOrdersResponse } from "@/types/admin";

export const useGetOrdersAdmin = ({
  limit = 4,
  page = 1,
}: {
  limit?: number;
  page?: number;
}) => {
  const { data, isLoading, error } = useGet<GetOrdersResponse>(
    `/v1/order?limit=${limit}&page=${page}`,
    {
      queryKey: ["orders-admin", limit, page],
    }
  );

  return {
    orders: data?.data || [],
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || limit,
    isLoading,
    error,
  };
};
