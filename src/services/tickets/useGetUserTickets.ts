import { useGet } from "@/hooks/useReactQueryHooks";
import { GetTicketsResponse, GetTicketsParams } from "@/types/Profile";

export const useGetUserTickets = (params?: GetTicketsParams) => {
  const queryParams = new URLSearchParams();

  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params?.status) {
    queryParams.append("status", params.status);
  }

  const endpoint = `/v1/ticket/user${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  return useGet<GetTicketsResponse>(endpoint, {
    queryKey: ["user-tickets", params],
  });
};
