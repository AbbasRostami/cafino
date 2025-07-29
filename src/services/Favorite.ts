import { useDelete, useGet, usePost } from "@/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export const useGetFavorites = (limit: number = 6, page: number = 1) => {
  return useGet<any>(`/v1/profile/favorites?limit=${limit}&page=${page}`, {
    queryKey: ["favorites", limit, page],
  });
};

interface AddToFavoriteRequest {
  itemId: string;
}
export const useAddToFavorite = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return usePost<AddToFavoriteRequest>(
    (data) => `/v1/profile/favorite?itemId=${data.itemId}`,
    {
      onSuccess: () => {
        toast.success("ایتم با موفقیت به علاقه مندی ها اضافه شد");
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
        queryClient.invalidateQueries({ queryKey: ["item", id as string] });
      },
      onError: () => {
        toast.error("خطا در اضافه کردن به علاقه مندی ها");
      },
    }
  );
};

interface DeleteFromFavoriteRequest {
  itemId: string;
}
export const useDeleteFromFavorite = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useDelete<DeleteFromFavoriteRequest>(
    (data) => `/v1/profile/favorite?itemId=${data.itemId}`,
    {
      onSuccess: () => {
        toast.success("ایتم با موفقیت از علاقه مندی ها حذف شد");
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
        queryClient.invalidateQueries({ queryKey: ["item", id as string] });
      },
      onError: () => {
        toast.error("خطا در حذف از علاقه مندی ها");
      },
    }
  );
};
