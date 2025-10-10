"use client";
import { Filter } from "lucide-react";
import DesktopSidebar from "./DesktopSidebar";
import { useGetCategories } from "@/services";
import { useState } from "react";
import MobileSheet from "./MobileSheet";
import { useMenuFiltersNuqs } from "@/hooks/business/useMenuFiltersNuqs";

const MenuFiltersSidebar = () => {
  const { data: categories } = useGetCategories();

  const [isOpen, setIsOpen] = useState(false);

  const {
    filters,
    setFilters,
    clearFilters,
    hasActiveFilters,
    DEFAULT_MIN,
    DEFAULT_MAX,
  } = useMenuFiltersNuqs();

  const FilterSectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <Filter size={18} />
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {title}
      </h3>
    </div>
  );

  return (
    <>
      <DesktopSidebar
        categories={categories?.data || []}
        filters={filters}
        updateFilter={setFilters}
        resetFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        FilterSectionHeader={FilterSectionHeader}
        DEFAULT_MIN={DEFAULT_MIN}
        DEFAULT_MAX={DEFAULT_MAX}
        handleMinPriceInputChange={() => {}}
        handleMaxPriceInputChange={() => {}}
      />
      <MobileSheet
        categories={categories?.data || []}
        FilterSectionHeader={FilterSectionHeader}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleMinPriceInputChange={() => {}}
        handleMaxPriceInputChange={() => {}}
        DEFAULT_MIN={DEFAULT_MIN}
        DEFAULT_MAX={DEFAULT_MAX}
      />
    </>
  );
};

export default MenuFiltersSidebar;
