import { usePatch } from "@/hooks/api/useReactQueryHooks";
import { ChangeUserPermissionRequest } from "@/types/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useChangeUserPermission = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } =
    usePatch<ChangeUserPermissionRequest>("/v1/user/permission", undefined, {
      onSuccess: () => {
        toast.success("نقش کاربر با موفقیت تغییر کرد.");
        queryClient.invalidateQueries({ queryKey: ["user-list-admin"] });
      },
      onError: () => {
        toast.error("خطا در تغییر نقش کاربر");
      },
    });
  return { mutate, isPending, variables };
};
