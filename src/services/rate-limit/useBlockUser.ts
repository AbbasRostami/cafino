import { usePost } from "@/hooks/api/useReactQueryHooks";
import { BlockUserParams } from "@/types/admin";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useBlockUser = () => {
  const queryClient = useQueryClient();
  return usePost<any, BlockUserParams>(
    (data) => `/v1/rate-limit/block/${data.id}`,
    (data) => ({ permanent: data.data.permanent }),
    {
      onSuccess: () => {
        toast.success("محدودیت با موفقیت بلاک شد");
        queryClient.invalidateQueries({ queryKey: ["rate-limit-records"] });
      },
      onError: () => {
        toast.error("خطا در بلاک شدن محدودیت");
      },
    }
  );
};
