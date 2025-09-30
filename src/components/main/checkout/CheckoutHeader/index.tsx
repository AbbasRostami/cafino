"use client";

import { ArrowLeft, ShoppingCart, Trash2, Loader2 } from "lucide-react";
import { CheckoutHeaderProps } from "@/types/main";
import { MotionButton, MotionDiv, MotionH1 } from "@/utils/MotionWrapper";

export default function CheckoutHeader({
  cart,
  onBackClick,
  onClearCart,
  clearLoading,
}: CheckoutHeaderProps) {
  return (
    <MotionDiv
      className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-10 border-b-4 border-amber-400 dark:border-amber-700 pb-4 px-2 sm:px-4"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <MotionButton
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBackClick}
        className="flex items-center gap-2 cursor-pointer bg-amber-50 dark:bg-amber-900/30 text-gray-600 dark:text-amber-300
             border border-amber-400 dark:border-amber-600
             transition-all duration-300 ease-in-out rounded-xl px-4 py-2
             shadow-[0_4px_10px_rgba(255,193,7,0.2)] hover:shadow-[0_6px_15px_rgba(255,193,7,0.4)]"
      >
        <MotionDiv
          whileHover={{ x: -6, rotate: -10 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          <ArrowLeft size={20} />
        </MotionDiv>
        بازگشت به منو
      </MotionButton>

      <MotionH1
        data-testid="checkout-header-title"
        className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 dark:text-white"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-gray-800 dark:text-gray-100">
          سبد خرید شما
        </span>
      </MotionH1>

      <MotionDiv
        className="flex items-center gap-2"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        {cart?.cartItems?.length && cart?.cartItems?.length > 0 && (
          <MotionButton
            whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearCart}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
               bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300
               border border-red-300 dark:border-red-600 text-sm font-semibold
               shadow-md transition-all duration-300 hover:bg-red-600 hover:text-white "
          >
            {clearLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>در حال حذف...</span>
              </>
            ) : (
              <>
                <Trash2 size={16} />
                حذف همه
              </>
            )}
          </MotionButton>
        )}
        <MotionDiv
          whileHover={{ scale: 1.07 }}
          transition={{ type: "spring", stiffness: 250 }}
          className="backdrop-blur-md bg-gray-100 dark:bg-gray-800 flex items-center gap-2
             text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl shadow-lg
             border border-gray-300 dark:border-gray-600 font-medium text-sm tracking-tight"
        >
          <ShoppingCart size={20} />
          {cart?.cartItems?.reduce(
            (sum: number, i: { count: number }) => sum + i?.count,
            0
          )}
          <span className="text-gray-500 dark:text-gray-200">آیتم</span>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
}
