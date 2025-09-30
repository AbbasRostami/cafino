import { usePost } from "@/hooks/api/useReactQueryHooks";
import { toast } from "sonner";

export const useSendOTP = () => {
  const { mutate, isPending, error } = usePost<any, { phone: string }>(
    () => "/v1/auth/send-otp",
    undefined,
    {
      onSuccess: () => {
        toast.success("کد تایید با موفقیت ارسال شد");
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 403:
            toast.error("شماره تلفن شما در لیست سیاه قرار دارد");
            break;
          case 409:
            toast.error(
              "کد تایید قبلی هنوز معتبر است. لطفاً از آن استفاده کنید"
            );
            break;
          case 429:
            toast.error(
              "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً بعداً تلاش کنید"
            );
            break;
          default:
            toast.error("خطا در ارسال کد تایید");
            break;
        }
      },
    }
  );
  return { mutate, isPending, error };
};
