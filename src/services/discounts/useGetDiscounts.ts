import { useGet } from "@/hooks/api/useReactQueryHooks";
import { GetDiscountsResponse, UseGetDiscountsProps } from "@/types/admin";

export const useGetDiscounts = ({
  page = 1,
  limit = 10,
  isActive,
  sortBy,
}: UseGetDiscountsProps = {}) => {
  const queryParams: Record<string, string> = {
    page: String(page),
    limit: String(limit),
  };

  if (isActive !== undefined) {
    queryParams.isActive = String(isActive);
  }

  if (sortBy) {
    queryParams.sortBy = sortBy;
  }

  const url = `/v1/discount?${new URLSearchParams(queryParams).toString()}`;

  const { data, isLoading, error } = useGet<GetDiscountsResponse>(url, {
    queryKey: ["discounts", page, limit, isActive, sortBy],
  });

  return {
    discounts: data?.data?.discounts || [],
    total: data?.data?.total || 0,
    page: data?.data?.page || page,
    limit: data?.data?.limit || limit,
    isLoading,
    error,
  };
};
