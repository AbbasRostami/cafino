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
        switch (error?.statusCode) {
          case 401:
            toast.error(
              "دسترسی غیرمجاز: شما اجازه اضافه کردن به علاقه مندی ها را ندارید"
            );
            break;
          case 404:
            toast.error("محصول یافت نشد");
            break;
          case 409:
            toast.error("محصول قبلاً در علاقه مندی ها وجود دارد");
            break;
          default:
            toast.error("خطا در اضافه کردن به علاقه مندی ها");
            break;
        }
      },
    }
  );
};
