import { useGet } from "@/hooks/useReactQueryHooks";
import { CategoryResponse } from "@/types/main/menu/menu";

export const useGetCategories = () => {
  return useGet<CategoryResponse>("/v1/category", {
    queryKey: ["categories"],
    staleTime: 0,
  });
};
