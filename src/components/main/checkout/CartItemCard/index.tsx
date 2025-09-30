"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import CheckoutItemControls from "@/components/main/checkout/CheckoutItemControls";
import { CartItemCardProps } from "@/types/main";
import { MotionDiv } from "@/utils/MotionWrapper";
import { formatCurrency } from "@/utils/formatters";
import { Loader2, Trash2, Package } from "lucide-react";
import { useAddToCartButtonLogic } from "@/hooks/business/AddToCartButton";
import { Button } from "@/components/ui/button";

export default function CartItemCard({ item }: CartItemCardProps) {
  const isUnavailable = item?.isAvailable === false;
  const { removeLoading, handleRemove } = useAddToCartButtonLogic({
    itemId: item?.itemId,
  });

  return (
    <MotionDiv
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-500 ${
        isUnavailable ? "opacity-75" : ""
      } border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-600 hover:shadow-xl`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/5 to-orange-50/5 dark:from-amber-900/5 dark:to-orange-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative sm:w-2/5 lg:w-1/3 h-32 sm:h-52 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
          <Image
            src={item?.image || item?.images?.[0] || "/placeholder.jpg"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={item?.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Discount Badge */}
          {item?.discount > 0 && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg rounded-full px-3 py-1.5 flex items-center gap-1 border-2 border-white dark:border-gray-800">
                <span className="text-sm font-bold">
                  {item?.discount}% تخفیف
                </span>
              </Badge>
            </div>
          )}

          {/* Unavailable Overlay */}
          {isUnavailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge
                variant="destructive"
                className="bg-red-600/90 text-white rounded-lg px-4 py-2 text-lg font-bold shadow-lg"
              >
                ناموجود
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                  {item?.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <Package className="w-4 h-4 text-amber-500" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    موجودی: {item?.quantity}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
              {item?.description}
            </p>
          </div>

          {/* Price and Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <p className="flex items-center gap-1">
                  <span className="text-amber-600 dark:text-amber-300 text-2xl font-bold">
                    {formatCurrency(item?.price * (1 - item?.discount / 100))}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-base font-medium">
                    تومان
                  </span>
                </p>
                {item?.discount > 0 && (
                  <span className="text-gray-500 dark:text-gray-400 line-through text-base font-medium">
                    {formatCurrency(item?.price)}
                  </span>
                )}
              </div>
            </div>

            {isUnavailable ? (
              <Button
                onClick={handleRemove}
                disabled={removeLoading}
                className="w-full sm:w-fit bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
              >
                {removeLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span className="font-medium">در حال حذف</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    <span className="font-medium">حذف از سبد خرید</span>
                  </>
                )}
              </Button>
            ) : (
              <CheckoutItemControls
                itemId={item?.itemId}
                disabled={item?.quantity === 0}
                className="shadow-md hover:shadow-lg transition-all duration-300"
              />
            )}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
