import { useDelete, useGet, usePost } from "@/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  FavoriteListResponse,
  AddToFavoriteRequest,
  DeleteFromFavoriteRequest,
} from "@/types/Profile";

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
  return usePost<AddToFavoriteRequest>(
    (data) => `/v1/profile/favorite?itemId=${data.itemId}`,
    undefined,
    {
      onSuccess: () => {
        toast.success("ایتم با موفقیت به علاقه مندی ها اضافه شد");
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      },
      onError: () => {
        toast.error("خطا در اضافه کردن به علاقه مندی ها");
      },
    }
  );
};

export const useDeleteFromFavorite = (p0?: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useDelete<DeleteFromFavoriteRequest>(
    (data) => `/v1/profile/favorite?itemId=${data?.itemId}`,
    {
      onSuccess: () => {
        toast.success("ایتم با موفقیت از علاقه مندی ها حذف شد");
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
      },
      onError: () => {
        toast.error("خطا در حذف از علاقه مندی ها");
      },
    }
  );
};
