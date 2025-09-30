import { usePost } from "@/hooks/api/useReactQueryHooks";
import { AddUserToBlacklistRequest } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddUserToBlacklist = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = usePost<AddUserToBlacklistRequest>(
    "/v1/user/blacklist",
    undefined,
    {
      onSuccess: () => {
        toast.success("کاربر با موفقیت به لیست سیاه اضافه شد.");
        queryClient.invalidateQueries({ queryKey: ["user-list-admin"] });
        queryClient.invalidateQueries({ queryKey: ["blacklist"] });
      },
      onError: () => {
        toast.error("خطا در اضافه کردن کاربر به لیست سیاه");
      },
    }
  );
  return { mutate, isPending, variables };
};
