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
      onError: () => {
        toast.error("خطا در ویرایش محصول");
      },
    }
  );
  return { mutate, isPending, error };
};
