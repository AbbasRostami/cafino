import { useDelete } from "@/hooks/api/useReactQueryHooks";
import { DeleteAddressRequest } from "@/types/Profile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useDelete<
    unknown,
    DeleteAddressRequest
  >((data) => `/v1/profile/address/${data?.id}`, {
    onSuccess: () => {
      toast.success("آدرس با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: () => {
      toast.error("خطا در حذف آدرس");
    },
  });
  return {
    mutate,
    isPending,
    variables,
  };
};
