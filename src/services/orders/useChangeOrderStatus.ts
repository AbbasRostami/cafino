import { usePost } from "@/hooks/useReactQueryHooks";
import { ChangeOrderStatusRequest } from "@/types/Profile/orders";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useChangeOrderStatus = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePost(
    ({ id }) => `/v1/order/status?id=${id}`,
    ({ status }: ChangeOrderStatusRequest) => ({ status }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders-admin"] });
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
    error,
  };
};
