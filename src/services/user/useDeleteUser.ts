import { useDelete } from "@/hooks/useReactQueryHooks";
import { DeleteUserRequest } from "@/types/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useDelete<DeleteUserRequest>(
    () => `/v1/user/`,
    {
      onSuccess: () => {
        toast.success("کاربر مورد نظر با موفقیت حذف شد.");
        queryClient.invalidateQueries({ queryKey: ["user-list-admin"] });
      },
      onError: () => {
        toast.error("خطا در حذف کاربر");
      },
    }
  );
  return { mutate, isPending, error };
};
