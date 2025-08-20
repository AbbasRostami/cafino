"use client";

import { ShoppingCart, ArrowLeft, Coffee, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyCartProps } from "@/types/main";
import { MotionDiv, MotionSpan } from "@/utils/MotionWrapper";
import Link from "next/link";

export default function EmptyCart({ onBackToMenu }: EmptyCartProps) {
  return (
    <MotionDiv
      className="flex flex-col items-center justify-center py-20 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative w-full max-w-2xl mx-auto">
        <MotionDiv
          className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <MotionDiv
          className="absolute -top-5 -right-5 w-16 h-16 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />
        <MotionDiv
          className="absolute -bottom-8 left-1/4 w-12 h-12 bg-gradient-to-br from-amber-300/20 to-yellow-400/20 rounded-full blur-lg"
          animate={{
            scale: [1, 1.4, 1],
            y: [0, -10, 0],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
      </div>

      <div className="relative w-64 h-64 mb-8">
        <MotionDiv
          className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 dark:from-amber-600/10 dark:to-orange-600/10 rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <MotionDiv
          className="absolute inset-4 bg-gradient-to-r from-amber-300/5 to-orange-300/5 dark:from-amber-500/5 dark:to-orange-500/5 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
        />

        <MotionDiv
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            y: [0, -5, 0],
            rotate: [0, 1, -1, 0],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <ShoppingCart
            className="w-32 h-32 text-gray-300 dark:text-gray-700"
            strokeWidth={1.2}
          />
        </MotionDiv>

        <MotionDiv
          className="absolute top-4 right-8"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{ repeat: Infinity, duration: 3, delay: 1 }}
        >
          <Coffee className="w-8 h-8 text-amber-400/60 dark:text-amber-300/60" />
        </MotionDiv>

        <MotionDiv
          className="absolute bottom-6 left-12"
          animate={{
            y: [0, -6, 0],
            rotate: [0, -20, 20, 0],
          }}
          transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
        >
          <UtensilsCrossed className="w-6 h-6 text-orange-400/60 dark:text-orange-300/60" />
        </MotionDiv>
      </div>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          سبد خرید شما خالی است
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-lg leading-relaxed">
          هنوز هیچ محصولی به سبد خرید خود اضافه نکرده‌اید. از منوی ما دیدن کنید
          و محصولات دلخواه خود را انتخاب نمایید.
        </p>
      </MotionDiv>

      <MotionDiv
        className="mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/menu">
            <Button
              onClick={onBackToMenu}
              className="px-10 py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg shadow-2xl group relative overflow-hidden"
            >
              <MotionDiv
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              <MotionSpan
                animate={{ x: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mr-2 relative z-10"
              >
                <ArrowLeft size={20} />
              </MotionSpan>
              <span className="relative z-10 font-semibold">مشاهده منو</span>
            </Button>
          </Link>
        </MotionDiv>
      </MotionDiv>

      <MotionDiv
        className="mt-16 flex gap-8 opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <MotionDiv
          className="w-2 h-2 bg-amber-400 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0 }}
        />
        <MotionDiv
          className="w-2 h-2 bg-orange-400 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
        />
        <MotionDiv
          className="w-2 h-2 bg-amber-400 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
        />
      </MotionDiv>
    </MotionDiv>
  );
}
