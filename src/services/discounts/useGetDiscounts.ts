import { useGet } from "@/hooks/useReactQueryHooks";
import {
  GetDiscountsResponse,
  UseGetDiscountsProps,
} from "@/types/admin/discounts";

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
    discounts: data?.data?.discounts || [],
    total: data?.data?.total || 0,
    page: data?.data?.page || page,
    limit: data?.data?.limit || limit,
    isLoading,
    error,
  };
};
