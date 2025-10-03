"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useGetItems } from "@/services";
import { getMenuQueryParams } from "@/utils/queryParams";
import { SearchBar } from "./filters/SearchBar";
import { MenuControls } from "./filters/MenuControls";
import { EmptyState, MenuGrid, MenuPagination } from ".";
import { useMenuFilters } from "@/hooks/business/useMenuFilters";
import { MenuItemResponse } from "@/types/main/menu";

const MenuFiltersSidebar = dynamic(
  () => import("./filters/MenuFiltersSidebar"),
  {
    ssr: false,
  }
);

export default function Menus({
  initialData,
}: {
  initialData: MenuItemResponse;
}) {
  const searchParams = useSearchParams();
  const { queryString } = getMenuQueryParams(searchParams);

  const { data: items } = useGetItems(queryString, initialData);

  const {
    viewMode,
    input,
    setInput,
    selectedSortBy,
    pageParam,
    limitParam,
    handleSortChange,
    handleViewModeChange,
    goToPage,
    clearFilters,
  } = useMenuFilters();

  const itemsList = items?.data?.items || [];
  const totalParam = Number(items?.data?.total || 0);
  const totalPages = Math.max(1, Math.ceil(totalParam / limitParam));
  const currentPage = pageParam;

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar input={input} setInput={setInput} />

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="h-full shrink-0">
          <MenuFiltersSidebar />
        </div>

        <div className="flex-1">
          <MenuControls
            selectedSortBy={selectedSortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onClearFilters={clearFilters}
          />

          {itemsList?.length > 0 ? (
            <MenuGrid items={itemsList} viewMode={viewMode} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {itemsList && itemsList?.length > 0 && (
        <MenuPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
}
