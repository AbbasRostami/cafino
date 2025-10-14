import { usePost } from "@/hooks/api/useReactQueryHooks";
import { ItemResponse } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePost<ItemResponse, FormData>(
    "/v1/item",
    (formData) => formData,
    {
      onSuccess: () => {
        toast.success("محصول با موفقیت ایجاد شد");
        queryClient.invalidateQueries({ queryKey: ["items-admin"] });
        queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 403:
            toast.error("دسترسی غیرمجاز: شما اجازه ایجاد محصول را ندارید");
            break;
          case 404:
            toast.error("دسته‌بندی یافت نشد");
            break;
          case 409:
            toast.error("محصول با عنوان یا جایگزینی قبلاً وجود دارد");
            break;
          case 410:
            toast.error("دسته‌بندی مجاز به نمایش نیست");
            break;
          default:
            toast.error("خطا در ایجاد محصول");
            break;
        }
      },
    }
  );

  return { mutate, isPending, error };
};
