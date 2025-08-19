"use client";

import { MotionButton, MotionDiv } from "@/utils/MotionWrapper";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export const CartSidebarEmpty: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <MotionDiv
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-amber-500 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-500 flex items-center justify-center shadow-lg mb-6"
      >
        <ShoppingCart className="w-12 h-12 text-white dark:text-gray-200" />
      </MotionDiv>

      <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
        سبد خرید خالی است
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
        هنوز محصولی اضافه نکردید. همین حالا یکی رو انتخاب کنید ✨
      </p>

      <MotionButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => router.push("/menu")}
        className="mt-6 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all"
      >
        رفتن به فروشگاه
      </MotionButton>
    </div>
  );
};
