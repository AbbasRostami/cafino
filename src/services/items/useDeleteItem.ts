import { useDelete } from "@/hooks/useReactQueryHooks";
import { DeleteItemRequest } from "@/types/admin/items";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useDelete<DeleteItemRequest>(
    ({ id }) => `/v1/item/${id}`,
    {
      onSuccess: () => {
        toast.success("محصول حذف شد");
        queryClient.invalidateQueries({ queryKey: ["items-admin"] });
      },
      onError: () => {
        toast.error("خطا در حذف محصول");
      },
    }
  );
  return { mutate, isPending, error };
};
