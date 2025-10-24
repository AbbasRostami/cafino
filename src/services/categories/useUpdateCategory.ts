import { usePut } from "@/hooks/api/useReactQueryHooks";
import { UpdateCategoryFormData } from "@/types/admin/categories";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePut<any, UpdateCategoryFormData>(
    ({ id }) => `/v1/category/${id}`,
    ({ formData }) => formData,
    {
      onSuccess: () => {
        toast.success("دسته بندی مورد نظر با موفقیت ویرایش شد.");
        queryClient.invalidateQueries({ queryKey: ["categories-admin"] });
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 403:
            toast.error("دسترسی غیرمجاز: شما اجازه ویرایش دسته بندی را ندارید");
            break;
          case 409:
            toast.error("دسته بندی با عنوان قبلاً وجود دارد");
            break;
          default:
            toast.error("خطا در ویرایش دسته بندی. لطفاً دوباره تلاش کنید.");
            break;
        }
      },
    }
  );
  return { mutate, isPending, error };
};
