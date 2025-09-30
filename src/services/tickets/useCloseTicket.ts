import { usePatch } from "@/hooks/api/useReactQueryHooks";
import { CloseTicketResponse } from "@/types/admin";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useCloseTicket = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, variables } = usePatch<
    CloseTicketResponse,
    { ticketId: string }
  >(
    ({ ticketId }) => `/v1/ticket/${ticketId}/close`,
    ({ ticketId }) => ({ ticketId }),
    {
      onSuccess: () => {
        toast.success("تیکت با موفقیت بسته شد");
        queryClient.invalidateQueries({ queryKey: ["tickets"] });
        queryClient.invalidateQueries({ queryKey: ["user-tickets"] });
        queryClient.invalidateQueries({ queryKey: ["tickets-overview"] });
      },
      onError: () => {
        toast.error("خطا در بستن تیکت");
      },
    }
  );

  return {
    mutate,
    isPending,
    variables,
  };
};
