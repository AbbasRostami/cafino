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
      onError: () => {
        toast.error("خطا در ویرایش پروفایل");
      },
    }
  );
  return { updateProfile, isPending, error };
};
