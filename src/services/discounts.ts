import { useDelete, useGet, usePost } from "@/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { r } from "node_modules/framer-motion/dist/types.d-CtuPurYT";
import { toast } from "sonner";

export interface Discounts {
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
  data: Discounts[];
  statusCode: number;
  total?: number;
  page?: number;
  limit?: number;
}

interface UseGetDiscountsProps {
  page?: number;
  limit?: number;
}

export const useGetDiscounts = ({
  page = 1,
  limit = 10,
}: UseGetDiscountsProps = {}) => {
  const { data, isLoading, error } = useGet<GetDiscountsResponse>(
    `/v1/discount?page=${page}&limit=${limit}`,
    {
      queryKey: ["discounts", page, limit],
    }
  );

  return {
    discounts: data?.data || [],
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    isLoading,
    error,
  };
};

// types/discount.ts
export interface CreateDiscountRequest {
  code: string;
  percent?: number; // optional if `amount` is used
  amount?: number; // optional if `percent` is used
  expires_in: number; // in days
  limit: number;
}

export const useCreateDiscount = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePost<CreateDiscountRequest>(
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
  return { mutate, isPending, error };
};
