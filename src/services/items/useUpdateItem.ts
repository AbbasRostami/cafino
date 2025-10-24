import { usePut } from "@/hooks/api/useReactQueryHooks";
import { UpdateItemFormData } from "@/types/admin/items";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePut<any, UpdateItemFormData>(
    ({ id }) => `/v1/item/${id}`,
    ({ formData }) => formData,
    {
      onSuccess: () => {
        toast.success("محصول با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["items-admin"] });
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 403:
            toast.error("دسترسی غیرمجاز: شما اجازه ویرایش محصول را ندارید");
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
            toast.error("خطا در ویرایش محصول. لطفاً دوباره تلاش کنید.");
            break;
        }
      },
    }
  );
  return { mutate, isPending, error };
};
