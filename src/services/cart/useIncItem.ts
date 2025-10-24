import { usePatch } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useIncItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePatch<{ itemId: string }>(
    "/v1/cart/inc-item",
    undefined,
    {
      onSuccess: () => {
        toast.success("تعداد محصول با موفقیت افزایش یافت");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 404:
            toast.error("محصول یافت نشد");
            break;
          case 409:
            toast.error("محصول در سبد خرید شما وجود ندارد");
            break;
          case 422:
            toast.error(
              `${error?.message?.item}, موجودی این محصول ${error?.message?.available_quantity} .عدد است`
            );
            break;
          default:
            toast.error("خطا در افزایش تعداد محصول. لطفاً دوباره تلاش کنید.");
            break;
        }
      },
    }
  );
  return { mutate, isPending, error };
};
