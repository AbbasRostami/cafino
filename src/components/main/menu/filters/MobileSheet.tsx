import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/utils";
import { Slider } from "@/components/ui/slider";
import React, { useState, useEffect } from "react";
import { MobileSheetProps } from "@/types";
import { PriceInputs } from "./PriceInputs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useMenuFiltersNuqs } from "@/hooks/business/useMenuFiltersNuqs";

const MobileSheet = ({
  isOpen,
  setIsOpen,
  categories,
  FilterSectionHeader,
  DEFAULT_MIN,
  DEFAULT_MAX,
}: MobileSheetProps) => {
  const { filters, setFilters, clearFilters, hasActiveFilters } =
    useMenuFiltersNuqs();

  const [tempFilters, setTempFilters] = useState({
    category: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    availableOnly: filters.availableOnly,
  });

  useEffect(() => {
    if (isOpen) {
      setTempFilters({
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        availableOnly: filters.availableOnly,
      });
    }
  }, [
    isOpen,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.availableOnly,
  ]);

  const handleApplyFilters = () => {
    setFilters({
      category: tempFilters.category,
      minPrice: tempFilters.minPrice,
      maxPrice: tempFilters.maxPrice,
      availableOnly: tempFilters.availableOnly,
      page: 1,
    });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="xl:hidden flex gap-2 w-full">
        <SheetTrigger onClick={(e) => e.stopPropagation()} asChild>
          <Button
            variant="outline"
            size="lg"
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:from-amber-600 hover:to-orange-600 rounded-xl"
          >
            فیلتر
            <Filter className="w-6 h-6 ml-2" />
          </Button>
        </SheetTrigger>

        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="outline"
            size="lg"
            className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg hover:from-red-600 hover:to-rose-700 rounded-xl"
          >
            حذف فیلتر
            <X className="w-6 h-6 ml-2" />
          </Button>
        )}
      </div>
      <SheetContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        aria-describedby="filters-sidebar"
        side="right"
        className="w-[90vw] max-w-md p-0 border-none bg-white/95 dark:bg-gray-800/50 backdrop-blur-xl"
      >
        <VisuallyHidden>
          <SheetTitle>فیلتر‌ها</SheetTitle>
          <SheetDescription>فیلتر‌ها</SheetDescription>
        </VisuallyHidden>
        <ScrollArea className="h-full" dir="rtl">
          <div className="p-6 space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold dark:text-white bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                فیلتر‌ها
              </h2>
            </div>
            <div className="space-y-8">
              <div>
                <div className="grid grid-cols-2 gap-3">
                  {categories?.categories?.map((category: any) => {
                    const isSelected = tempFilters.category === category?.title;
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
                          setTempFilters({
                            ...tempFilters,
                            category:
                              tempFilters.category === category.title
                                ? null
                                : category.title,
                          });
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
                    value={[tempFilters.minPrice, tempFilters.maxPrice]}
                    min={DEFAULT_MIN}
                    max={DEFAULT_MAX}
                    step={1000}
                    onValueChange={(val) =>
                      setTempFilters({
                        ...tempFilters,
                        minPrice: val[0],
                        maxPrice: val[1],
                      })
                    }
                  />
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span>{tempFilters.maxPrice} تومان</span>
                    <span>{tempFilters.minPrice} تومان</span>
                  </div>
                  <PriceInputs
                    minPrice={tempFilters.minPrice}
                    maxPrice={tempFilters.maxPrice}
                    onMinPriceChange={(val) =>
                      setTempFilters({ ...tempFilters, minPrice: val })
                    }
                    onMaxPriceChange={(val) =>
                      setTempFilters({ ...tempFilters, maxPrice: val })
                    }
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
                      value: "true",
                      color: "bg-green-500",
                      isSelected: tempFilters.availableOnly === "true",
                    },
                    {
                      label: "همه",
                      value: null,
                      color: "bg-blue-500",
                      isSelected:
                        !tempFilters.availableOnly ||
                        tempFilters.availableOnly === null,
                    },
                  ].map((option) => (
                    <div
                      key={option.value || "all"}
                      className={cn(
                        "p-3 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-3",
                        option.isSelected
                          ? option.value === "true"
                            ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-300 dark:border-green-700 shadow-inner"
                            : "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-300 dark:border-blue-700 shadow-inner"
                          : "bg-white/50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setTempFilters({
                          ...tempFilters,
                          availableOnly: option.value,
                        });
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
                onClick={clearFilters}
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
