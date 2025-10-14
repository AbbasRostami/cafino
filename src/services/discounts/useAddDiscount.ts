import { usePost } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddDiscount = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePost<{ code: string }>(
    () => "/v1/cart/add-discount",
    undefined,
    {
      onSuccess: () => {
        toast.success("کد تخفیف با موفقیت اضافه شد");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },

      onError: (error: any) => {
        switch (error?.statusCode) {
          case 404:
            toast.error("کد تخفیف یافت نشد");
            break;
          case 409:
            toast.error("این کد تخفیف قبلاً استفاده شده است");
            break;
          case 410:
            toast.error("کد تخفیف منقضی شده است");
            break;
          default:
            toast.error("خطا در اضافه کردن کد تخفیف");
            break;
        }
      },
    }
  );
  return { mutate, isPending, error };
};
