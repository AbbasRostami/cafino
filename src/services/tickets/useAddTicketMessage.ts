import { usePost } from "@/hooks/api/useReactQueryHooks";
import { AddMessageRequest, AddMessageResponse } from "@/types/Profile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddTicketMessage = (ticketId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePost<
    AddMessageResponse,
    AddMessageRequest
  >(`/v1/ticket/${ticketId}/messages`, (data) => data, {
    onSuccess: () => {
      toast.success("پیام با موفقیت ارسال شد");
      queryClient.invalidateQueries({
        queryKey: ["ticket-messages", ticketId],
      });
      queryClient.invalidateQueries({ queryKey: ["user-tickets"] });
    },
    onError: () => {
      toast.error("خطا در ارسال پیام");
    },
  });

  return { mutate, isPending, error };
};
