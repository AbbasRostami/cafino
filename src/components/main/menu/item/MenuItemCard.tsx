"use client";
import { Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FavoriteToggleButton } from "@/components/ui/FavoriteToggleButton";
import { AddToCartButtonStyled } from "@/components/ui/AddToCartButtonStyled";
import { MenuItemCardProps, PriceInfo } from "@/types/main";
import { cn } from "@/utils/utils";
import { formatCurrency, getStockStatus } from "@/utils/formatters";
import { CartItem } from "@/store/cartStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const calculatePrice = (item: any): PriceInfo => {
  const discount = item?.discount || 0;
  const originalPrice = item?.price;
  const finalPrice =
    discount > 0
      ? originalPrice - (originalPrice * discount) / 100
      : originalPrice;

  return {
    originalPrice,
    finalPrice,
    discount,
    hasDiscount: discount > 0,
  };
};

export const MenuItemCard = ({ item, viewMode }: MenuItemCardProps) => {
  const router = useRouter();
  const stockStatus = getStockStatus(item?.quantity);
  const priceInfo = calculatePrice(item);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const itemData: CartItem = {
    itemId: item?.id,
    title: item?.title,
    description: item?.description,
    count: 0,
    images: item?.images?.map((img) => img?.imageUrl),
    price: priceInfo?.originalPrice.toString(),
    discount: priceInfo?.discount.toString(),
    finalPrice: priceInfo?.finalPrice,
    category: {
      title: item?.category?.title || "",
    },
    quantity: item?.quantity,
  };

  const handleImageClick = () => {
    if (item?.images?.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % item?.images?.length);
    }
  };

  return (
    <div
      className={cn(
        "group bg-white  dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-transparent hover:border-amber-400 dark:hover:border-amber-600",
        viewMode === "list" ? "flex flex-col sm:flex-row" : ""
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden cursor-pointer",
          viewMode === "list"
            ? "w-full sm:w-1/2 aspect-[3/2] sm:aspect-[3/1]"
            : "w-full aspect-[4/3] sm:aspect-[6/5]"
        )}
        onClick={handleImageClick}
      >
        <Image
          src={item?.images[currentImageIndex]?.imageUrl || ""}
          alt={item?.title || "menu item"}
          className="group-hover:scale-105 transition-all duration-300 object-cover"
          fill
          priority={currentImageIndex === 0}
          sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
        />

        {item?.images?.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {currentImageIndex + 1} / {item?.images?.length}
          </div>
        )}

        {priceInfo?.hasDiscount && (
          <div className="absolute bottom-4 left-4 bg-gradient-to-tr from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
            {Math.round(priceInfo?.discount)}%
          </div>
        )}
        <FavoriteToggleButton
          itemId={item?.id}
          isFavorite={item?.isFav}
          iconSize={34}
          className={cn(
            "absolute top-3 left-3 z-10 p-1.5 rounded-full cursor-pointer shadow-md transition-all duration-300 hover:scale-110",
            item?.isFav
              ? "text-amber-500 border-amber-500 fill-current"
              : "text-white border-white"
          )}
        />
      </div>

      <div
        className={cn(
          "p-4 flex flex-col gap-3",
          viewMode === "list" ? "w-full sm:w-1/2" : ""
        )}
      >
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
              {item?.title}
            </h3>
            <span className="text-xs text-amber-600 dark:text-amber-400 mt-1 block">
              {item?.category?.title}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full shrink-0">
            <Star className="text-yellow-400 fill-current w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
              {item?.rate}
            </span>
          </div>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 text-justify cursor-help">
                {item?.description?.length > 42
                  ? `${item?.description.slice(0, 42)}...`
                  : item?.description}
              </p>
            </TooltipTrigger>
            {item?.description?.length > 42 && (
              <TooltipContent side="top" className="max-w-xs">
                <p className="text-sm">{item?.description}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-wrap items-center gap-1 mt-1 min-h-10">
          {item?.ingredients
            ?.slice(0, 2)
            .map((ingredient: string, index: number) => (
              <span
                key={index}
                className="text-xs bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
          {item?.ingredients && item?.ingredients?.length > 2 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full cursor-help">
                    +{item?.ingredients.length - 2} بیشتر
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {item?.ingredients?.map((ingredient, index) => (
                        <span key={index} className="text-xs rounded-full">
                          {ingredient + "،"}
                        </span>
                      ))}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="mt-2">
          <div className="relative flex items-center">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500 dark:text-gray-400">
                  تعداد موجود
                </span>
                <span
                  className={cn(
                    "font-bold",
                    stockStatus?.isOutOfStock
                      ? "text-red-500"
                      : stockStatus?.isLowStock
                      ? "text-amber-500"
                      : stockStatus?.isMediumStock
                      ? "text-yellow-500"
                      : "text-green-500"
                  )}
                >
                  {item?.quantity} عدد
                </span>
              </div>

              <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "absolute top-0 left-0 h-2 rounded-full",
                    stockStatus.progressColor
                  )}
                  style={{ width: stockStatus?.progressWidth }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <span className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">
            {formatCurrency(priceInfo?.finalPrice)} تومان
          </span>
          {priceInfo.hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(priceInfo?.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex flex-col justify-center items-center w-full gap-2">
          <Button
            variant="outline"
            className="text-sm px-3 py-2 cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full sm:w-auto"
            onClick={() => router.push(`/menu/${item?.id}/${item?.slug}`)}
          >
            <Eye size={18} className="ml-2" />
            مشاهده جزئیات
          </Button>

          <AddToCartButtonStyled
            itemId={item?.id}
            itemData={itemData}
            disabled={item?.quantity === 0}
          />
        </div>
      </div>
    </div>
  );
};
