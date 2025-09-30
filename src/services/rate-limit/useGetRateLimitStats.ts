import { useGet } from "@/hooks/api/useReactQueryHooks";
import { GetRateLimitStatsResponse } from "@/types/admin";

export const useGetRateLimitStats = () => {
  const endpoint = "/v1/rate-limit/stats";

  return useGet<GetRateLimitStatsResponse>(endpoint, {
    queryKey: ["rate-limit-stats"],
  });
};
