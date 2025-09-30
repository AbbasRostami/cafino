import { useGet } from "@/hooks/api/useReactQueryHooks";
import { GetTicketMessagesResponse } from "@/types/Profile";

export const useGetTicketMessages = (ticketId: string) => {
  return useGet<GetTicketMessagesResponse>(`/v1/ticket/${ticketId}/messages`, {
    queryKey: ["ticket-messages", ticketId],
    enabled: !!ticketId,
  });
};
