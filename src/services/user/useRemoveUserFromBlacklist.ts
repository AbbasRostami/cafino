import { useDelete } from "@/hooks/api/useReactQueryHooks";
import { RemoveUserFromBlacklistRequest } from "@/types/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveUserFromBlacklist = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, variables } =
    useDelete<RemoveUserFromBlacklistRequest>(() => `/v1/user/blacklist`, {
      onSuccess: () => {
        toast.success("کاربر مورد نظر با موفقیت از لیست سیاه حذف شد.");
        queryClient.invalidateQueries({ queryKey: ["blacklist"] });
        queryClient.invalidateQueries({ queryKey: ["user-list-admin"] });
      },
      onError: () => {
        toast.error("خطا در حذف کاربر از لیست سیاه");
      },
    });
  return { mutate, isPending, error, variables };
};
