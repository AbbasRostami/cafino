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
      onError: () => {
        toast.error("خطا در قبول نظر");
      },
    }
  );

  return { mutate, isPending, variables };
};
