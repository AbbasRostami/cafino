"use client";
import Menus from "@/components/menu/Menus";
import { useSearchParams } from "next/navigation";
import { getMenuQueryParams } from "@/lib/query";
import { useGetItems } from "@/services/item";

const MenuPage = () => {
  const searchParams = useSearchParams();
  const { queryString, query } = getMenuQueryParams(searchParams);

  const { data: items, isLoading } = useGetItems(queryString);

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
