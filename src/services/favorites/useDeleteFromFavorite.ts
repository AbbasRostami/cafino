import { useDelete } from "@/hooks/api/useReactQueryHooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
export const useDeleteFromFavorite = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDelete<{ itemId: string }>(
    (data) => `/v1/profile/favorite?itemId=${data?.itemId}`,
    {
      onSuccess: (itemId) => {
        toast.success("محصول از علاقه مندی ها حذف شد");
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["item-details", itemId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
        queryClient.invalidateQueries({ queryKey: ["items-landing"] });
        queryClient.invalidateQueries({ queryKey: ["item-details"] });
      },
      onError: () => {
        toast.error("محصول از علاقه مندی ها حذف نشد");
      },
    }
  );

  return {
    mutate,
    isPending,
  };
};
