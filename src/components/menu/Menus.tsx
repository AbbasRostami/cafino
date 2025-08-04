"use client";
import dynamic from "next/dynamic";
import { SkeletonSidebar } from "../skeleton/main/menu/SkeletonSidebar";
import { MenusProps } from "@/types/main/menu/menu";
import { MenuHeader } from "./layout/MenuHeader";
import { SearchBar } from "./filters/SearchBar";
import { MenuControls } from "./filters/MenuControls";
import { MenuGrid, MenuPagination } from ".";
import { useMenuFilters } from "../../hooks/useMenuFilters";
import { MenuItemSkeleton } from "../skeleton/main/menu/MenuItemSkeleton";
const MenuFiltersSidebar = dynamic(
  () => import("./filters/MenuFiltersSidebar"),
  {
    ssr: false,
  }
);

export default function Menus({ items, isLoading, total }: MenusProps) {
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

  const totalParam = Number(total) || 0;
  const totalPages = Math.max(1, Math.ceil(totalParam / limitParam));
  const currentPage = pageParam;
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <MenuHeader />

      {/* Search Section */}
      <SearchBar input={input} setInput={setInput} />

      {/* Controls Section */}
      <MenuControls
        selectedSortBy={selectedSortBy}
        onSortChange={handleSortChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onClearFilters={clearFilters}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - only show on desktop */}
        <div className="h-full shrink-0">
          {isLoading ? <SkeletonSidebar /> : <MenuFiltersSidebar />}
        </div>

        {/* Menu Grid */}
        <div className="flex-1">
          {isLoading ? (
            <MenuItemSkeleton viewMode={viewMode} />
          ) : (
            <MenuGrid items={items} viewMode={viewMode} />
          )}
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && items && items.length > 0 && (
        <MenuPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
}
