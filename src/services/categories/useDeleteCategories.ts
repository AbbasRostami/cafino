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
      onError: () => {
        toast.error("خطا در حذف دسته بندی");
      },
    });
  return { mutate, isPending, error, variables };
};
