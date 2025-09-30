import { useDelete } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveImage = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useDelete<any, void>(
    () => "/v1/profile/image",
    {
      onSuccess: () => {
        toast.success("تصویر پروفایل با موفقیت حذف شد");
        queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        queryClient.refetchQueries({ queryKey: ["user-profile"] });
      },

      onError: (error: any) => {
        console.error("Image removal error:", error);
        toast.error(
          error?.response?.data?.message || "خطا در حذف تصویر پروفایل"
        );
      },
    }
  );
  return { mutate, isPending, error };
};
