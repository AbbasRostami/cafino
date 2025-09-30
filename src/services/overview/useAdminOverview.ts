import { useGet } from "@/hooks/api/useReactQueryHooks";
import { AdminOverview } from "@/types/admin";

export const useAdminOverview = () => {
  const { data, isLoading, error } = useGet<{ data: AdminOverview }>(
    "/v1/admin/overview",
    {
      queryKey: ["admin-overview"],
    }
  );

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
