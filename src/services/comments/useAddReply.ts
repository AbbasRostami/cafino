import { usePost } from "@/hooks/api/useReactQueryHooks";
import { formatRetryAfter } from "@/utils/formatters";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AddReplyRequest {
  text: string;
  itemId: string;
  parentId: string;
}

export const useAddReply = () => {
  const queryClient = useQueryClient();

  const { mutate: addReply, isPending } = usePost<AddReplyRequest>(
    () => `/v1/comment`,
    undefined,
    {
      onSuccess: () => {
        toast.success("پاسخ شما بعد از تایید مدیر به نمایش در خواهد آمد");
        queryClient.invalidateQueries({ queryKey: ["v1/item"] });
        queryClient.invalidateQueries({ queryKey: ["comments-admin"] });
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 404:
            toast.error("نظر یافت نشد");
            break;
          case 429:
            const blockType429 = error?.blockType || "temporary";

            if (blockType429 === "permanent") {
              toast.error(
                "دسترسی شما به سیستم محدود شده است. برای رفع این مشکل با پشتیبانی تماس بگیرید.",
                {
                  duration: 10000,
                  action: {
                    label: "تماس با پشتیبانی",
                    actionButtonStyle: {
                      backgroundColor: "red",
                      color: "white",
                    },
                    onClick: () => {
                      window.location.href = "/contact-us";
                    },
                  },
                }
              );
            } else if (error?.retryAfter) {
              const timeText = formatRetryAfter(error.retryAfter);
              toast.error(
                `تعداد درخواست‌ها بیش از حد مجاز است. دوباره در ${timeText} دیگر تلاش کنید.`
              );
            } else {
              toast.error(
                "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً بعداً تلاش کنید."
              );
            }
            break;
          default:
            toast.error("خطا در اضافه کردن نظر. لطفاً دوباره تلاش کنید.");
            break;
        }
      },
    }
  );

  return { mutate: addReply, isPending };
};
