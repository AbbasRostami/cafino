import { useGet } from "@/hooks/api/useReactQueryHooks";
import { BlacklistResponse, UseGetBlacklistProps } from "@/types/admin";

export const useGetBlacklist = ({ page, limit }: UseGetBlacklistProps) => {
  const { data, isLoading, error } = useGet<BlacklistResponse>(
    `/v1/user/blacklist?limit=${limit}&page=${page}`,
    {
      queryKey: ["blacklist", page, limit],
    }
  );

  return {
    blacklist: data?.data?.users || [],
    total: data?.data?.total || 0,
    page: data?.data?.page || 1,
    limit: data?.data?.limit || limit,
    isLoading,
    error,
  };
};
