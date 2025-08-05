import { fetchApi } from "@/hooks/useAuthToken";
import CategorySectionClient from "./CategorySectionClient";
import { Category } from "@/types/main/Landing/Category/CategorySection";
import { cookies } from "next/headers";
const CategorySection = async () => {
   const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  console.log("🍪 All cookies:", allCookies);
  let categories: Category[] = [];
  try {
    const res = await fetchApi.get<{ data: Category[] }>("/v1/category");
    categories = res.data;
    console.log("categories:", categories);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return (
      <section className="text-center text-red-500">
        خطا در دریافت دسته‌بندی‌ها
      </section>
    );
  }


  return (
    <section className="pt-10 mb-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              دسته‌بندی‌های ما
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            بهترین انتخاب‌ها از منوی متنوع ما
          </p>
        </div>
        <CategorySectionClient items={categories} />
      </div>
    </section>
  );
};

export default CategorySection;
