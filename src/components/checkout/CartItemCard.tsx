"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import CheckoutItemControls from "@/lib/CheckoutItemControls";
import { CartItemCardProps } from "@/types/main";
import { MotionDiv } from "@/utils/MotionWrapper";

export default function CartItemCard({ item }: CartItemCardProps) {
  return (
    <MotionDiv
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, rotate: -5 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative bg-white h-fit dark:bg-gray-700 rounded-2xl"
    >
      <div className="overflow-hidden border border-amber-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group rounded-2xl dark:bg-gray-800 hover:border-amber-200 dark:hover:border-amber-600">
        <div className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/3 md:max-h-48 relative">
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-amber-50/30 to-orange-50/30 dark:from-gray-800 dark:to-gray-900" />
              <Image
                src={
                  item?.image ||
                  item?.images?.[0] ||
                  "https://i.pinimg.com/1200x/81/84/78/8184780b5b14d9357ef9fa7adacfb6e8.jpg"
                }
                alt={item?.title}
                fill
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
              />
              {item?.discount > 0 && (
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md">
                  {Math.round(item?.discount)}% تخفیف
                </Badge>
              )}
            </div>

            <div className="sm:w-2/3 p-5 flex justify-center gap-6 flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {item?.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {item?.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-xl font-bold text-amber-700 dark:text-amber-300">
                    {(item?.price * (1 - item?.discount / 100)).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    تومان
                  </span>
                  {item?.discount > 0 && (
                    <span className="text-gray-500 dark:text-gray-400 line-through">
                      {Number(item.price).toLocaleString("fa-IR", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  )}
                </div>
                <CheckoutItemControls
                  itemId={item?.itemId}
                  disabled={item?.quantity === 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
