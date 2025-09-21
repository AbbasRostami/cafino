import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Sparkles, X } from "lucide-react";
import { cn } from "@/utils/utils";
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { DesktopSidebarProps } from "@/types/main";
import { PriceInputs } from "./PriceInputs";
import { formatCurrency } from "@/utils/formatters";

const DesktopSidebar = ({
  className,
  categories,
  filters,
  updateFilter,
  resetFilters,
  hasActiveFilters,
  DEFAULT_MIN,
  DEFAULT_MAX,
}: DesktopSidebarProps) => {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    filters?.minPrice,
    filters?.maxPrice,
  ]);

  useEffect(() => {
    setLocalPriceRange([filters?.minPrice, filters?.maxPrice]);
  }, [filters?.minPrice, filters?.maxPrice]);

  const handlePriceRangeChange = (val: [number, number]) => {
    setLocalPriceRange(val);
  };

  const handlePriceRangeCommit = (val: [number, number]) => {
    updateFilter({ minPrice: val[0], maxPrice: val[1] });
  };

  const handleLocalMinPriceChange = (value: number) => {
    const newRange: [number, number] = [value, localPriceRange[1]];
    setLocalPriceRange(newRange);
  };

  const handleLocalMaxPriceChange = (value: number) => {
    const newRange: [number, number] = [localPriceRange[0], value];
    setLocalPriceRange(newRange);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        localPriceRange[0] !== filters.minPrice ||
        localPriceRange[1] !== filters.maxPrice
      ) {
        updateFilter({
          minPrice: localPriceRange[0],
          maxPrice: localPriceRange[1],
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [localPriceRange, filters.minPrice, filters.maxPrice, updateFilter]);

  return (
    <aside
      className={cn(
        "hidden xl:block w-80 h-full  bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl",
        className
      )}
    >
      <ScrollArea className="h-full " dir="rtl">
        <div className="p-6 space-y-8  ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold  dark:text-white bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <SlidersHorizontal size={20} />
              </div>
              فیلتر‌ها
            </h2>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 flex items-center gap-1"
                onClick={resetFilters}
              >
                <X size={16} />
                پاک کردن همه
              </Button>
            )}
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1 w-full rounded-full"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 w-full">
            {categories?.categories?.map((category: any) => (
              <div
                key={category?.id}
                onClick={() => {
                  updateFilter({
                    category:
                      filters?.category === category?.title
                        ? null
                        : category?.title,
                  });
                }}
                className={cn(
                  "cursor-pointer rounded-3xl border shadow-md overflow-hidden transition-all duration-300 group",
                  "flex flex-col items-center justify-center p-2 min-h-[80px] text-center backdrop-blur-lg",
                  filters?.category === category?.title
                    ? "bg-gradient-to-br from-[#fef3c7] to-[#fcd34d] dark:from-amber-900/30 dark:to-orange-900/30 border-amber-300 dark:border-amber-600 ring-2 ring-amber-300 dark:ring-amber-700 shadow-lg"
                    : "bg-white/50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-[1.025] hover:ring-1 hover:ring-orange-300"
                )}
              >
                <Sparkles
                  className={cn(
                    "w-6 h-6 mb-2 transition-all duration-300",
                    filters?.category === category?.title
                      ? "text-orange-600 dark:text-amber-400"
                      : "text-orange-400 group-hover:text-orange-500"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-bold leading-snug transition-colors break-words",
                    filters?.category === category?.title
                      ? "text-orange-800 dark:text-amber-100"
                      : "text-gray-800 dark:text-gray-200 group-hover:text-orange-700"
                  )}
                >
                  {category?.title}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-0.5 w-full rounded-full"></div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <SlidersHorizontal size={18} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                محدوده قیمت
              </h3>
            </div>
            <div className="space-y-4">
              <Slider
                value={localPriceRange}
                min={DEFAULT_MIN}
                max={DEFAULT_MAX}
                step={1000}
                className="w-full"
                onValueChange={handlePriceRangeChange}
                onValueCommit={handlePriceRangeCommit}
              />
              <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                <span>{formatCurrency(localPriceRange[1])} تومان</span>
                <span>{formatCurrency(localPriceRange[0])} تومان</span>
              </div>

              <PriceInputs
                minPrice={localPriceRange[0]}
                maxPrice={localPriceRange[1]}
                onMinPriceChange={handleLocalMinPriceChange}
                onMaxPriceChange={handleLocalMaxPriceChange}
                defaultMin={DEFAULT_MIN}
                defaultMax={DEFAULT_MAX}
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-0.5 w-full rounded-full"></div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <SlidersHorizontal size={18} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                وضعیت موجودی
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "همه محصولات", value: false },
                { label: "فقط موجودی‌ها", value: true },
              ]?.map((option) => (
                <div
                  key={option?.label}
                  className={cn(
                    "p-3 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-3",
                    filters?.availableOnly === option?.value
                      ? option?.value
                        ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-300 dark:border-green-700 shadow-inner"
                        : "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-300 dark:border-blue-700 shadow-inner"
                      : "bg-white/50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  )}
                  onClick={() =>
                    updateFilter({
                      availableOnly: option?.value,
                    })
                  }
                >
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      option?.value ? "bg-green-500" : "bg-blue-500"
                    )}
                  ></div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                    {option?.label}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default DesktopSidebar;
