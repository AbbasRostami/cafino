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
        if (error?.status === 422) {
          toast.error("موجودی این محصول کافی نیست.");
        } else {
          toast.error("خطا در افزایش تعداد محصول");
        }
      },
    }
  );
  return { mutate, isPending, error };
};
