import { useGet } from "@/hooks/api/useReactQueryHooks";
import {
  GetRateLimitRecordResponse,
  GetRateLimitRecordParams,
} from "@/types/admin";

export const useGetRateLimitRecord = (params: GetRateLimitRecordParams) => {
  const endpoint = `/v1/rate-limit/record/${params.id}`;

  return useGet<GetRateLimitRecordResponse>(endpoint, {
    queryKey: ["rate-limit-record", params.id],
  });
};
