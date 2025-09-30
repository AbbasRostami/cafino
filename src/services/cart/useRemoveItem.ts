import { useDelete } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useDelete<{ itemId: string }>(
    () => "/v1/cart/remove",
    {
      onSuccess: () => {
        toast.success("محصول با موفقیت از سبد خرید حذف شد");
        queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
        queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
      },

      onError: (error) => {
        toast.error("خطا در حذف محصول");
      },
    }
  );
  return { mutate, isPending, error };
};
