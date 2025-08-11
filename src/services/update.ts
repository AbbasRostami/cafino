import { useGet, usePut } from "@/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserResponse, UpdateProfileRequest } from "@/types/Profile";
import { useAuthStore } from "@/store/authStore";

export const useUserProfile = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const {
    data: user,
    isLoading,
    error,
  } = useGet<UserResponse>("/v1/user", {
    queryKey: ["profile"],
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated,
  });
  return { data: user?.data, isLoading, error };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateProfile,
    isPending,
    error,
  } = usePut<UpdateProfileRequest>(() => `/v1/profile/update`, undefined, {
    onSuccess: () => {
      toast.success("پروفایل با موفقیت ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      if (error?.response?.data?.statusCode === 409) {
        toast.error("این نام کاربری قبلاً استفاده شده است");
      } else {
        toast.error(error?.response?.data?.message || "خطا در ویرایش پروفایل");
      }
    },
  });
  return { updateProfile, isPending, error };
};
