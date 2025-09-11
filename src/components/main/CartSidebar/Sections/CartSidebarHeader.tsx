"use client";

import { Button } from "@/components/ui/button";
import { CartSidebarHeaderProps } from "@/types/main";
import { ShoppingCart, Trash2 } from "lucide-react";

export const CartSidebarHeader: React.FC<CartSidebarHeaderProps> = ({
  cartData,
  onClearCart,
  isClearLoading,
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
          <ShoppingCart className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-sm sm:text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          سبد خرید شما
        </h2>
      </div>
      {cartData?.cartItems && cartData?.cartItems?.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearCart}
          disabled={isClearLoading}
          className="flex items-center gap-2 cursor-pointer border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
          حذف همه
        </Button>
      )}
    </div>
  );
};
