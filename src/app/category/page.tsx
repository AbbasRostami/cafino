import { fetchApi } from "@/hooks/useAuthToken";
import Image from "next/image";

export default async function CategoryPage() {
  const categories = await fetchApi.get<any>("/v1/category");
  console.log("categories", categories);
  return (
    <div>
      <h1>Categories</h1>
      {categories?.data?.map((category: any) => (
        <div key={category.id} className="flex flex-col gap-2">
          <p>{category.id}</p>
          <p>{category.title}</p>
          <Image
            src={category.imageUrl}
            alt={category.title}
            width={100}
            height={100}
            priority
          />
        </div>
      ))}
    </div>
  );
}
