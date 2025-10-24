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
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 403:
            toast.error(
              "دسترسی غیرمجاز: شما اجازه ریست کردن محدودیت را ندارید"
            );
            break;
          case 404:
            toast.error("محدودیت یافت نشد");
            break;
          default:
            toast.error("خطا در ریست کردن محدودیت. لطفاً دوباره تلاش کنید.");
            break;
        }
      },
    }
  );
};
