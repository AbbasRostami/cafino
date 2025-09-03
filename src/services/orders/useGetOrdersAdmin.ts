import { useGet } from "@/hooks/useReactQueryHooks";
import { GetOrdersResponse } from "@/types/admin";

export const useGetOrdersAdmin = ({
  limit,
  page,
  status,
}: {
  limit?: number;
  page?: number;
  status?: string;
}) => {
  let url = `/v1/order?limit=${limit}&page=${page}`;
  if (status) {
    url += `&status=${status}`;
  }
  const { data, isLoading, error } = useGet<GetOrdersResponse>(url, {
    queryKey: ["orders-admin", limit, page, status],
  });

  return {
    orders: data?.data?.orders || [],
    total: data?.data?.total || 0,
    page: data?.data?.page || 1,
    limit: data?.data?.limit || 10,
    isLoading,
    error,
  };
};
