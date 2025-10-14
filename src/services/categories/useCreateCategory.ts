import { usePost } from "@/hooks/api/useReactQueryHooks";
import { CreateCategoryFormData } from "@/types/admin/categories";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePost<any, CreateCategoryFormData>(
    "/v1/category",
    (fd) => fd,
    {
      onSuccess: () => {
        toast.success("دسته بندی جدید با موفقیت ایجاد شد.");
        queryClient.invalidateQueries({ queryKey: ["categories-admin"] });
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 403:
            toast.error("دسترسی غیرمجاز: شما اجازه ایجاد دسته بندی را ندارید");
            break;
          case 409:
            toast.error("دسته بندی با عنوان قبلاً وجود دارد");
            break;
          default:
            toast.error("خطا در ایجاد دسته بندی");
            break;
        }
      },
    }
  );
  return { mutate, isPending, error };
};
