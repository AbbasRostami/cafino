import { usePost } from "@/hooks/api/useReactQueryHooks";
import { CreateDiscountRequest } from "@/types/admin/discounts";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateDiscount = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePost<CreateDiscountRequest>(
    () => "/v1/discount",
    undefined,
    {
      onSuccess: () => {
        toast.success("کد تخفیف با موفقیت ایجاد شد");
        queryClient.invalidateQueries({ queryKey: ["discounts"] });
      },
      onError: () => {
        toast.error("خطا در ایجاد کد تخفیف");
      },
    }
  );

  return { mutate, isPending, error };
};
