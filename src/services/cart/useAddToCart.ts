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
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 404:
            toast.error("محصول یافت نشد.");
            break;
          case 409:
            toast.error("محصول قبلاً در سبد خرید شما وجود دارد.");
            break;
          case 422:
            toast.error(
              `${error?.message?.item}, موجودی این محصول ${error?.message?.available_quantity} .عدد است`
            );
            break;
          default:
            toast.error("خطا در اضافه کردن محصول به سبد خرید.");
            break;
        }
      },
    }
  );
  return { mutate, isPending, error };
};
