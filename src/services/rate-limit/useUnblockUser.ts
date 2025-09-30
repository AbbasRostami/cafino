import { usePost } from "@/hooks/api/useReactQueryHooks";
import { UnblockUserParams } from "@/types/admin";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useUnblockUser = () => {
  const queryClient = useQueryClient();
  return usePost<any, UnblockUserParams>(
    (data) => `/v1/rate-limit/unblock/${data.id}`,
    undefined,
    {
      onSuccess: () => {
        toast.success("محدودیت با موفقیت آنبلاک شد");
        queryClient.invalidateQueries({ queryKey: ["rate-limit-records"] });
      },
      onError: () => {
        toast.error("خطا در آنبلاک شدن محدودیت");
      },
    }
  );
};
