import { usePut } from "@/hooks/useReactQueryHooks";
import { UpdateDiscountStatusRequest } from "@/types/admin/discounts";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateDiscountStatus = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePut<UpdateDiscountStatusRequest>(
    ({ id }) => `/v1/discount/${id}`,
    ({ status }) => ({ status }),
    {
      onSuccess: () => {
        toast.success("وضعیت کد تخفیف با موفقیت تغییر کرد");
        queryClient.invalidateQueries({ queryKey: ["discounts"] });
      },
      onError: () => {
        toast.error("خطا در تغییر وضعیت کد تخفیف");
      },
    }
  );
  return { mutate, isPending, error };
};
