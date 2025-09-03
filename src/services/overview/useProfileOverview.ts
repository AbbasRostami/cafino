import { useGet } from "@/hooks/useReactQueryHooks";
import { ProfileOverview } from "@/types/Profile";

export const useProfileOverview = () => {
  const { data, isLoading, error } = useGet<{ data: ProfileOverview }>(
    "/v1/profile/overview",
    {
      queryKey: ["profile-overview"],
    }
  );

  return {
    data: data,
    isLoading,
    error,
  };
};
