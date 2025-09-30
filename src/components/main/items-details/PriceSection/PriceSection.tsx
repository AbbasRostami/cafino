"use client";
import { AddToCartButtonStyled } from "@/components/ui/AddToCartButtonStyled";
import { PriceSectionProps } from "@/types/main";
import { MotionDiv } from "@/utils/MotionWrapper";
import {
  BanknoteArrowDown,
  LaptopMinimalCheck,
  ShoppingCart,
} from "lucide-react";
import { CartItem } from "@/store/cartStore";
import { formatCurrency } from "@/utils/formatters";

export const PriceSection = ({
  item,
  finalPrice,
  originalPrice,
  discount,
}: PriceSectionProps) => {
  const itemData: CartItem = {
    itemId: item?.id,
    title: item?.title,
    description: item?.description,
    count: 0,
    images: item?.images?.map((img) => img?.imageUrl),
    price: originalPrice?.toString(),
    discount: discount?.toString(),
    finalPrice: finalPrice,
    category: {
      title: item?.category?.title || "",
    },
    quantity: item?.quantity,
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-5 shadow-md border border-amber-100 dark:border-amber-800/30"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-amber-700 dark:text-amber-300">
                  {formatCurrency(finalPrice)} تومان
                </span>
                {discount > 0 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    {formatCurrency(originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 mt-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item?.quantity > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item?.quantity > 0
                    ? `${item?.quantity} عدد موجود`
                    : "ناموجود"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <MotionDiv
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-shrink-0"
        >
          <AddToCartButtonStyled
            itemId={item?.id}
            itemData={itemData}
            disabled={item?.quantity === 0}
            className=""
          />
        </MotionDiv>
      </div>

      {item?.quantity > 0 && (
        <div className="mt-3">
          <div className="h-1.5 bg-amber-100 dark:bg-amber-900/20 rounded-full overflow-hidden">
            <MotionDiv
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, (item?.quantity / 10) * 100)}%`,
              }}
              transition={{ duration: 1 }}
              className={`h-full ${
                item?.quantity > 5 ? "bg-green-500" : "bg-amber-500"
              }`}
            />
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-amber-200 dark:border-amber-800/30 flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <BanknoteArrowDown />
          <span>گارانتی اصالت کالا</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <ShoppingCart />
          <span>پرداخت امن</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <LaptopMinimalCheck />
          <span>تحویل سریع</span>
        </div>
      </div>
    </MotionDiv>
  );
};
