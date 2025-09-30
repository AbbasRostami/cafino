import { usePatch } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDecItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePatch<{ itemId: string }>(
    "/v1/cart/dec-item",
    undefined,
    {
      onSuccess: () => {
        toast.success("تعداد محصول با موفقیت کاهش یافت");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },
      onError: (error) => {
        toast.error("خطا در کاهش تعداد محصول");
      },
    }
  );

  return { mutate, isPending, error };
};
