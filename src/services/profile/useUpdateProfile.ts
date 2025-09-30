import { usePut } from "@/hooks/api/useReactQueryHooks";
import { UpdateProfileRequest } from "@/types/Profile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateProfile,
    isPending,
    error,
  } = usePut<UpdateProfileRequest>(
    () => `/v1/profile/update`,
    (data) => data,
    {
      onSuccess: () => {
        toast.success("پروفایل با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        queryClient.refetchQueries({ queryKey: ["user-profile"] });
      },
      onError: (error: any) => {
        if (error?.response?.data?.statusCode === 409) {
          toast.error("این نام کاربری قبلاً استفاده شده است");
        } else {
          toast.error(
            error?.response?.data?.message || "خطا در ویرایش پروفایل"
          );
        }
      },
    }
  );
  return { updateProfile, isPending, error };
};
