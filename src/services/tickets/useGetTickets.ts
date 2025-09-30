import { useGet } from "@/hooks/api/useReactQueryHooks";
import { GetTicketsResponse, GetTicketsParams } from "@/types/admin";

export const useGetTickets = (params?: GetTicketsParams) => {
  const queryParams = new URLSearchParams();

  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params?.status) queryParams.append("status", params.status);

  const endpoint = `/v1/ticket${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  const { data, isLoading, error } = useGet<GetTicketsResponse>(endpoint, {
    queryKey: ["tickets", params],
  });

  return {
    tickets: data?.data?.tickets || [],
    total: data?.data?.total || 0,
    page: data?.data?.page || 1,
    limit: data?.data?.limit || 10,
    isLoading,
    error,
  };
};
