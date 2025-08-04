"use client";

import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyCartProps } from "@/types/main/checkout/checkout";
import { MotionDiv, MotionSpan } from "@/utils/MotionWrapper";

export default function EmptyCart({ onBackToMenu }: EmptyCartProps) {
  return (
    <MotionDiv
      className="flex flex-col items-center justify-center py-20 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative w-56 h-56 mb-6">
        <MotionDiv
          className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 dark:from-amber-600/10 dark:to-orange-600/10 rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <ShoppingCart
          className="w-full h-full text-gray-300 dark:text-gray-700"
          strokeWidth={1.2}
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        سبد خرید شما خالی است
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        هنوز هیچ محصولی به سبد خرید خود اضافه نکرده‌اید. از منوی ما دیدن کنید و
        محصولات دلخواه خود را انتخاب نمایید.
      </p>
      <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onBackToMenu}
          className="px-8 py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg shadow-lg group"
        >
          <MotionSpan
            animate={{ x: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mr-2"
          >
            <ArrowLeft size={20} />
          </MotionSpan>
          مشاهده منو
        </Button>
      </MotionDiv>
    </MotionDiv>
  );
}
