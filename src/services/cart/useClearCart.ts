import { useDelete } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useDelete<any, void>(() => "/v1/cart", {
    onSuccess: () => {
      toast.success("سبد خرید با موفقیت پاک شد");
      queryClient.invalidateQueries({ queryKey: ["/v1/cart"] });
      queryClient.refetchQueries({ queryKey: ["/v1/cart"] });
    },

    onError: (error) => {
      toast.error("خطا در پاک کردن سبد خرید");
    },
  });
  return { mutate, isPending, error };
};
