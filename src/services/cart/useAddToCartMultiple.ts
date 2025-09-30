import { usePost } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddToCartMultiple = () => {
  const queryClient = useQueryClient();
  return usePost<any, { items: { itemId: string; count: number }[] }>(
    () => "/v1/cart/add-multiple",
    undefined,
    {
      onSuccess: () => {
        toast.success("سبد خرید با موفقیت منتقل شد");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },
      onError: () => {
        toast.error("خطا در انتقال سبد خرید مهمان");
      },
    }
  );
};
