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
      onError: (error: any) => {
        console.log(" error in change user permission", error?.statusCode);
        switch (error?.statusCode) {
          case 403:
            toast.error("شما اجازه تغییر نقش کاربر را ندارید.");
            break;
          case 404:
            toast.error("کاربر یافت نشد.");
            break;
          case 409:
            toast.error("نقش ادمین اصلی قابل تغییر نیست.");
            break;
          default:
            toast.error("خطا در تغییر نقش کاربر");
            break;
        }
      },
    });

  return { mutate, isPending, variables };
};
