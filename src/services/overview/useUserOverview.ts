import { useGet } from "@/hooks/api/useReactQueryHooks";
import { UserOverview } from "@/types/admin";

export const useUserOverview = () => {
  const { data, isLoading, error } = useGet<{ data: UserOverview }>(
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
