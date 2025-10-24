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
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 403:
            toast.error("دسترسی غیرمجاز: شما اجازه ایجاد کد تخفیف را ندارید");
            break;
          case 409:
            toast.error("کد تخفیف قبلاً وجود دارد");
            break;
          case 422:
            toast.error("باید فقط یک مقدار متناسب با نوع تخفیف وارد شود");
            break;
          default:
            toast.error("خطا در ایجاد کد تخفیف. لطفاً دوباره تلاش کنید.");
        }
      },
    }
  );

  return { mutate, isPending, error };
};
