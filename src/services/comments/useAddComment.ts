import { usePost } from "@/hooks/api/useReactQueryHooks";
import { formatBlockType, formatRetryAfter } from "@/utils/formatters";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AddCommentRequest {
  itemId: string;
  rating: number;
  comment: string;
}

export const useAddComment = () => {
  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = usePost<AddCommentRequest>(
    () => `/v1/comment`,
    undefined,
    {
      onSuccess: () => {
        toast.success("بعد تایید توسط مدیریت نظر شما با موفقیت اضافه خواهد شد");
        queryClient.invalidateQueries({ queryKey: ["v1/item"] });
        queryClient.invalidateQueries({ queryKey: ["comments-admin"] });
        queryClient.invalidateQueries({ queryKey: ["comments"] });
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
            toast.error("خطا در اضافه کردن نظر");
            break;
        }
      },
    }
  );

  return { mutate: addComment, isPending };
};
