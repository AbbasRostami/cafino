import { useGet } from "@/hooks/api/useReactQueryHooks";
import {
  GetRateLimitRecordsResponse,
  RateLimitRecordsParams,
} from "@/types/admin";

export const useGetRateLimitRecords = (params?: RateLimitRecordsParams) => {
  const queryParams = new URLSearchParams();

  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.identifier) queryParams.append("identifier", params.identifier);
  if (params?.endpoint) queryParams.append("endpoint", params.endpoint);
  if (params?.blockStatus)
    queryParams.append("blockStatus", params.blockStatus);

  const endpoint = `/v1/rate-limit/records${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  return useGet<GetRateLimitRecordsResponse>(endpoint, {
    queryKey: ["rate-limit-records", params],
  });
};
