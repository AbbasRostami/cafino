import { useDelete, usePatch } from "@/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateImage = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePatch<any, FormData>(
    "/v1/profile/image",
    {
      onSuccess: () => {
        toast.success("تصویر پروفایل با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      },
      onError: (error: any) => {
        console.error("Image upload error:", error);
        toast.error(
          error?.response?.data?.message || "خطا در ویرایش تصویر پروفایل"
        );
      },
    }
  );
  return { mutate, isPending, error };
};

export const useRemoveImage = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useDelete<any, void>(
    () => "/v1/profile/image",
    {
      onSuccess: () => {
        toast.success("تصویر پروفایل با موفقیت حذف شد");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        queryClient.refetchQueries({ queryKey: ["profile"] });
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
