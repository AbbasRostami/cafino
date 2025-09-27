"use client";

import { Truck, CreditCard, MapPin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderSummaryProps } from "@/types/main";
import { MotionDiv, MotionSpan } from "@/utils/MotionWrapper";
import { formatCurrency } from "@/utils/formatters";

interface OrderSummaryPropsExtended extends OrderSummaryProps {
  onCompleteOrder?: () => void;
  isCheckoutLoading?: boolean;
  hasUnavailableItems?: boolean;
  hasAvailableItems?: boolean;
}

export default function OrderSummary({
  cart,
  selectedAddress,
  isAddressSelected = false,
  onCompleteOrder,
  isCheckoutLoading = false,
  hasUnavailableItems = false,
  hasAvailableItems = true,
}: OrderSummaryPropsExtended) {
  const renderAddressInfo = () => {
    if (!selectedAddress) {
      return (
        <div className="p-3 rounded-lg border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm text-amber-800 dark:text-amber-200">
              لطفاً ابتدا آدرس تحویل را انتخاب کنید
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-2">
          <MapPin
            size={16}
            className="text-amber-600 dark:text-amber-400 mt-0.5"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
              آدرس تحویل:
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
              {selectedAddress?.province}، {selectedAddress?.city}
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              {selectedAddress?.address}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderCompleteOrderButton = (className: string) => (
    <Button
      className={className}
      aria-label="ادامه فرآیند خرید"
      disabled={
        !isAddressSelected ||
        isCheckoutLoading ||
        hasUnavailableItems ||
        !hasAvailableItems
      }
      onClick={onCompleteOrder}
    >
      <MotionSpan
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="ml-2"
      >
        <CreditCard size={20} />
      </MotionSpan>
      {isCheckoutLoading
        ? "در حال پردازش..."
        : hasUnavailableItems
        ? "حذف محصولات غیرفعال"
        : !hasAvailableItems
        ? "سبد خرید خالی است"
        : isAddressSelected
        ? "تایید و تکمیل سفارش"
        : "انتخاب آدرس تحویل"}
    </Button>
  );

  return (
    <>
      <div
        className="sticky top-24 max-w-full h-fit rounded-2xl shadow-xl border border-amber-200 dark:border-gray-800 
         bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg p-6 space-y-4 z-10"
      >
        <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Truck size={22} className="text-amber-600 dark:text-amber-400" />
          جزئیات پرداخت
        </div>

        {renderAddressInfo()}

        {/* هشدار برای آیتم‌های غیرفعال */}
        {hasUnavailableItems && (
          <div className="p-3 rounded-lg border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-800 dark:text-red-200">
                نمی‌توانید با محصولات غیرفعال خرید کنید
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300 font-bold text-medium">
            مجموع آیتم ها
          </span>
          <span className="flex items-center gap-1">
            <span className="font-bold text-base">
              {formatCurrency(cart?.totalAmount ?? 0)}
            </span>
            <span className="font-bold text-xs">تومان</span>
          </span>
        </div>

        {cart?.generalDiscount && cart?.generalDiscount?.discountAmount > 0 ? (
          <>
            <div className="flex items-center justify-between  font-bold text-emerald-600 dark:text-emerald-400">
              <p className="text-sm">کد تخفیف: {cart?.generalDiscount?.code}</p>
              <p className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="text-base font-bold">
                  {formatCurrency(cart?.generalDiscount?.discountAmount ?? 0)}
                </span>
                <span className=" text-xs font-bold">تومان</span>
              </p>
            </div>
            <div className="flex  items-center justify-between  text-sm">
              <span className="text-gray-600 dark:text-gray-300 font-bold text-sm">
                مجموع تخفیف آیتم ها
              </span>
              <p className="flex items-center gap-1">
                <span className="text-base font-bold">
                  {formatCurrency(cart?.totalDiscount ?? 0)}
                </span>
                <span className="text-xs font-bold">تومان</span>
              </p>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-300 text-left mt-1">
              {cart?.generalDiscount?.percent
                ? `${Number(
                    cart?.generalDiscount?.percent
                  )}% تخفیف روی کل سبد خرید`
                : `${formatCurrency(
                    cart?.generalDiscount?.amount
                  )} تومان تخفیف ثابت`}
            </div>
          </>
        ) : (
          <div className="flex  items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300 font-bold text-sm">
              مجموع تخفیف
            </span>
            <span className="font-bold text-sm">
              {formatCurrency(cart?.paymentAmount ?? 0)} تومان
            </span>
          </div>
        )}

        <Separator className="my-2 bg-amber-200 dark:bg-amber-800" />

        <div className="flex flex-col xl:flex-row justify-center md:justify-between items-center gap-3 mt-5">
          <span className=" text-medium font-bold">مبلغ قابل پرداخت</span>
          <span className="text-amber-700 dark:text-amber-300  text-xl font-bold">
            {formatCurrency(cart?.paymentAmount ?? 0)} تومان
          </span>
        </div>

        <MotionDiv
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full pt-2"
        >
          {renderCompleteOrderButton(
            "w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg shadow-lg group disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        </MotionDiv>
      </div>
    </>
  );
}
