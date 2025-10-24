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
    onError: (error: any) => {
      switch (error?.statusCode) {
        case 403:
          toast.error("دسترسی غیرمجاز: شما اجازه حذف تیکت را ندارید");
          break;
        case 404:
          toast.error("تیکت یافت نشد");
          break;
        default:
          toast.error("خطا در حذف تیکت. لطفاً دوباره تلاش کنید.");
      }
    },
  });

  return {
    mutate,
    isPending,
    variables,
  };
};
