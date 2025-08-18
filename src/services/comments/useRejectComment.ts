import { usePut } from "@/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRejectComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = usePut<{ id: string }>(
    (data) => `/v1/comment/reject/${data?.id}`,
    undefined,
    {
      onSuccess: () => {
        toast.success("نظر با موفقیت رد شد");
        queryClient.invalidateQueries({ queryKey: ["comments-admin"] });
      },
      onError: () => {
        toast.error("خطا در رد نظر");
      },
    }
  );

  return { mutate, isPending, variables };
};
