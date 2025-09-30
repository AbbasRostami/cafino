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
        if (error?.statusCode === 400) {
          toast.error("این کد تخفیف منقضی شده است");
        } else {
          toast.error("خطا در اضافه کردن کد تخفیف");
        }
      },
    }
  );
  return { mutate, isPending, error };
};
