import { useDelete } from "@/hooks/useReactQueryHooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteFromFavorite = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteFromFavorite, isPending } = useDelete<{
    itemId: string;
  }>((data) => `/v1/profile/favorite?itemId=${data?.itemId}`, {
    onSuccess: () => {
      toast.success("محصول از علاقه مندی ها حذف شد");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: () => {
      toast.error("محصول از علاقه مندی ها حذف نشد");
    },
  });
  return {
    deleteFromFavorite,
    isPending,
  };
};
