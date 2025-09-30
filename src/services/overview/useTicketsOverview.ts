import { useGet } from "@/hooks/api/useReactQueryHooks";
import { TicketOverview } from "@/types/admin";

export const useTicketsOverview = () => {
  const { data, isLoading, error } = useGet<{ data: TicketOverview }>(
    "/v1/admin/overview/tickets",
    {
      queryKey: ["tickets-overview"],
    }
  );

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
