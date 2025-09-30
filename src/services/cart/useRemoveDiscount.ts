import { useDelete } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveDiscount = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useDelete<{ code: string }>(
    () => "/v1/cart/remove-discount/",
    {
      onSuccess: () => {
        toast.success("کد تخفیف با موفقیت حذف شد");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },
      onError: (error) => {
        toast.error("خطا در حذف کد تخفیف");
      },
    }
  );
  return { mutate, isPending, error };
};
