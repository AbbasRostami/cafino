import { useGet } from "@/hooks/useReactQueryHooks";
import {
  BlacklistResponse,
  UseGetBlacklistProps,
} from "@/types/admin/user/user.types";

export const useGetBlacklist = ({ page, limit }: UseGetBlacklistProps) => {
  const { data, isLoading, error } = useGet<BlacklistResponse>(
    `/v1/user/blacklist?limit=${limit}&page=${page}`,
    {
      queryKey: ["blacklist", page, limit],
    }
  );

  return {
    blacklist: data?.data || [],
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || limit,
    isLoading,
    error,
  };
};
