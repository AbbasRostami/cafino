import { useGet } from "@/hooks/useReactQueryHooks";
import { CategoryResponseMenu } from "@/types/main/menu";

export const useGetCategories = () => {
  return useGet<CategoryResponseMenu>("/v1/category", {
    queryKey: ["categories"],
    staleTime: 0,
  });
};
