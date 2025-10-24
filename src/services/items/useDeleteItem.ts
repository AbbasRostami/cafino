import { useDelete } from "@/hooks/api/useReactQueryHooks";
import { DeleteItemRequest } from "@/types/admin/items";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useDelete<DeleteItemRequest>(
    ({ id }) => `/v1/item/${id}`,
    {
      onSuccess: () => {
        toast.success("محصول حذف شد");
        queryClient.invalidateQueries({ queryKey: ["items-admin"] });
        queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 403:
            toast.error("دسترسی غیرمجاز: شما اجازه حذف محصول را ندارید");
            break;
          case 404:
            toast.error("محصول یافت نشد");
            break;
          default:
            toast.error(
              "خطا در حذف محصول. لطفاً دوباره تلاش کنید. در صورت وجود محصول در سفارشات، حذف آن به صورت خودکار انجام خواهد شد."
            );
            break;
        }
      },
    }
  );
  return { mutate, isPending, error };
};
