"use client";

import { useEffect, useState } from "react";
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
import { MotionDiv } from "@/utils/MotionWrapper";
import { toast } from "sonner";
import Link from "next/link";
import { formatJalaliDate, formatCurrency } from "@/utils/formatters";

type PaymentStatus = "success" | "failed" | "pending";

interface PaymentResultProps {
  status: PaymentStatus;
}

export const PaymentResult = ({ status }: PaymentResultProps) => {
  const [orderInfo, setOrderInfo] = useState<any>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("pendingOrder");
    if (storedOrder) {
      try {
        setOrderInfo(JSON.parse(storedOrder));
      } catch (error) {}
    }
  }, []);

  useEffect(() => {
    if (!status || !["success", "failed", "pending"].includes(status)) {
      toast.error("وضعیت پرداخت نامعتبر است");
      setTimeout(() => {
        window.location.href = "/";
      }, 4000);
      return;
    }

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

  if (status === "success") {
    return <SuccessPayment orderInfo={orderInfo} />;
  }

  if (status === "failed") {
    return <FailedPayment />;
  }

  return <PendingPayment />;
};

const SuccessPayment = ({ orderInfo }: { orderInfo: any }) => (
  <MotionDiv
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="relative text-center space-y-8 max-w-2xl mx-auto p-4"
  >
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
    </div>

    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="w-28 h-28 mx-auto bg-gradient-to-r from-green-500/40 to-emerald-600/40 rounded-full blur-xl"></div>
      </div>
      <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 ring-2 ring-green-400/20 ring-offset-2 ring-offset-white/80 dark:ring-offset-gray-900/80 backdrop-blur-sm">
        <div className="relative">
          <CheckCircle className="w-14 h-14 text-white" />
          <div className="absolute inset-0 bg-white/10 rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
    </div>

    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="space-y-4"
    >
      <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent">
        پرداخت با موفقیت انجام شد!
      </h1>
      <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
        سفارش شما با موفقیت ثبت شد و در حال پردازش است. به زودی با شما تماس
        خواهیم گرفت.
      </p>
    </MotionDiv>

    {orderInfo && (
      <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="max-w-md py-3 gap-2 mx-auto bg-gradient-to-br from-green-50/70 to-emerald-50/70 dark:from-green-950/40 dark:to-emerald-950/40 border border-green-200/50 dark:border-green-800/50 backdrop-blur-md rounded-2xl shadow-lg shadow-green-500/10 overflow-hidden">
          <CardHeader className="pb-1">
            <CardTitle className="text-xl font-semibold text-green-800 dark:text-green-200 flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.5 2.5a1 1 0 101.414-1.414L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              جزئیات سفارش
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">مبلغ کل:</span>
              <span className="font-semibold text-green-700 dark:text-green-300">
                {formatCurrency(orderInfo?.cartTotal)} تومان
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                تاریخ سفارش:
              </span>
              <span className="font-semibold text-green-700 dark:text-green-300">
                {formatJalaliDate(orderInfo?.timestamp)}
              </span>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
    )}

    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
    >
      <Card className="max-w-md mx-auto bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 rounded-2xl shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-green-800 dark:text-green-200 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            راهنمای بعد از خرید
          </CardTitle>
        </CardHeader>
        <CardContent className="text-right space-y-2">
          <p className="text-sm text-green-700 dark:text-green-300">
            • سفارش شما در حال پردازش است و به زودی ارسال خواهد شد
          </p>
          <p className="text-sm text-green-700 dark:text-green-300">
            • می‌توانید وضعیت سفارش خود را در بخش «سفارشات من» پیگیری کنید
          </p>
          <p className="text-sm text-green-700 dark:text-green-300">
            • برای خریدهای بیشتر، از صفحه منو یا محصولات دیدن کنید
          </p>
        </CardContent>
      </Card>
    </MotionDiv>

    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
    >
      <Link href="/profile/orders">
        <Button className="relative overflow-hidden group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <ShoppingBag className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          مشاهده سفارشات
        </Button>
      </Link>
      <Link href="/">
        <Button
          variant="outline"
          className="group border-2 border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-950/20 px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-green-500/10 -z-10 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
          <ArrowRight className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          سفارش جدید
        </Button>
      </Link>
    </MotionDiv>
  </MotionDiv>
);

const FailedPayment = () => (
  <MotionDiv
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="relative text-center space-y-8 max-w-2xl mx-auto p-4"
  >
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
    </div>

    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="w-28 h-28 mx-auto bg-gradient-to-r from-red-500/40 to-pink-600/40 rounded-full blur-xl"></div>
      </div>
      <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/30 ring-2 ring-red-400/20 ring-offset-2 ring-offset-white/80 dark:ring-offset-gray-900/80 backdrop-blur-sm">
        <div className="relative">
          <XCircle className="w-14 h-14 text-white" />
          <div className="absolute inset-0 bg-white/10 rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
    </div>

    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="space-y-4"
    >
      <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-red-700 to-pink-600 dark:from-red-400 dark:to-pink-300 bg-clip-text text-transparent">
        پرداخت ناموفق بود
      </h1>
      <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
        متأسفانه پرداخت شما با مشکل مواجه شد. لطفاً دوباره تلاش کنید یا روش
        پرداخت دیگری انتخاب کنید.
      </p>
    </MotionDiv>

    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="max-w-md py-3 gap-2 mx-auto bg-gradient-to-br from-red-50/70 to-pink-50/70 dark:from-red-950/40 dark:to-pink-950/40 border border-red-200/50 dark:border-red-800/50 backdrop-blur-md rounded-2xl shadow-lg shadow-red-500/10 overflow-hidden">
        <CardHeader className="pb-1 relative z-10">
          <CardTitle className="text-xl font-semibold text-red-800 dark:text-red-200 flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            راهنمایی
          </CardTitle>
        </CardHeader>
        <CardContent className="text-right space-y-3 relative z-10">
          <p className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2 justify-end">
            <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
            بررسی کنید که کارت بانکی شما فعال باشد
          </p>
          <p className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2 justify-end">
            <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
            موجودی کافی در حساب خود داشته باشید
          </p>
          <p className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2 justify-end">
            <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
            در صورت تکرار مشکل، با پشتیبانی تماس بگیرید
          </p>
        </CardContent>
      </Card>
    </MotionDiv>

    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
    >
      <Link href="/menu">
        <Button className="relative overflow-hidden group bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          تلاش مجدد
        </Button>
      </Link>
      <Link href="/">
        <Button
          variant="outline"
          className="group border-2 border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/20 px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-red-500/10 -z-10 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
          <Home className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          بازگشت به خانه
        </Button>
      </Link>
    </MotionDiv>
  </MotionDiv>
);

const PendingPayment = () => (
  <MotionDiv
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="relative text-center space-y-8 max-w-2xl mx-auto p-4"
  >
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
    </div>
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="w-28 h-28 mx-auto bg-gradient-to-r from-amber-400/40 to-orange-500/40 rounded-full blur-xl"></div>
      </div>
      <div className="w-24 h-24 mx-auto bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/30 ring-2 ring-amber-400/20 ring-offset-2 ring-offset-white/80 dark:ring-offset-gray-900/80 backdrop-blur-sm">
        <div className="relative">
          <Clock className="w-14 h-14 text-white animate-spin-slow" />
          <div className="absolute inset-0 bg-white/10 rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
    </div>

    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="space-y-4"
    >
      <h1 className="text-md md:text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 dark:from-amber-400 dark:to-orange-300 bg-clip-text text-transparent">
        پرداخت در حال پردازش است ⏳
      </h1>
      <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
        لطفاً چند لحظه صبر کنید، وضعیت تراکنش شما در حال بررسی است.
      </p>
    </MotionDiv>

    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="flex justify-center pt-2"
    >
      <div className="w-16 h-16 border-4 border-amber-200 border-t-orange-600 rounded-full animate-spin"></div>
    </MotionDiv>
  </MotionDiv>
);
