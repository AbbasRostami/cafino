import { useGet, usePost, usePut } from "@/hooks/useReactQueryHooks";
import { toast } from "sonner";
import { OrdersResponse, OrderStatus } from "@/types/Profile";
import { useQueryClient } from "@tanstack/react-query";

// export const useGetOrders = ({ limit = 4, page = 1 }: { limit?: number; page?: number }) => {
//   const { data, isLoading, error } = useGet<OrdersResponse>(
//     `/v1/profile/orders?limit=${limit}&page=${page}`,
//     {
//       queryKey: ["orders", limit, page],
//     }
//   );

//   return {
//     orders: data?.data || [],
//     total: data?.total || 0,
//     page: data?.page || 1,
//     limit: data?.limit || limit,
//     isLoading,
//     error,
//   };
// };
export const useGetOrders = (limit: number = 4, page: number = 1) => {
  const { data, isLoading, error } = useGet<OrdersResponse>(
    `/v1/profile/orders?limit=${limit}&page=${page}`,
    {
      queryKey: ["orders", limit, page],
    }
  );
  return { data, isLoading, error };
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePut(
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
  };
};

export const useGetOrdersAdmin = ({
  limit = 4,
  page = 1,
}: {
  limit?: number;
  page?: number;
}) => {
  const { data, isLoading, error } = useGet<OrdersResponse>(
    `/v1/order?limit=${limit}&page=${page}`,
    {
      queryKey: ["orders-admin", limit, page],
    }
  );

  return {
    orders: data?.data || [],
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || limit,
    isLoading,
    error,
  };
};

export const useChangeStatusOrder = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePost(
    ({ id }) => `/v1/order/status?id=${id}`,
    ({ status }: { id: string; status: OrderStatus }) => ({ status }),
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
