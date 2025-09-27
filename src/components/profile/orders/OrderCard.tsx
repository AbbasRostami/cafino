"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  formatCurrency,
  formatJalaliDate,
  getStatusBadge,
} from "@/utils/formatters";
import { OrderCardProps, OrderProfile } from "@/types/Profile";

export const OrderCard = ({
  orders,
  onViewDetails,
  cancellingOrderId,
  CancelOrder,
}: OrderCardProps) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {orders?.map((order: OrderProfile) => (
        <Card
          key={order?.id}
          className="group relative overflow-hidden border border-amber-200/50 dark:border-amber-800/30 bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-rose-50/30 dark:from-amber-950/20 dark:via-orange-950/15 dark:to-rose-950/20 hover:border-amber-400/70 hover:dark:border-amber-600/50 hover:shadow-xl hover:shadow-amber-500/10"
        >
          <CardHeader className="relative z-10 pb-4">
            <CardTitle className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex  items-center gap-3 group/date">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 shadow-lg shadow-amber-500/25 group-hover/date:shadow-amber-500/40 group-hover/date:scale-110 transition-all duration-300">
                  <Calendar size={20} className="text-white drop-shadow-sm" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-gray-400 dark:text-gray-200">
                    تاریخ سفارش
                  </span>
                  <span className="text-xs sm:text-base font-semibold group-hover:text-amber-600 group-hover:dark:text-amber-600 text-gray-700 dark:text-gray-200 group-hover/date:text-gray-900 transition-colors">
                    {formatJalaliDate(order?.payments[0]?.created_at)}
                  </span>
                </div>
              </div>
              <p className="text-sm font gap-2">
                {getStatusBadge(order?.status)}
              </p>
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group flex flex-col gap-1 p-4 rounded-lg border border-amber-200/40 dark:border-amber-800/30 bg-gradient-to-br from-white/80 to-amber-50/30 dark:from-gray-900/80 dark:to-amber-950/20 hover:shadow-lg hover:shadow-amber-500/10 dark:hover:shadow-amber-400/5 hover:border-amber-300/60 dark:hover:border-amber-700/40 transition-all duration-300">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  مبلغ پرداختی
                </span>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-wide">
                  {formatCurrency(order?.payment_amount)}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mr-1">
                    تومان
                  </span>
                </span>
              </div>

              <div className="group flex flex-col gap-1 p-4 rounded-lg border border-orange-200/40 dark:border-orange-800/30 bg-gradient-to-br from-white/80 to-orange-50/30 dark:from-gray-900/80 dark:to-orange-950/20 hover:shadow-lg hover:shadow-orange-500/10 dark:hover:shadow-orange-400/5 hover:border-orange-300/60 dark:hover:border-orange-700/40 transition-all duration-300">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  تعداد آیتم‌ها
                </span>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  {order?.items?.length} عدد
                </span>
              </div>

              <div className="group flex flex-col gap-1 p-4 rounded-lg border border-rose-200/40 dark:border-rose-800/30 bg-gradient-to-br from-white/80 to-rose-50/30 dark:from-gray-900/80 dark:to-rose-950/20 hover:shadow-lg hover:shadow-rose-500/10 dark:hover:shadow-rose-400/5 hover:border-rose-300/60 dark:hover:border-rose-700/40 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  مکان تحویل
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {order?.address === null
                    ? "مکان تحویل نامشخص"
                    : `${order?.address?.province}، ${order?.address?.city}`}
                </span>
              </div>

              <div className="group flex flex-col gap-1 p-4 rounded-lg border border-emerald-200/40 dark:border-emerald-800/30 bg-gradient-to-br from-white/80 to-emerald-50/30 dark:from-gray-900/80 dark:to-emerald-950/20 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/5 hover:border-emerald-300/60 dark:hover:border-emerald-700/40 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  وضعیت پرداخت
                </span>
                <span
                  className={`text-sm font-semibold ${
                    order?.payments[0]?.status
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {order?.payments[0]?.status ? "پرداخت شده" : "پرداخت نشده"}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col lg:flex-row justify-end gap-3 p-4 bg-gradient-to-r from-amber-50/20 via-orange-50/10 to-rose-50/20 dark:from-amber-950/10 dark:via-orange-950/5 dark:to-rose-950/10">
            <Button
              variant="outline"
              className="w-full lg:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 hover:text-white border-0 shadow-lg hover:shadow-xl hover:shadow-amber-500/25 dark:hover:shadow-amber-400/20 transition-all duration-300 hover:scale-105 font-medium"
              size="sm"
              onClick={() => onViewDetails(order)}
            >
              مشاهده جزئیات
            </Button>
            <Button
              variant="destructive"
              className="w-full lg:w-auto bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 hover:text-white border-0 shadow-lg hover:shadow-xl hover:shadow-rose-500/25 dark:hover:shadow-rose-400/20 transition-all duration-300 hover:scale-105 font-medium"
              size="sm"
              disabled={
                cancellingOrderId === order?.id || order?.status === "canceled"
              }
              onClick={() => {
                CancelOrder(order?.id);
              }}
            >
              {cancellingOrderId === order?.id ? "در حال لغو..." : "لغو سفارش"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
