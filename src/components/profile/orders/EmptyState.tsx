"use client";
import { Button } from "@/components/ui/button";
import { MotionDiv, MotionH2, MotionP } from "@/utils/MotionWrapper";
import { PlusCircle, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export const EmptyState = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 pt-8 flex flex-col items-center justify-center mb-20">
      <MotionDiv
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="relative mx-auto mb-10">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center shadow-lg">
            <ShoppingCart className="h-20 w-20 text-amber-500" />
          </div>

          <div className="absolute -top-2 -right-2">
            <div className="w-24 h-24 rounded-full bg-amber-200/30 blur-2xl"></div>
          </div>
        </div>

        <MotionH2
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          هنوز سفارشی ثبت نکرده‌اید!
        </MotionH2>

        <MotionP
          className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          به نظر می‌رسد هنوز سفارشی در تاریخچه شما وجود ندارد. اولین سفارش خود
          را ثبت کنید و از تجربه خریدی لذت‌بخش بهره‌مند شوید.
        </MotionP>

        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-600/40 px-8 py-6 rounded-xl font-bold text-lg group"
            onClick={() => router.push("/menu")}
          >
            <PlusCircle
              size={20}
              className="h-6 w-6 mr-2 group-hover:scale-110 transition-transform"
            />
            ثبت اولین سفارش
          </Button>
        </MotionDiv>

        <MotionDiv
          className="mt-8 pt-4  border-t border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            چرا باید سفارش ثبت کنید؟
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
              تجربه خرید آسان و سریع
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
              دسترسی به محصولات متنوع
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
              تخفیف‌های ویژه مشتریان
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
              پیگیری سفارشات
            </li>
          </ul>
        </MotionDiv>
      </MotionDiv>
    </div>
  );
};
