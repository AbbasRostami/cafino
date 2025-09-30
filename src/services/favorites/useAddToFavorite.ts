import { usePost } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

export const useAddToFavorite = () => {
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return usePost<any, { itemId: string }>(
    (data) => {
      if (!isAuthenticated) {
        toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      }
      return `/v1/profile/favorite?itemId=${data.itemId}`;
    },
    undefined,
    {
      onSuccess: () => {
        toast.success("ایتم با موفقیت به علاقه مندی ها اضافه شد");
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
        queryClient.invalidateQueries({ queryKey: ["item-details"] });
        queryClient.invalidateQueries({ queryKey: ["items-landing"] });
      },
      onError: (error: any) => {
        if (error.message !== "User is not authenticated") {
          toast.error("خطا در اضافه کردن به علاقه مندی ها");
        }
      },
    }
  );
};
