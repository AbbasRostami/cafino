"use client";

import { Loader2 } from "lucide-react";

export const CartSidebarLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-4 border-amber-400/40 border-t-amber-400 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-amber-500 animate-pulse" />
        </div>
      </div>

      <h3 className="text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent animate-pulse">
        در حال به‌روزرسانی سبد خرید...
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        لطفاً چند لحظه صبر کنید
      </p>
    </div>
  );
};
