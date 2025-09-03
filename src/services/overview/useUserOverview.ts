import { useGet } from "@/hooks/useReactQueryHooks";
import { UserOverviewResponse } from "@/types/admin/overview";

export const useUserOverview = () => {
  const { data, isLoading, error } = useGet<UserOverviewResponse>(
    "/v1/admin/overview/users",
    {
      queryKey: ["user-overview"],
    }
  );

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
