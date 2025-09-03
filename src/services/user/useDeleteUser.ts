import { useDelete } from "@/hooks/useReactQueryHooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteUserRequest } from "@/types/admin";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useDelete<DeleteUserRequest>(
    () => `/v1/user/`,
    {
      onSuccess: () => {
        toast.success("کاربر مورد نظر با موفقیت حذف شد.");
        queryClient.invalidateQueries({ queryKey: ["user-list-admin"] });
        queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
      },
      onError: () => {
        toast.error("خطا در حذف کاربر");
      },
    }
  );
  return { mutate, isPending, variables };
};
