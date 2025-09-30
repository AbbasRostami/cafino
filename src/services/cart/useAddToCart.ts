import { usePost } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePost<any, { itemId: string }>(
    () => "/v1/cart/add",
    undefined,
    {
      onSuccess: () => {
        toast.success("محصول با موفقیت به سبد خرید اضافه شد");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },
      onError: (error) => {
        const errorMessage = error?.message;
        if (errorMessage === "item is already in your cart") {
          toast.error("محصول قبلاً در سبد خرید شما وجود دارد");
        } else {
          toast.error("خطا در اضافه کردن محصول به سبد خرید");
        }
      },
    }
  );
  return { mutate, isPending, error };
};
