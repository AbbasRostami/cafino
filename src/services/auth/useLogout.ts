"use client";
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
      await fetchApi.get<any>("/v1/auth/logout");
      resetAuth();
      toast.success("با موفقیت خارج شدید");
    } catch (error: any) {
      resetAuth();
      toast.error("خطا در خروج از حساب کاربری");
    } finally {
      setIsPending(false);
    }
  };

  return { logout, isPending };
};
