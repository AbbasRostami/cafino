import { useDelete } from "@/hooks/api/useReactQueryHooks";
import { DeleteTicketResponse } from "@/types/admin";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, variables } = useDelete<
    DeleteTicketResponse,
    { id: string }
  >((data) => `/v1/ticket/${data.id}`, {
    onSuccess: () => {
      toast.success("تیکت با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["user-tickets"] });
    },
    onError: () => {
      toast.error("خطا در حذف تیکت");
    },
  });

  return {
    mutate,
    isPending,
    variables,
  };
};
