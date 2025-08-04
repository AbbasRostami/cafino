"use client";

import { Gift, Zap, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DiscountSectionProps } from "@/types/main/checkout/checkout";
import { MotionDiv } from "@/utils/MotionWrapper";

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
    <div className="relative overflow-hidden rounded-2xl border border-amber-300 dark:border-amber-700 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-6 shadow-[0_10px_30px_rgba(245,158,11,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      {/* افکت نور پس‌زمینه */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-r from-amber-400/20 to-transparent blur-2xl"></div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <MotionDiv
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 p-2 shadow-lg"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <Gift size={24} className="text-white" />
          </MotionDiv>

          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent dark:from-amber-400 dark:to-orange-400">
              افزودن کد تخفیف
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              کد تخفیف خود را وارد کنید و از تخفیف ویژه بهره‌مند شوید
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-5">
            <div className="flex-1">
              <Input
                {...register("code")}
                disabled={
                  !!cart?.generalDiscount &&
                  cart?.generalDiscount?.discountAmount > 0
                }
                placeholder={
                  cart?.generalDiscount &&
                  cart?.generalDiscount?.discountAmount > 0
                    ? "کد خرید خود را وارد کرده اید"
                    : "کد تخفیف خود را وارد کنید"
                }
                className="w-full rounded-xl border-2 border-amber-300 bg-white/80 py-4 px-4 text-amber-800 shadow-sm transition-all duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-300/50 focus:ring-opacity-50 dark:border-amber-600 dark:bg-gray-800/80 dark:text-amber-200 dark:focus:border-amber-500 dark:focus:ring-amber-500/30"
              />
              {errors.code && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                  {errors.code.message}
                </p>
              )}
            </div>

            <MotionDiv
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-full"
            >
              {!!cart?.generalDiscount &&
              cart?.generalDiscount?.discountAmount > 0 ? (
                <Button
                  type="button"
                  onClick={onRemove}
                  disabled={removeDiscountLoading}
                  className="h-full rounded-xl py-2 px-4 bg-rose-500 font-bold text-white shadow-lg hover:bg-rose-600 transition-all duration-300"
                >
                  {removeDiscountLoading ? "در حال حذف..." : "حذف کد"}
                  <Trash2 className="mr-2" size={20} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={addDiscountLoading}
                  className="h-full rounded-xl py-2 px-4 bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-white shadow-lg shadow-amber-400/30 hover:from-amber-600 hover:to-orange-600 hover:shadow-amber-500/40 focus:ring-2 focus:ring-amber-300/50 focus:ring-offset-2 dark:shadow-amber-600/20"
                >
                  {addDiscountLoading ? "در حال اعمال..." : "اعمال کد"}
                  <Zap className="mr-2" size={20} />
                </Button>
              )}
            </MotionDiv>
          </div>
        </form>
      </div>

      {/* افکت نور پایین */}
      <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-amber-500/10 to-transparent blur-xl"></div>
    </div>
  );
}
