"use client";

import { Truck, CreditCard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { OrderSummaryProps } from "@/types/main/checkout/checkout";
import { MotionDiv, MotionSpan } from "@/utils/MotionWrapper";

export default function OrderSummary({
  cart,
  isMobile = false,
}: OrderSummaryProps) {
  if (isMobile) {
    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl z-50">
        <Sheet>
          <SheetTrigger asChild>
            <MotionDiv
              className="p-4 flex justify-between items-center cursor-pointer"
              whileTap={{ scale: 0.98 }}
            >
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  مبلغ قابل پرداخت
                </p>
                <p className="text-xl font-bold text-amber-700 dark:text-amber-300">
                  {cart?.paymentAmount?.toLocaleString("fa-IR")} تومان
                </p>
              </div>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md">
                تکمیل سفارش
              </Button>
            </MotionDiv>
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="rounded-t-2xl max-h-[80vh] bg-gradient-to-b from-white to-amber-50/30 dark:from-gray-900 dark:to-gray-950/50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Truck
                    size={20}
                    className="text-amber-600 dark:text-amber-400"
                  />
                  جزئیات پرداخت
                </h3>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="بستن"
                    className="text-gray-500 dark:text-gray-400"
                  >
                    <X size={18} />
                  </Button>
                </SheetClose>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    مجموع کالاها
                  </span>
                  <span className="font-medium">
                    {cart?.totalAmount?.toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    مجموع تخفیف
                  </span>
                  <span className="font-medium">
                    {cart?.totalDiscount?.toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <Separator className="my-2 bg-amber-200 dark:bg-amber-800" />

                <div className="flex justify-between text-lg font-bold">
                  <span>مبلغ قابل پرداخت</span>
                  <span className="text-amber-700 dark:text-amber-300">
                    {cart?.paymentAmount?.toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <MotionDiv
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6"
                >
                  <Button
                    className="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg shadow-lg group"
                    aria-label="ادامه فرآیند خرید"
                  >
                    <MotionSpan
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="ml-2"
                    >
                      <CreditCard size={20} />
                    </MotionSpan>
                    ادامه فرآیند خرید
                  </Button>
                </MotionDiv>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="hidden lg:block">
      <div
        className="sticky top-24 max-w-sm rounded-2xl shadow-xl border border-amber-200 dark:border-gray-800 
         bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg p-6 space-y-4 z-10"
      >
        <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Truck size={22} className="text-amber-600 dark:text-amber-400" />
          جزئیات پرداخت
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400 font-bold text-medium">
            مجموع آیتم ها
          </span>
          <span className="font-bold text-medium">
            {cart?.totalAmount?.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        {cart?.generalDiscount && cart?.generalDiscount?.discountAmount > 0 ? (
          <>
            <div className="flex justify-between font-bold text-emerald-600 dark:text-emerald-400">
              <span>کد تخفیف: {cart.generalDiscount.code}</span>
              <span>
                {Number(cart.generalDiscount.discountAmount).toLocaleString(
                  "fa-IR"
                )}{" "}
                تومان
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400 font-bold text-medium">
                مجموع تخفیف آیتم ها
              </span>
              <span className="font-bold">
                {Math.round(cart?.totalDiscount)?.toLocaleString("fa-IR")} تومان
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-left mt-1">
              {cart.generalDiscount.percent
                ? `${Number(cart.generalDiscount.percent).toLocaleString(
                    "fa-IR"
                  )}% تخفیف روی کل سبد خرید`
                : `${Number(cart.generalDiscount.amount).toLocaleString(
                    "fa-IR"
                  )} تومان تخفیف ثابت`}
            </div>
          </>
        ) : (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400 font-bold text-medium">
              مجموع تخفیف
            </span>
            <span className="font-bold">
              {Math.round(cart?.totalDiscount)?.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        )}

        <Separator className="my-2 bg-amber-200 dark:bg-amber-800" />

        <div className="flex flex-col xl:flex-row justify-center md:justify-between items-center gap-3 mt-5 text-lg font-bold">
          <span>مبلغ قابل پرداخت</span>
          <span className="text-amber-700 dark:text-amber-300 ">
            {cart?.paymentAmount?.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        <MotionDiv
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full pt-2"
        >
          <Button
            className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 
             hover:from-amber-600 hover:to-orange-600 text-lg shadow-lg group"
            aria-label="ادامه فرآیند خرید"
          >
            <MotionSpan
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="ml-2"
            >
              <CreditCard size={20} />
            </MotionSpan>
            ادامه فرآیند خرید
          </Button>
        </MotionDiv>
      </div>
    </div>
  );
}
