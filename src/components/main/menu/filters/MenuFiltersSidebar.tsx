"use client";
import { Filter } from "lucide-react";
import DesktopSidebar from "./DesktopSidebar";
import { useGetCategories } from "@/services";
import { useState } from "react";
import MobileSheet from "./MobileSheet";
import { useMenuFilters } from "@/hooks/business/useMenuFilters";

const MenuFiltersSidebar = () => {
  const { data: categories } = useGetCategories();

  const [isOpen, setIsOpen] = useState(false);
  const {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    DEFAULT_MIN,
    DEFAULT_MAX,
    handleMinPriceInputChange,
    handleMaxPriceInputChange,
  } = useMenuFilters();

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
        updateFilter={updateFilter}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        FilterSectionHeader={FilterSectionHeader}
        DEFAULT_MIN={DEFAULT_MIN || 0}
        DEFAULT_MAX={DEFAULT_MAX || 200000}
        handleMinPriceInputChange={handleMinPriceInputChange}
        handleMaxPriceInputChange={handleMaxPriceInputChange}
      />
      <MobileSheet
        categories={categories?.data || []}
        FilterSectionHeader={FilterSectionHeader}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleMinPriceInputChange={handleMinPriceInputChange}
        handleMaxPriceInputChange={handleMaxPriceInputChange}
        DEFAULT_MIN={DEFAULT_MIN || 0}
        DEFAULT_MAX={DEFAULT_MAX || 200000}
      />
    </>
  );
};

export default MenuFiltersSidebar;
