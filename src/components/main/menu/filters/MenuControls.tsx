"use client";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { MenuControlsProps } from "@/types/main";

export const MenuControls = ({
  selectedSortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: MenuControlsProps) => {
  const sortOptions = [
    { value: "", label: "همه" },
    { value: "newest", label: "جدیدترین" },
    { value: "topRated", label: "بیشترین امتیاز" },
    { value: "highestDiscount", label: "بیشترین تخفیف" },
    { value: "highestPrice", label: "گران‌ترین" },
    { value: "lowestPrice", label: "ارزان‌ترین" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6">
      <div className="flex overflow-x-auto scrollbar-hide gap-3 justify-center md:justify-start">
        {sortOptions.map((category) => (
          <button
            key={category.value}
            className={`px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm font-medium cursor-pointer rounded-3xl shadow-sm transition-all duration-200 backdrop-blur-md border ${
              selectedSortBy === category.value
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400"
                : "bg-white/70 dark:bg-gray-800/40 border-gray-300 dark:border-gray-700 hover:bg-amber-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
            onClick={() => onSortChange(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="items-center gap-1 justify-center md:justify-end hidden md:flex">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => onViewModeChange("grid")}
              className={`p-5 rounded-xl transition-all shadow-md cursor-pointer hover:scale-105 ${
                viewMode === "grid"
                  ? "bg-gradient-to-tr from-amber-500 to-orange-500 text-white"
                  : "bg-white/70 dark:bg-gray-700/40 text-gray-700 dark:text-gray-200"
              }`}
            >
              <Grid size={30} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>حالت گرید</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => onViewModeChange("list")}
              className={`p-5 rounded-xl transition-all shadow-md cursor-pointer hover:scale-105 ${
                viewMode === "list"
                  ? "bg-gradient-to-tr from-amber-500 to-orange-500 text-white"
                  : "bg-white/70 dark:bg-gray-700/40 text-gray-700 dark:text-gray-200"
              }`}
            >
              <List size={30} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>حالت لیست</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
