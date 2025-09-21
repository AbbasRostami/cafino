import CategorySectionClient from "./CategorySectionClient";
import { getCategories } from "@/services/server";

const CategorySection = async () => {
  const categories = await getCategories();
  console.log("🔍 Categories loaded:", categories);
  return (
    <section className="pt-10 mb-10">
      <CategorySectionClient categories={categories?.categories} />
    </section>
  );
};

export default CategorySection;
