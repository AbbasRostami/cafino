import { usePut } from "@/hooks/api/useReactQueryHooks";
import { UpdateAddressRequest } from "@/types/Profile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = usePut<UpdateAddressRequest>(
    (data) => `/v1/profile/address/${data.id}`,
    (data) => {
      const { id, ...body } = data;
      return body;
    },
    {
      onSuccess: () => {
        toast.success("آدرس با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      },
      onError: () => {
        toast.error("خطا در ویرایش آدرس");
      },
    }
  );
  return {
    mutate,
    isPending,
  };
};
