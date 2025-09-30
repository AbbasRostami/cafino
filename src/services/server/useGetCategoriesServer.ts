import { fetchWithServer } from "@/hooks/api/fetchApiWithCookies";
import { CategoryResponse } from "@/types/main";

export const getCategories = async (): Promise<CategoryResponse> => {
  try {
    const res = await fetchWithServer("/v1/category", {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.data as CategoryResponse;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return { categories: [] };
  }
};
