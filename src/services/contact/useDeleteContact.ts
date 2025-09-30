import { useDelete } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, variables } = useDelete<
    unknown,
    { id: string }
  >(({ id }) => `/v1/contact/${id}`, {
    onSuccess: () => {
      toast.success("پیام های تماس مورد نظر حذف شد");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: () => {
      toast.error("خطا در حذف پیام های تماس مورد نظر");
    },
  });
  return { mutate, isPending, error, variables };
};
