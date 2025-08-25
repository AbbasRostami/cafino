import CategorySectionClient from "./CategorySectionClient";
import { cookies } from "next/headers";
import { fetchApiWithCookies } from "@/hooks/fetchApiWithCookies";
import { CategoryResponse } from "@/types/main/Landing";

const CategorySection = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  console.log("🍪 All cookies:", allCookies);
  let categories: CategoryResponse = { categories: [] };
  try {
    const res = await fetchApiWithCookies("/v1/category");
    const data = await res.json();
    categories = data.data;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
  }

  return (
    <section className="pt-10 mb-10">
      <CategorySectionClient categories={categories?.categories} />
    </section>
  );
};

export default CategorySection;
