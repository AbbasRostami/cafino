import { useDelete } from "@/hooks/api/useReactQueryHooks";
import { DeleteCategoriesRequest } from "@/types/admin/categories";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, variables } =
    useDelete<DeleteCategoriesRequest>(({ id }) => `/v1/category/${id}`, {
      onSuccess: () => {
        toast.success("دسته بندی مورد نظر با موفقیت حذف شد.");
        queryClient.invalidateQueries({ queryKey: ["categories-admin"] });
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 403:
            toast.error("دسترسی غیرمجاز: شما اجازه حذف دسته بندی را ندارید");
            break;
          case 404:
            toast.error("دسته بندی یافت نشد");
            break;
          default:
            toast.error("خطا در حذف دسته بندی. لطفاً دوباره تلاش کنید.");
            break;
        }
      },
    });
  return { mutate, isPending, error, variables };
};
