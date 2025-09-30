import { usePatch } from "@/hooks/api/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateImage = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePatch<any, FormData>(
    "/v1/profile/image",
    undefined,
    {
      onSuccess: () => {
        toast.success("تصویر پروفایل با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["user-profile"] });
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
