import { usePost } from "@/hooks/api/useReactQueryHooks";
import { ChangeOrderStatusRequest } from "@/types/Profile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useChangeOrderStatus = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = usePost(
    ({ id }) => `/v1/order/status?id=${id}`,
    ({ status }: ChangeOrderStatusRequest) => ({ status }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders-admin"] });
        queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
        queryClient.invalidateQueries({ queryKey: ["order-overview"] });
        toast.success("وضعیت سفارش با موفقیت تغییر کرد");
      },
      onError: () => {
        toast.error("خطا در تغییر وضعیت سفارش");
      },
    }
  );

  return {
    mutate,
    isPending,
    variables,
  };
};
