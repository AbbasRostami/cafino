"use client";

import { Gift, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MotionDiv, MotionSpan } from "@/utils/MotionWrapper";
import { DiscountSectionProps } from "@/types/main";

export default function DiscountSection({
  cart,
  onSubmit,
  onRemove,
  isDiscountApplied,
  addDiscountLoading,
  removeDiscountLoading,
  errors,
  register,
  handleSubmit,
}: DiscountSectionProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-amber-200 dark:border-gray-800 p-6 space-y-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <Gift className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          کد تخفیف
        </h3>
      </div>

      {isDiscountApplied ? (
        <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                کد تخفیف اعمال شده: {cart?.generalDiscount?.code}
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={onRemove}
              disabled={removeDiscountLoading}
              className="border-emerald-300 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            >
              {removeDiscountLoading ? (
                <MotionSpan
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <X size={16} />
                </MotionSpan>
              ) : (
                <X size={16} />
              )}
            </Button>
          </div>
          {cart?.generalDiscount?.discountAmount > 0 && (
            <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-2">
              {cart?.generalDiscount?.percent
                ? `${Number(
                    cart?.generalDiscount?.percent
                  )}% تخفیف روی کل سبد خرید`
                : `${Number(cart?.generalDiscount?.amount)} تومان تخفیف ثابت`}
            </p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              {...register("code")}
              placeholder="کد تخفیف خود را وارد کنید"
              className="flex-1 border-amber-300 dark:border-amber-600 focus:border-amber-500 dark:focus:border-amber-400"
            />
            <Button
              type="submit"
              disabled={addDiscountLoading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6"
            >
              {addDiscountLoading ? (
                <MotionSpan
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Gift size={16} />
                </MotionSpan>
              ) : (
                "اعمال"
              )}
            </Button>
          </div>
          {errors?.code && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors?.code?.message}
            </p>
          )}
        </form>
      )}
    </MotionDiv>
  );
}
