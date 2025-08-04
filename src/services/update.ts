import { useGet, usePut } from "@/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { User, UserResponse, UpdateProfileRequest } from "@/types/Profile";

export const useUserProfile = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useGet<UserResponse>("/v1/user", {
    queryKey: ["profile"],
    staleTime: 1000 * 60 * 5,
  });
  return { data: user?.data, isLoading, error };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateProfile,
    isPending,
    error,
  } = usePut<UpdateProfileRequest>((data) => `/v1/profile/update`, undefined, {
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
