import { usePost } from "@/hooks/api/useReactQueryHooks";
import { ResetRateLimitParams } from "@/types/admin";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useResetRateLimit = () => {
  const queryClient = useQueryClient();
  return usePost<any, ResetRateLimitParams>(
    (data) => `/v1/rate-limit/reset/${data.id}`,
    undefined,
    {
      onSuccess: () => {
        toast.success("محدودیت با موفقیت ریست شد");
        queryClient.invalidateQueries({ queryKey: ["rate-limit-records"] });
      },
      onError: () => {
        toast.error("خطا در ریست کردن محدودیت");
      },
    }
  );
};
