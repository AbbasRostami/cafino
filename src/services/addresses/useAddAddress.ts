import { usePost } from "@/hooks/api/useReactQueryHooks";
import { AddressRequest } from "@/types/Profile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = usePost<AddressRequest>(
    () => `/v1/profile/address`,
    undefined,
    {
      onSuccess: () => {
        toast.success("آدرس با موفقیت اضافه شد");
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      },
      onError: () => {
        toast.error("خطا در اضافه کردن آدرس");
      },
    }
  );
  return {
    mutate,
    isPending,
  };
};
