"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/utils";
import { PriceInputsProps } from "@/types/main";

export const PriceInputs = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  defaultMin,
  defaultMax,
  className,
}: PriceInputsProps) => {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || defaultMin;
    onMinPriceChange(Math.max(defaultMin, Math.min(value, maxPrice)));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || defaultMax;
    onMaxPriceChange(Math.max(minPrice, Math.min(value, defaultMax)));
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label
            htmlFor="max-price"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            حداکثر قیمت
          </Label>
          <div className="relative">
            <Input
              id="max-price"
              type="number"
              value={maxPrice === defaultMax ? "" : maxPrice}
              onChange={handleMaxPriceChange}
              placeholder={String(defaultMax)}
              className="pr-8 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={minPrice}
              max={defaultMax}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
              تومان
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="min-price"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            حداقل قیمت
          </Label>
          <div className="relative">
            <Input
              id="min-price"
              type="number"
              value={minPrice === defaultMin ? "" : minPrice}
              onChange={handleMinPriceChange}
              placeholder={String(defaultMin)}
              className="pr-8 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={defaultMin}
              max={maxPrice}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
              تومان
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
