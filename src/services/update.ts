import { useGet, usePut } from "@/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { get } from "http";
import { toast } from "sonner";

interface User {
  id?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  birthday?: string;
  image?: string;
  imageUrl?: string;
  phone?: string;
  email?: string;
  role?: string;
  is_email_verified?: boolean;
  status?: string;
  created_at?: string;
  updated_at?: string;
  addressList?: string[];
}
export interface UserResponse {
  data: User;
  statusCode: number;
}

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

interface UpdateProfileRequest {
  username: string;
  first_name: string;
  last_name: string;
  birthday: string;
  email: string;
}
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
