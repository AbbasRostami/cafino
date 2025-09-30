import { useDelete } from "@/hooks/api/useReactQueryHooks";
import { DeleteDiscountRequest } from "@/types/admin/discounts";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteDiscount = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, variables } =
    useDelete<DeleteDiscountRequest>(({ id }) => `/v1/discount/${id}`, {
      onSuccess: () => {
        toast.success("کد تخفیف حذف شد");
        queryClient.invalidateQueries({ queryKey: ["discounts"] });
      },
      onError: () => {
        toast.error("خطا در حذف کد تخفیف");
      },
    });
  return { mutate, isPending, error, variables };
};
