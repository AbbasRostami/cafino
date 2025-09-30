import { usePost } from "@/hooks/api/useReactQueryHooks";
import { CreateContactRequest, CreateContactResponse } from "@/types/admin";
import { toast } from "sonner";

export const useCreateContact = () => {
  return usePost<CreateContactResponse, CreateContactRequest>(
    "/v1/contact",
    (data) => data,
    {
      onSuccess: () => {
        toast.success(
          "پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت."
        );
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            "خطا در ارسال پیام. لطفاً دوباره تلاش کنید."
        );
      },
    }
  );
};
