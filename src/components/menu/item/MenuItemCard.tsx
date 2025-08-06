"use client";
import { Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FavoriteToggleButton } from "@/lib/FavoriteToggleButton";
import { AddToCartButtonStyled } from "@/lib/AddToCartButtonStyled";
import { MenuItemCardProps, PriceInfo } from "@/types/main/menu/menu";
import { cn } from "@/lib/utils";
import { getStockStatus } from "@/utils/formatters";
import { CartItem } from "@/store/cartStore";

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
  const stockStatus = getStockStatus(item.quantity);
  const priceInfo = calculatePrice(item);

  // تبدیل item به CartItem برای مهمان‌ها
  const itemData: CartItem = {
    itemId: item.id,
    title: item.title,
    description: item.description,
    count: 0, // این مقدار در store تنظیم می‌شود
    images: item.images.map((img) => img.imageUrl), // تبدیل به آرایه string
    price: priceInfo.originalPrice.toString(),
    discount: priceInfo.discount.toString(),
    finalPrice: priceInfo.finalPrice,
    category: {
      title: item.category?.title || "",
    },
    quantity: item.quantity,
  };

  return (
    <div
      className={cn(
        "group bg-white h-fit dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-transparent hover:border-amber-400 dark:hover:border-amber-600",
        viewMode === "list" ? "flex flex-row" : ""
      )}
    >
      {/* تصویر محصول */}
      <div
        className={cn(
          "relative overflow-hidden",
          viewMode === "list"
            ? "w-full aspect-[3/1] min-w-1/2"
            : "w-full max-h-64 aspect-[1/1]"
        )}
      >
        {" "}
        <Image
          src={item?.images[0]?.imageUrl || ""}
          alt={item?.title}
          className="group-hover:scale-105 transition-all duration-300 object-cover"
          fill
          priority
        />
        {priceInfo.hasDiscount && (
          <div className="absolute bottom-4 left-4 bg-gradient-to-tr from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
            {Math.round(priceInfo.discount)}% تخفیف
          </div>
        )}
        <FavoriteToggleButton
          itemId={item?.id}
          isFavorite={item?.isFav}
          iconSize={34}
          className={cn(
            "absolute top-4 left-4 z-10 p-2 rounded-full cursor-pointer shadow-md transition-all duration-300 hover:scale-110",
            item?.isFav
              ? "text-amber-500 border-amber-500 fill-current"
              : "text-white border-white"
          )}
        />
      </div>

      {/* جزئیات محصول */}
      <div
        className={cn(
          "p-4 flex flex-col gap-3",
          viewMode === "list" ? "w-full sm:w-1/2" : ""
        )}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
              {item?.title}
            </h3>
            <span className="text-xs text-amber-600 dark:text-amber-400 mt-1 block">
              {item?.category?.title}
            </span>
          </div>

          {/* امتیاز */}
          <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
            <Star className="text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
              {item?.rate.toFixed(1)}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 text-justify text-justify-center truncate">
          {item?.description}
        </p>

        {/* مواد تشکیل دهنده */}
        <div className="flex flex-wrap gap-1 mt-1">
          {item?.ingredients
            .slice(0, 2)
            .map((ingredient: any, index: number) => (
              <span
                key={index}
                className="text-xs bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
        </div>

        {/* موجودی */}
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
                    stockStatus.isOutOfStock
                      ? "text-red-500"
                      : stockStatus.isLowStock
                      ? "text-amber-500"
                      : stockStatus.isMediumStock
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
                  style={{ width: stockStatus.progressWidth }}
                />
              </div>
            </div>
          </div>
          <div
            className={cn(
              "hidden md:block mt-2 text-sm px-4 py-2 rounded-2xl text-center",
              stockStatus.stockColor
            )}
          >
            {stockStatus.stockMessage}
          </div>
        </div>

        {/* قیمت و دکمه افزودن */}
        <div className="flex justify-center items-center gap-2">
          <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
            {Math.round(priceInfo.finalPrice).toLocaleString("fa-IR")} تومان
          </span>
          {priceInfo.hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {Math.round(priceInfo.originalPrice).toLocaleString("fa-IR")}
            </span>
          )}
        </div>

        <div className="flex flex-col justify-center items-center w-full gap-2">
          {/* دکمه جزئیات */}
          <Button
            variant="outline"
            className="text-sm px-4 py-2 cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full xl:w-1/2"
            onClick={() => router.push(`/menu/${item?.id}`)}
          >
            <Eye size={20} />
            مشاهده جزئیات
          </Button>

          {/* دکمه افزودن */}
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
