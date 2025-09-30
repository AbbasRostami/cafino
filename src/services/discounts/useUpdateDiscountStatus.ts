import { usePut } from "@/hooks/api/useReactQueryHooks";
import { UpdateDiscountStatusRequest } from "@/types/admin/discounts";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateDiscountStatus = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error, variables } =
    usePut<UpdateDiscountStatusRequest>(
      ({ id }) => `/v1/discount/${id}`,
      ({ status }) => ({ status }),
      {
        onSuccess: () => {
          toast.success("وضعیت کد تخفیف با موفقیت تغییر کرد");
          queryClient.invalidateQueries({ queryKey: ["discounts"] });
        },
        onError: (error: any) => {
          switch (error?.statusCode) {
            case 400:
              toast.error("کد تخفیف منقضی شده است");
              break;
            case 404:
              toast.error("کد تخفیف یافت نشد");
              break;
            case 409:
              toast.error("این کد تخفیف قبلاً در همین وضعیت بوده است");
              break;
            default:
              toast.error("خطا در تغییر وضعیت کد تخفیف");
          }
        },
      }
    );
  return { mutate, isPending, error, variables };
};
