"use client";

import { CartSidebarTriggerProps } from "@/types/main/cartSidebar";
import { ShoppingCart } from "lucide-react";

export const CartSidebarTrigger: React.FC<CartSidebarTriggerProps> = ({
  cartData,
  onOpen,
}) => {
  return (
    <div className="relative mr-2">
      <button
        data-testid="cart-icon"
        onClick={onOpen}
        className="p-2 rounded-full border transition-all cursor-pointer duration-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-lg hover:scale-110 group"
      >
        <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
        {cartData?.cartItems && cartData?.cartItems?.length > 0 && (
          <span
            data-testid="cart-count"
            className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full px-2 py-1 min-w-[22px] flex items-center justify-center border-2 border-white dark:border-neutral-800 shadow-lg animate-pulse"
          >
            {cartData?.cartItems?.reduce(
              (sum: number, i: { count: number }) => sum + i?.count,
              0
            )}
          </span>
        )}
      </button>
    </div>
  );
};
