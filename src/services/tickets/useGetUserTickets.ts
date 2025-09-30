import { useGet } from "@/hooks/api/useReactQueryHooks";
import { TicketFilters } from "@/types/Profile";
import { GetTicketMessagesResponse } from "@/types/Profile/tickets";

export const useGetUserTickets = (params?: TicketFilters) => {
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

  return useGet<GetTicketMessagesResponse>(endpoint, {
    queryKey: ["user-tickets", params],
  });
};
