import { usePost } from "@/hooks/useReactQueryHooks";
import { ItemResponse } from "@/types/admin/items";
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
      },
      onError: () => {
        toast.error("خطا در ایجاد محصول");
      },
    }
  );

  return { mutate, isPending, error };
};
