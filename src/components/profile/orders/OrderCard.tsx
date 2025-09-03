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
  isPending,
  CancelOrder,
}: OrderCardProps) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {orders?.map((order: OrderProfile) => (
        <Card
          key={order?.id}
          className="group hover:border border border-gray-200 dark:border-gray-700 hover:border-amber-600 hover:dark:border-amber-600 hover:shadow-lg"
        >
          <CardHeader className="relative z-10 pb-4">
            <CardTitle className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3 group/date">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/25 group-hover/date:shadow-rose-500/40 transition-all duration-300">
                  <Calendar size={18} className="text-white" />
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
              <div className="group flex flex-col gap-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  مبلغ پرداختی
                </span>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-wide">
                  {formatCurrency(order?.payment_amount)}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mr-1">
                    تومان
                  </span>
                </span>
              </div>

              <div className="group flex flex-col gap-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  تعداد آیتم‌ها
                </span>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  {order?.items?.length}
                </span>
              </div>

              <div className="group flex flex-col gap-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  مکان تحویل
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {order?.address === null
                    ? "مکان تحویل نامشخص"
                    : `${order?.address?.province}، ${order?.address?.city}`}
                </span>
              </div>

              <div className="group flex flex-col gap-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
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

          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="w-full lg:w-auto bg-amber-500 text-white hover:bg-amber-400 hover:text-white hover:transition-all hover:duration-300 shadow-md hover:scale-105"
              size="sm"
              onClick={() => onViewDetails(order)}
            >
              مشاهده جزئیات
            </Button>
            <Button
              variant="destructive"
              className="w-full lg:w-auto  hover:text-white hover:transition-all hover:duration-300 shadow-md hover:scale-105"
              size="sm"
              disabled={isPending || order?.status === "canceled"}
              onClick={() => {
                CancelOrder(order?.id);
              }}
            >
              {isPending ? "در حال لغو..." : "لغو سفارش"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
