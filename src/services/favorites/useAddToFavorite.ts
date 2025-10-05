import { usePost } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddToFavorite = () => {
  const queryClient = useQueryClient();

  return usePost<any, { itemId: string }>(
    (data) => {
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
