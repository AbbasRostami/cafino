"use client";

import { ShoppingCart } from "lucide-react";

export const CartSidebarEmpty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-600 flex items-center justify-center mb-4">
        <ShoppingCart className="w-10 h-10 text-gray-400 dark:text-neutral-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
        سبد خرید خالی است
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        محصولات مورد نظر خود را به سبد خرید اضافه کنید
      </p>
    </div>
  );
};
