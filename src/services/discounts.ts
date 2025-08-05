import { useDelete, useGet, usePost } from "@/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { r } from "node_modules/framer-motion/dist/types.d-CtuPurYT";
import { toast } from "sonner";

export interface Discount {
  id: string;
  code: string;
  percent: number | null;
  amount: number | null;
  expires_in: string; // ISO Date
  limit: number;
  usage: number;
  active: boolean;
}

export interface GetDiscountsResponse {
  data: Discount[];
  statusCode: number;
}

export const useGetDiscounts = () => {
  const { data, isLoading, error } = useGet<GetDiscountsResponse>("/v1/discount", {
    queryKey: ["discounts"],
  });

  return {
    discounts: data?.data || [],
    isLoading,
    error,
  };
};


// types/discount.ts
export interface CreateDiscountRequest {
  code: string;
  percent?: number; // optional if `amount` is used
  amount?: number;  // optional if `percent` is used
  expires_in: number; // in days
  limit: number;
}

export const useCreateDiscount = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error }= usePost<CreateDiscountRequest>(
    () => "/v1/discount",
    undefined,
    {
      onSuccess: () => {
        toast.success("کد تخفیف با موفقیت ایجاد شد");
        queryClient.invalidateQueries({ queryKey: ["discounts"] });
      },
      onError: () => {
        toast.error("خطا در ایجاد کد تخفیف");
      },
    }
  );

  return { mutate, isPending, error };
};


export interface DeleteDiscountRequest {
  id: string;
}

export const useDeleteDiscount = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useDelete<DeleteDiscountRequest>(
    ({ id }) => `/v1/discount/${id}`,
    {
      onSuccess: () => {
        toast.success("کد تخفیف حذف شد");
        queryClient.invalidateQueries({ queryKey: ["discounts"] });
      },
      onError: () => {
        toast.error("خطا در حذف کد تخفیف");
      },
    }
  );
      return { mutate, isPending, error }
};
