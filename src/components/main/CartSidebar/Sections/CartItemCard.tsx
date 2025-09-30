"use client";

import Image from "next/image";
import { CartItemCardProps } from "@/types/main";
import CartItemControls from "@/components/main/CartSidebar/CartItemControlsSidebar";
import { formatCurrency } from "@/utils/formatters";

export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  return (
    <div className="group relative bg-white/60 dark:bg-neutral-900/70 rounded-xl overflow-hidden  border border-gray-100 dark:border-neutral-800 shadow-lg transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>

      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg overflow-hidden w-20 h-20 flex items-center justify-center backdrop-blur-sm">
              <Image
                width={80}
                height={80}
                src={item?.images?.[0] || "/placeholder.jpg"}
                alt={item?.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ring-2 ring-white dark:ring-neutral-900">
              {item?.count}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 line-clamp-2 tracking-tight">
                {item?.title}
              </h3>
              <div className="flex flex-col items-end">
                <span className="text-base font-semibold text-amber-700 dark:text-amber-400">
                  {formatCurrency(Number(item?.price))}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                  تومان
                </span>
              </div>
            </div>

            {Number(item?.discount) > 0 && (
              <div className="mb-2">
                <span className="inline-flex items-center text-xs font-bold px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">
                  <span className="ml-1">{Number(item?.discount)}%</span>
                  تخفیف
                </span>
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <CartItemControls itemId={item?.itemId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
