import { usePut } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, variables } = usePut(
    (id: string) => `/v1/profile/orders/{id}?id=${id}`,
    () => undefined,
    {
      onSuccess: () => {
        toast.success("سفارش با موفقیت لغو شد");
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
      onError: () => toast.error("خطا در لغو سفارش"),
    }
  );

  return {
    mutate: (id: string) => mutate(id),
    isPending,
    error,
    cancellingOrderId: variables || null,
  };
};
