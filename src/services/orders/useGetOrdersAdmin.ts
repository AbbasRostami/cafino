import { useGet } from "@/hooks/api/useReactQueryHooks";
import { GetOrdersResponse } from "@/types/admin";

export const useGetOrdersAdmin = ({
  limit,
  page,
  status,
  sortBy,
}: {
  limit?: number;
  page?: number;
  status?: string;
  sortBy?: string;
}) => {
  const params = new URLSearchParams({
    limit: String(limit ?? 10),
    page: String(page ?? 1),
    ...(status ? { status } : {}),
    ...(sortBy ? { sortBy } : {}),
  });

  const url = `/v1/order?${params.toString()}`;
  const { data, isLoading, error } = useGet<GetOrdersResponse>(url, {
    queryKey: ["orders-admin", limit, page, status, sortBy],
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
