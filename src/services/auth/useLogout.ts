"use client";
import { fetchApi } from "@/hooks/api/useAuthToken";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { toast } from "sonner";

export const useLogout = () => {
  const { resetAuth } = useAuthStore();
  const [isPending, setIsPending] = useState(false);

  const logout = async (redirectUrl: string) => {
    if (isPending) return;

    setIsPending(true);
    try {
      await fetchApi.get<any>("/v1/auth/logout");
      resetAuth();
      toast.success("با موفقیت خارج شدید");
      window.location.href = redirectUrl;
    } catch (error: any) {
      resetAuth();
      toast.error("خطا در خروج از حساب کاربری");
    } finally {
      setIsPending(false);
      window.location.href = redirectUrl;
    }
  };

  return { logout, isPending };
};
