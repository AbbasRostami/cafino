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
      onError: () => {
        toast.error("خطا در ایجاد دسته بندی");
      },
    }
  );
  return { mutate, isPending, error };
};
