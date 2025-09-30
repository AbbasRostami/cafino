import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/utils";
import { Slider } from "@/components/ui/slider";
import React, { useState, useEffect } from "react";
import { useMenuFilters } from "@/hooks/business/useMenuFilters";
import { MobileSheetProps } from "@/types";
import { PriceInputs } from "./PriceInputs";

const MobileSheet = ({
  isOpen,
  setIsOpen,
  categories,
  FilterSectionHeader,
  DEFAULT_MIN,
  DEFAULT_MAX,
}: MobileSheetProps) => {
  const { filters, updateFilter, resetFilters } = useMenuFilters();

  const [tempCategoryId, setTempCategoryId] = useState(filters.category);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([
    filters.minPrice,
    filters.maxPrice,
  ]);
  const [tempAvailableOnly, setTempAvailableOnly] = useState(
    filters.availableOnly
  );

  useEffect(() => {
    setTempCategoryId(filters.category);
    setTempPriceRange([filters.minPrice, filters.maxPrice]);
    setTempAvailableOnly(filters.availableOnly);
  }, [filters]);

  const handleApplyFilters = () => {
    updateFilter({
      category: tempCategoryId,
      minPrice: tempPriceRange[0],
      maxPrice: tempPriceRange[1],
      availableOnly: tempAvailableOnly,
    });

    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setTempCategoryId(null);
    setTempPriceRange([DEFAULT_MIN, DEFAULT_MAX]);
    setTempAvailableOnly(false);
    resetFilters();
    setIsOpen(false);
  };

  const handleLocalMinPriceChange = (value: number) => {
    const newRange: [number, number] = [value, tempPriceRange[1]];
    setTempPriceRange(newRange);
  };

  const handleLocalMaxPriceChange = (value: number) => {
    const newRange: [number, number] = [tempPriceRange[0], value];
    setTempPriceRange(newRange);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger onClick={(e) => e.stopPropagation()} asChild>
        <Button
          variant="outline"
          size="lg"
          className="xl:hidden w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:from-amber-600 hover:to-orange-600 p-0 rounded-xl"
        >
          فیلتر
          <Filter className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        aria-describedby="filters-sidebar"
        side="right"
        className="w-[90vw] max-w-md p-0 bg-white/95 dark:bg-gray-800/50 backdrop-blur-xl"
      >
        <ScrollArea className="h-full" dir="rtl">
          <div className="p-6 space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold dark:text-white bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                فیلتر‌ها
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={20} />
              </Button>
            </div>
            <div className="space-y-8">
              <div>
                <div className="grid grid-cols-2 gap-3">
                  {categories?.categories?.map((category: any) => {
                    const isSelected = tempCategoryId === category?.id;
                    return (
                      <div
                        key={category.id}
                        className={cn(
                          "p-3 rounded-xl border transition-all duration-300 cursor-pointer",
                          isSelected
                            ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-300 dark:border-amber-700 shadow-inner"
                            : "bg-white/50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setTempCategoryId(
                            tempCategoryId === category.id ? null : category.id
                          );
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "p-2 rounded-lg",
                              isSelected
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-amber-500"
                            )}
                          ></div>
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-gray-200">
                              {category.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1 w-full rounded-full"></div>
              <div>
                <FilterSectionHeader title="محدوده قیمت" />
                <div className="space-y-4">
                  <Slider
                    value={tempPriceRange}
                    min={DEFAULT_MIN}
                    max={DEFAULT_MAX}
                    step={1000}
                    onValueChange={(val) =>
                      setTempPriceRange(val as [number, number])
                    }
                  />
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span>{tempPriceRange[1]} تومان</span>
                    <span>{tempPriceRange[0]} تومان</span>
                  </div>
                  <PriceInputs
                    minPrice={tempPriceRange[0]}
                    maxPrice={tempPriceRange[1]}
                    onMinPriceChange={handleLocalMinPriceChange}
                    onMaxPriceChange={handleLocalMaxPriceChange}
                    defaultMin={DEFAULT_MIN}
                    defaultMax={DEFAULT_MAX}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1 w-full rounded-full"></div>

              <div>
                <FilterSectionHeader title="وضعیت موجودی" />
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      label: "موجودی‌ها",
                      value: "available",
                      color: "bg-green-500",
                      isSelected: tempAvailableOnly,
                    },
                    {
                      label: "همه",
                      value: "all",
                      color: "bg-blue-500",
                      isSelected: !tempAvailableOnly,
                    },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={cn(
                        "p-3 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-3",
                        option.isSelected
                          ? option.value === "available"
                            ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-300 dark:border-green-700 shadow-inner"
                            : "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-300 dark:border-blue-700 shadow-inner"
                          : "bg-white/50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setTempAvailableOnly(option.value === "available");
                      }}
                    >
                      <div className={cn("p-2 rounded-lg", option.color)}>
                        <div
                          className={cn("w-2 h-2 rounded-full", option.color)}
                        ></div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">
                          {option.label}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 py-3 border-amber-500 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                onClick={handleClearFilters}
              >
                پاک کردن همه
              </Button>
              <Button
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                onClick={handleApplyFilters}
              >
                اعمال فیلتر
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
