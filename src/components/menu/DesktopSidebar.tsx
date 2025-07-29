import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { Slider } from "@/components/ui/slider";

interface DesktopSidebarProps {
  className?: string;
  categories: any;
  selectedCategoryId: string | null;
  searchParams: URLSearchParams;
  router: any;
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  DEFAULT_MIN: number;
  DEFAULT_MAX: number;
  isAvailableOnly: boolean;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  className,
  categories,
  selectedCategoryId,
  searchParams,
  router,
  hasActiveFilters,
  clearAllFilters,
  priceRange,
  setPriceRange,
  DEFAULT_MIN,
  DEFAULT_MAX,
  isAvailableOnly,
}) => {
  const [activeCategoryId, setActiveCategoryId] = React.useState<string | null>(
    selectedCategoryId
  );
  const [availableOnly, setAvailableOnly] =
    React.useState<boolean>(isAvailableOnly);
  const [localPriceRange, setLocalPriceRange] =
    React.useState<[number, number]>(priceRange);

  React.useEffect(() => {
    setActiveCategoryId(selectedCategoryId);
    setAvailableOnly(isAvailableOnly);
    setLocalPriceRange(priceRange);
  }, [selectedCategoryId, isAvailableOnly, priceRange]);

  const handlePriceRangeChange = (val: [number, number]) => {
    setLocalPriceRange(val);
  };

  const handlePriceRangeCommit = (val: [number, number]) => {
    setPriceRange(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val[0] !== DEFAULT_MIN) {
      params.set("minPrice", String(val[0]));
    } else {
      params.delete("minPrice");
    }
    if (val[1] !== DEFAULT_MAX) {
      params.set("maxPrice", String(val[1]));
    } else {
      params.delete("maxPrice");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <aside
      className={cn(
        "hidden lg:block w-80 h-full  bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl",
        className
      )}
    >
      <ScrollArea className="h-full " dir="rtl">
        <div className="p-6 space-y-8  ">
          {/* Header */}
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
                onClick={clearAllFilters}
              >
                <X size={16} />
                پاک کردن همه
              </Button>
            )}
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1 w-full rounded-full"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 w-full">
            {categories?.data?.map((category: any) => {
              const isSelected = selectedCategoryId === category.id;
              return (
                <div
                  key={category.id}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (isSelected) {
                      params.delete("categoryId");
                    } else {
                      params.set("categoryId", category.id);
                    }
                    params.set("page", "1");
                    router.push(`?${params.toString()}`);
                  }}
                  className={cn(
                    " cursor-pointer rounded-3xl border shadow-md overflow-hidden transition-all duration-300 group",
                    "flex flex-col items-center justify-center p-2  min-h-[80px] text-center backdrop-blur-lg",
                    isSelected
                      ? "bg-gradient-to-br from-[#fef3c7] to-[#fcd34d] dark:from-amber-900/30 dark:to-orange-900/30 border-amber-300 dark:border-amber-600 ring-2 ring-amber-300 dark:ring-amber-700 shadow-lg"
                      : "bg-white/50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-[1.025] hover:ring-1 hover:ring-orange-300"
                  )}
                >
                  {/* آیکون */}
                  <Sparkles
                    className={cn(
                      "w-6 h-6 mb-2 transition-all duration-300",
                      isSelected
                        ? "text-orange-600 dark:text-amber-400"
                        : "text-orange-400 group-hover:text-orange-500"
                    )}
                  />

                  {/* عنوان */}
                  <span
                    className={cn(
                      "text-sm font-bold leading-snug transition-colors break-words",
                      isSelected
                        ? "text-orange-800 dark:text-amber-100"
                        : "text-gray-800 dark:text-gray-200 group-hover:text-orange-700"
                    )}
                  >
                    {category.title}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-0.5 w-full rounded-full"></div>
          {/* محدوده قیمت */}
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
                <span>{localPriceRange[1]?.toLocaleString("fa-IR")} تومان</span>
                <span>{localPriceRange[0]?.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-0.5 w-full rounded-full"></div>
          {/* وضعیت موجودی */}
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
                {
                  label: "همه محصولات",
                  value: "all",
                  isSelected: !availableOnly,
                },
                {
                  label: "فقط موجودی‌ها",
                  value: "available",
                  isSelected: availableOnly,
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
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (option.value === "available") {
                      params.set("availableOnly", "true");
                    } else {
                      params.delete("availableOnly");
                    }
                    params.set("page", "1");
                    router.push(`?${params.toString()}`);
                  }}
                >
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      option.value === "available"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    )}
                  ></div>
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
      </ScrollArea>
    </aside>
  );
};

export default DesktopSidebar;
