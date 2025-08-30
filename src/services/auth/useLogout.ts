import { fetchApi } from "@/hooks/useAuthToken";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useState } from "react";

export const useLogout = () => {
  const { resetAuth } = useAuthStore();
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    if (isPending) return;

    setIsPending(true);
    try {
      // Call logout API - this is a GET request that logs out the user
      await fetchApi.get<any>("/v1/auth/logout");

      // Always reset auth state after logout API call
      resetAuth();
      toast.success("با موفقیت خارج شدید");
    } catch (error: any) {
      // Even if API call fails, reset auth state locally
      resetAuth();
      toast.error("خطا در خروج از حساب کاربری");
    } finally {
      setIsPending(false);
    }
  };

  return { logout, isPending };
};
