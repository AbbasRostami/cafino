import { useGet } from "@/hooks/api/useReactQueryHooks";
import { useAuthStore } from "@/store/authStore";
import { UserResponse } from "@/types/Profile";

export const useUserProfile = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const {
    data: user,
    isLoading,
    error,
  } = useGet<UserResponse>("/v1/user", {
    queryKey: ["user-profile"],
    enabled: isAuthenticated,
  });
  return { data: user?.data?.user, isLoading, error };
};
