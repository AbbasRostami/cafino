"use client";
import Menus from "@/components/menu/Menus";
import { useSearchParams } from "next/navigation";
import { getMenuQueryParams } from "@/lib/query";
import { useGet } from "@/hooks/useReactQueryHooks";

const MenuPage = () => {
  const searchParams = useSearchParams();
  const { queryString, query } = getMenuQueryParams(searchParams);

  const endpoint = `/v1/item?${queryString}`;

  const { data: items, isLoading } = useGet<any>(endpoint, {
    queryKey: ["items", queryString],
    staleTime: 10 * 1000,
  });
  console.log("itemsTTTT", items);
  const pageNum = Number(items?.page ?? query.page);
  const limitNum = Number(items?.limit ?? query.limit);
  const totalNum = Number(items?.total || 0);

  return (
    <div className="min-h-screen pt-36 px-4 text-gray-800 dark:text-gray-200">
      <Menus
        items={items?.data || []}
        isLoading={isLoading}
        page={pageNum}
        limit={limitNum}
        total={totalNum}
      />
    </div>
  );
};

export default MenuPage;
