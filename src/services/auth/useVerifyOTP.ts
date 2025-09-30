import { usePost } from "@/hooks/api/useReactQueryHooks";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export const useVerifyOTP = () => {
  const { setAuthenticated } = useAuthStore();
  const { mutate, isPending, error } = usePost<
    any,
    { phone: string; otpCode: string }
  >(() => "/v1/auth/verfiy-otp", undefined, {
    onSuccess: () => {
      setAuthenticated(true);
      toast.success("با موفقیت وارد شدید!");
    },
    onError: (error: any) => {
      switch (error?.statusCode) {
        case 403:
          toast.error("شماره تلفن شما در لیست سیاه قرار دارد");
          break;
        case 404:
          toast.error("حسابی با این شماره تلفن ثبت نشده است");
          break;
        case 409:
          toast.error(
            "این کد تایید قبلاً استفاده شده است. لطفاً کد جدیدی درخواست کنید"
          );
          break;
        case 410:
          toast.error(
            "کد تایید شما منقضی شده است. لطفاً کد جدیدی درخواست کنید"
          );
          break;
        case 422:
          toast.error("کد تایید وارد شده صحیح نیست. لطفاً دوباره تلاش کنید");
          break;
        case 429:
          toast.error(
            "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً بعداً تلاش کنید"
          );
          break;
        default:
          toast.error("کد تایید نامعتبر است");
          break;
      }
    },
  });

  return { mutate, isPending, error };
};
