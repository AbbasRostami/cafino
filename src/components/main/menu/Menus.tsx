"use client";
import dynamic from "next/dynamic";
import { useGetItems } from "@/services";
import { SearchBar } from "./filters/SearchBar";
import { MenuControls } from "./filters/MenuControls";
import { EmptyState, MenuGrid, MenuPagination } from ".";
import { MenuItemResponse } from "@/types/main/menu";
import { useMenuFiltersNuqs } from "@/hooks/business/useMenuFiltersNuqs";

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
  const {
    filters,
    queryString,
    setFilters,
    viewMode,
    handleViewModeChange,
    clearFilters,
    handleSearchChange,
  } = useMenuFiltersNuqs();
  
  const { data: items } = useGetItems(queryString, initialData);

  const itemsList = items?.data?.items || [];
  const totalParam = Number(items?.data?.total || 0);
  const totalPages = Math.max(1, Math.ceil(totalParam / filters.limit));
  const currentPage = filters.page;

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar
        input={filters.search}
        handleSearchChange={handleSearchChange}
      />

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="h-full shrink-0">
          <MenuFiltersSidebar />
        </div>

        <div className="flex-1">
          <MenuControls
            selectedSortBy={filters.sortBy || ""}
            onSortChange={(value) => setFilters({ sortBy: value, page: 1 })}
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
          onPageChange={(page) => setFilters({ page })}
        />
      )}
    </div>
  );
}
