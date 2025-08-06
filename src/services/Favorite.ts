import { useDelete, useGet, usePost } from "@/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  FavoriteListResponse,
  AddToFavoriteRequest,
  DeleteFromFavoriteRequest,
} from "@/types/Profile";
import { useAuthStore } from "@/store/authStore";

export const useGetFavorites = (limit: number = 6, page: number = 1) => {
  return useGet<FavoriteListResponse>(
    `/v1/profile/favorites?limit=${limit}&page=${page}`,
    {
      queryKey: ["favorites", limit, page],
    }
  );
};

export const useAddToFavorite = () => {
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return usePost<AddToFavoriteRequest>(
    (data) => {
      if (!isAuthenticated) {
        toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید.");
        // چون درخواست نزدم، throw می‌کنم تا mutate ارور بزنه و متوقف بشه
        throw new Error("User is not authenticated");
      }
      return `/v1/profile/favorite?itemId=${data.itemId}`;
    },
    undefined,
    {
      onSuccess: () => {
        toast.success("ایتم با موفقیت به علاقه مندی ها اضافه شد");
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      },
      onError: (error: any) => {
        // اگر ارور به خاطر لاگین نبودن باشه دیگه اینجا نیازی به توست نیست چون همونجا زدن
        if (error.message !== "User is not authenticated") {
          toast.error("خطا در اضافه کردن به علاقه مندی ها");
        }
      },
    }
  );
};

export const useDeleteFromFavorite = () => {
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useDelete<DeleteFromFavoriteRequest>(
    (data) => {
      if (!isAuthenticated) {
        toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید.");
        throw new Error("User is not authenticated");
      }
      return `/v1/profile/favorite?itemId=${data?.itemId}`;
    },
    {
      onSuccess: () => {
        toast.success("ایتم با موفقیت از علاقه مندی ها حذف شد");
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      },
      onError: (error: any) => {
        if (error.message !== "User is not authenticated") {
          toast.error("خطا در حذف از علاقه مندی ها");
        }
      },
    }
  );
};
