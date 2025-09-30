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
      onError: () => {
        toast.error("خطا در ایجاد محصول");
      },
    }
  );

  return { mutate, isPending, error };
};
