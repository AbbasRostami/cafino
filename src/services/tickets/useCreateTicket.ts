import { usePost } from "@/hooks/useReactQueryHooks";
import { CreateTicketRequest, CreateTicketResponse } from "@/types/Profile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePost<
    CreateTicketResponse,
    CreateTicketRequest
  >("/v1/ticket", (data) => data, {
    onSuccess: () => {
      toast.success("تیکت با موفقیت ایجاد شد");
      queryClient.invalidateQueries({ queryKey: ["user-tickets"] });
    },
    onError: () => {
      toast.error("خطا در ایجاد تیکت");
    },
  });

  return { mutate, isPending, error };
};
