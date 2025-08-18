import { usePut } from "@/hooks/useReactQueryHooks";
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
      },
      onError: () => {
        toast.error("خطا در قبول نظر");
      },
    }
  );

  return { mutate, isPending, variables };
};
