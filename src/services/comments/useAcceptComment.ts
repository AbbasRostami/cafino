import { usePut } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAcceptComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = usePut<{ id: string }>(
    (data) => `/v1/comment/accept/${data?.id}`,
    undefined,
    {
      onSuccess: () => {
        toast.success("نظر با موفقیت قبول شد");
        queryClient.invalidateQueries({ queryKey: ["comments-admin"] });
        queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
        queryClient.invalidateQueries({ queryKey: ["comment-overview"] });
      },
      onError: (error: any) => {
        switch (error?.statusCode) {
          case 403:
            toast.error("دسترسی غیرمجاز: شما اجازه قبول نظر را ندارید");
            break;
          case 404:
            toast.error("نظر یافت نشد");
            break;
          case 409:
            toast.error("نظر قبلاً قبول شده است");
            break;
          default:
            toast.error("خطا در قبول نظر. لطفاً دوباره تلاش کنید.");
            break;
        }
      },
    }
  );

  return { mutate, isPending, variables };
};
