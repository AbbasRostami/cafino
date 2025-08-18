"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Home,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionDiv, MotionSpan } from "@/utils/MotionWrapper";
import { toast } from "sonner";

type PaymentStatus = "success" | "failed" | "pending";

interface PaymentResultProps {
  status: PaymentStatus;
}

const PaymentResult = ({ status }: PaymentResultProps) => {
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<any>(null);

  useEffect(() => {
    // دریافت اطلاعات سفارش از localStorage
    const storedOrder = localStorage.getItem("pendingOrder");
    if (storedOrder) {
      try {
        setOrderInfo(JSON.parse(storedOrder));
      } catch (error) {
        console.error("خطا در خواندن اطلاعات سفارش:", error);
      }
    }
  }, []);

  const handleGoToMenu = () => {
    router.push("/menu");
  };

  const handleGoToOrders = () => {
    router.push("/profile/orders");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (status === "success") {
    return (
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        {/* آیکون موفقیت */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
        </div>

        {/* عنوان و پیام */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            پرداخت با موفقیت انجام شد! 🎉
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            سفارش شما با موفقیت ثبت شد و در حال پردازش است. به زودی با شما تماس
            خواهیم گرفت.
          </p>
        </div>

        {/* اطلاعات سفارش */}
        {orderInfo && (
          <Card className="max-w-md mx-auto bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 dark:text-green-200">
                جزئیات سفارش
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  مبلغ کل:
                </span>
                <span className="font-semibold text-green-700 dark:text-green-300">
                  {orderInfo.cartTotal?.toLocaleString("fa-IR")} تومان
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  تاریخ سفارش:
                </span>
                <span className="font-semibold text-green-700 dark:text-green-300">
                  {new Date(orderInfo.timestamp).toLocaleDateString("fa-IR")}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* دکمه‌های عملیات */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            onClick={handleGoToOrders}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ShoppingBag className="ml-2 h-5 w-5" />
            مشاهده سفارشات
          </Button>
          <Button
            onClick={handleGoToMenu}
            variant="outline"
            className="border-2 border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-950/20 px-8 py-3 rounded-xl transition-all duration-300"
          >
            <ArrowRight className="ml-2 h-5 w-5" />
            سفارش جدید
          </Button>
        </div>
      </MotionDiv>
    );
  }

  if (status === "failed") {
    return (
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        {/* آیکون خطا */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
            <XCircle className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
        </div>

        {/* عنوان و پیام */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            پرداخت ناموفق بود! 😔
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            متأسفانه پرداخت شما با مشکل مواجه شد. لطفاً دوباره تلاش کنید یا روش
            پرداخت دیگری انتخاب کنید.
          </p>
        </div>

        {/* راهنمایی */}
        <Card className="max-w-md mx-auto bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-red-200 dark:border-red-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-red-800 dark:text-red-200">
              راهنمایی
            </CardTitle>
          </CardHeader>
          <CardContent className="text-right space-y-2">
            <p className="text-sm text-red-700 dark:text-red-300">
              • بررسی کنید که کارت بانکی شما فعال باشد
            </p>
            <p className="text-sm text-red-700 dark:text-red-300">
              • موجودی کافی در حساب خود داشته باشید
            </p>
            <p className="text-sm text-red-700 dark:text-red-300">
              • در صورت تکرار مشکل، با پشتیبانی تماس بگیرید
            </p>
          </CardContent>
        </Card>

        {/* دکمه‌های عملیات */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            onClick={handleGoToMenu}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowRight className="ml-2 h-5 w-5" />
            تلاش مجدد
          </Button>
          <Button
            onClick={handleGoHome}
            variant="outline"
            className="border-2 border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/20 px-8 py-3 rounded-xl transition-all duration-300"
          >
            <Home className="ml-2 h-5 w-5" />
            بازگشت به خانه
          </Button>
        </div>
      </MotionDiv>
    );
  }

  // حالت pending (در حال پردازش)
  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6"
    >
      {/* آیکون در حال پردازش */}
      <div className="relative">
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
          <Clock className="w-12 h-12 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <Clock className="w-5 h-5 text-amber-600" />
        </div>
      </div>

      {/* عنوان و پیام */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          در حال پردازش... ⏳
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          لطفاً صبر کنید، در حال بررسی وضعیت پرداخت شما هستیم.
        </p>
      </div>

      {/* Loading indicator */}
      <div className="flex justify-center">
        <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
      </div>
    </MotionDiv>
  );
};

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") as PaymentStatus;

  useEffect(() => {
    // اگر status معتبر نباشد، به صفحه اصلی هدایت کن
    if (!status || !["success", "failed", "pending"].includes(status)) {
      toast.error("وضعیت پرداخت نامعتبر است");
      // بعد از 2 ثانیه به صفحه اصلی هدایت کن
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      return;
    }

    // اگر پرداخت موفق بود، اطلاعات سفارش را از localStorage پاک کن
    if (status === "success") {
      localStorage.removeItem("pendingOrder");
    }
  }, [status]);

  if (!status || !["success", "failed", "pending"].includes(status)) {
    return (
      <div className="min-h-screen pt-36 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">در حال هدایت...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 py-8 px-4 relative">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[10%] right-[15%] w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[15%] left-[20%] w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/2 w-64 h-64 bg-amber-300/15 rounded-full blur-2xl animate-pulse-slow animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] dark:bg-[url('/grid-dark.svg')] opacity-[0.03] dark:opacity-[0.05]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/50 p-8 md:p-12">
          <PaymentResult status={status} />
        </div>
      </div>
    </div>
  );
}
