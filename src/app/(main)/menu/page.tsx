"use client";
import { useSearchParams } from "next/navigation";
import { getMenuQueryParams } from "@/lib/query";
import { useGetItems } from "@/services";
import { Suspense } from "react";
import Menus from "@/components/main/menu/Menus";

const MenuContent = () => {
  const searchParams = useSearchParams();
  const { queryString, query } = getMenuQueryParams(searchParams);

  const { data: items, isLoading } = useGetItems(queryString);

  const pageNum = Number(items?.data?.page ?? query.page);
  const limitNum = Number(items?.data?.limit ?? query.limit);
  const totalNum = Number(items?.data?.total || 0);

  return (
    <div className="min-h-screen pt-20 md:pt-32 px-4 text-gray-800 dark:text-gray-200">
      <Menus
        items={items?.data?.items || []}
        isLoading={isLoading}
        page={pageNum}
        limit={limitNum}
        total={totalNum}
      />
    </div>
  );
};

const MenuPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <MenuContent />
  </Suspense>
);
export default MenuPage;
