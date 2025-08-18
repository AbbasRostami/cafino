"use client";

export const CartSidebarLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
        در حال به‌روزرسانی سبد خرید...
      </h3>
    </div>
  );
};
