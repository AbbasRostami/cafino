import { fetchApi } from "@/hooks/useAuthToken";
import CategorySectionClient from "./CategorySectionClient";
import { cookies } from "next/headers";
type Category = {
  id: string;
  title: string;
  slug: string;
  image: string;
  imageUrl: string;
  show: boolean;
};
const CategorySection = async () => {
  const cookieStore = await cookies();
  console.log("cookieStore:", cookieStore.getAll());
  const accessToken = cookieStore.get("access-token");
  const refreshToken = cookieStore.get("refresh-token");
  console.log("accessToken:", accessToken);
  console.log("refreshToken:", refreshToken);
  let categories: Category[] = [];
  try {
    const res = await fetchApi.get<{ data: Category[] }>("/v1/category");
    categories = res.data;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return (
      <section className="text-center text-red-500">
        خطا در دریافت دسته‌بندی‌ها
      </section>
    );
  }
  console.log("categories:", categories);

  return (
    <section className="pt-10 mb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
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
        <CategorySectionClient
          items={categories.map((cat) => ({
            id: cat.id,
            title: cat.title,
            slug: cat.slug,
            image: cat.imageUrl,
          }))}
        />
      </div>
    </section>
  );
};

export default CategorySection;
