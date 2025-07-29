"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  CreditCard,
  Package,
  MapPin,
  Download,
  Truck,
  X,
  ChevronsLeft,
  ChevronsRight,
  Link,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency, formatDate, getStatusBadge } from "./Common";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetOrders } from "@/services/Orders";
import {
  PaginationContent,
  PaginationLink,
  PaginationPrevious,
  PaginationItem,
  Pagination,
  PaginationNext,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderSkeleton } from "@/components/skeleton/OrderSkeleton";
import moment from "moment-jalaali";

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedLimit, setSelectedLimit] = useState(4);

  const handleChange = (value: string) => {
    setSelectedLimit(Number(value));
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const limitParam = Number(searchParams.get("limit")) || selectedLimit;
  const pageParam = Number(searchParams.get("page")) || 1;
  const { data: orders, isLoading } = useGetOrders(limitParam, pageParam);
  console.log("data", orders);

  const totalParam = Number(orders?.total) || 0;
  const totalPages = Math.max(1, Math.ceil(totalParam / limitParam));
  const currentPage = pageParam;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <OrderSkeleton />;
  }
  if (orders?.data?.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-8 flex flex-col items-center justify-center mb-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full text-center"
        >
          {/* Illustration */}
          <div className="relative mx-auto mb-10">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center shadow-lg">
              <ShoppingCart className="h-20 w-20 text-amber-500" />
            </div>

            <div className="absolute -top-2 -right-2">
              <div className="w-24 h-24 rounded-full bg-amber-200/30 blur-2xl"></div>
            </div>
          </div>

          {/* Title */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            هنوز سفارشی ثبت نکرده‌اید!
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            به نظر می‌رسد هنوز سفارشی در تاریخچه شما وجود ندارد. اولین سفارش خود
            را ثبت کنید و از تجربه خریدی لذت‌بخش بهره‌مند شوید.
          </motion.p>

          {/* Action Button */}
          <motion.div
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
          </motion.div>

          {/* Additional Info */}
          <motion.div
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
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
          <Package size={32} className="text-amber-500" />
          تاریخچه سفارشات شما
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          در این بخش می‌توانید تمام سفارش‌های گذشته‌ی خود را مشاهده و مدیریت
          کنید. امکان مشاهده جزئیات و ثبت مجدد سفارش نیز فراهم است.
        </p>
      </motion.div>
      <div className="flex flex-col gap-4 p-4  bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md ">
        <div className="grid grid-cols-1 xl:grid-cols-2  gap-6 ">
          {orders?.data?.map((order: any) => (
            <Card
              key={order?.id}
              className=" group hover:border border border-gray-200 dark:border-gray-700 hover:border-amber-600 hover:dark:border-amber-600 hover:shadow-lg"
            >
              <CardHeader className="relative z-10 pb-4">
                <CardTitle className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3 group/date">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/25 group-hover/date:shadow-rose-500/40 transition-all duration-300">
                      <Calendar size={18} className="text-white" />
                    </div>
                    <div className="flex flex-col gap-1 g">
                      <span className="text-sm font-medium text-gray-400 dark:text-gray-200">
                        تاریخ سفارش
                      </span>
                      <span className="text-xs sm:text-base font-semibold group-hover:text-amber-600 group-hover:dark:text-amber-600 text-gray-700 dark:text-gray-200 group-hover/date:text-gray-900 transition-colors">
                        {moment(order.payments[0].created_at).format(
                          "jYYYY/jMM/jDD"
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font gap-2">
                    {getStatusBadge(order.status)}
                  </p>
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* مبلغ پرداختی */}
                  <div className="group flex flex-col gap-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      مبلغ پرداختی
                    </span>
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-wide">
                      {formatCurrency(order.payment_amount)}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mr-1">
                        تومان
                      </span>
                    </span>
                  </div>

                  {/* تعداد آیتم‌ها */}
                  <div className="group flex flex-col gap-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      تعداد آیتم‌ها
                    </span>
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      {order.items.length.toLocaleString("fa-IR")}
                    </span>
                  </div>

                  {/* مکان تحویل */}
                  <div className="group flex flex-col gap-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      مکان تحویل
                    </span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {order.address?.province}، {order.address?.city}
                    </span>
                  </div>

                  {/* وضعیت پرداخت */}
                  <div className="group flex flex-col gap-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      وضعیت پرداخت
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        order.payments[0].status
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {order.payments[0].status ? "پرداخت شده" : "پرداخت نشده"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full lg:w-auto bg-amber-500 text-white hover:bg-amber-400 hover:text-white hover:transition-all hover:duration-300 shadow-md hover:scale-105"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      مشاهده جزئیات
                    </Button>
                  </DialogTrigger>
                  {selectedOrder?.id === order.id && (
                    <DialogContent
                      showCloseButton={false}
                      className="
 /* Mobile: Bottom sheet style */
 fixed bottom-0 left-0 right-0 top-auto translate-x-0 translate-y-0
 w-full max-w-none rounded-t-3xl rounded-b-none
 max-h-[85vh] h-auto
 
 /* Desktop: Center modal style */
 sm:fixed sm:top-1/2 sm:left-1/2 sm:bottom-auto sm:right-auto 
 sm:-translate-x-1/2 sm:-translate-y-1/2
 sm:max-w-4xl sm:w-[90vw] sm:rounded-3xl
 sm:max-h-[90vh]
 
 /* Common styles */
 overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 
 dark:from-slate-900 dark:to-gray-800 border-0 shadow-2xl p-0
 
 
 /* Animation classes */
 data-[state=open]:animate-in data-[state=closed]:animate-out
 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom
 sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=open]:slide-in-from-bottom-0
 sm:data-[state=closed]:fade-out-0 sm:data-[state=open]:fade-in-0
 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95
 duration-200
"
                    >
                      {" "}
                      <DialogHeader className="relative z-10 px-2 sm:px-6 py-2 sm:py-4 overflow-hidden bg-gradient-to-br from-amber-200/50 to-gray-100 dark:from-amber-600/ dark:to-gray-800">
                        <DialogClose asChild>
                          <button
                            className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            aria-label="بستن"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </DialogClose>
                        <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <Package
                              size={25}
                              className="text-amber-500 dark:text-amber-500"
                            />
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                              جزئیات سفارش
                            </h2>
                          </div>
                        </DialogTitle>
                      </DialogHeader>
                      {/* Content */}
                      <div className="max-h-[60vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 p-2 sm:p-6">
                        <div className="grid grid-cols-1 gap-6">
                          {/* Products Section */}
                          <div className="max-h-[99vh] h-fit overflow-y-auto [&::-webkit-scrollbar]:hidden bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl p-5">
                            <div className="flex items-center gap-3 mb-5">
                              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-xl">
                                <Package className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                              </div>
                              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                محصولات سفارش
                              </h3>
                            </div>

                            <div className="space-y-4">
                              {selectedOrder.items.map((item: any) => (
                                <div
                                  key={item.id}
                                  className="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border-t-4 border-indigo-500 dark:border-indigo-400 transition-all duration-300 hover:shadow-xl"
                                >
                                  <div className="flex gap-4">
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h4 className="font-bold text-gray-800 dark:text-white text-lg">
                                            {item.item.title}
                                          </h4>
                                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                            تعداد: {item.count}
                                          </p>
                                        </div>
                                        <div className="text-left">
                                          {item.item.discount > 0 && (
                                            <div className="text-gray-400 dark:text-gray-500 line-through text-sm">
                                              {formatCurrency(item.item.price)}{" "}
                                              تومان
                                            </div>
                                          )}
                                          <div className="font-bold text-gray-800 dark:text-white mt-1 text-lg">
                                            {formatCurrency(
                                              item.item.price *
                                                (1 - item.item.discount / 100)
                                            )}{" "}
                                            تومان
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mt-3">
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                                          مواد تشکیل دهنده:
                                        </p>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <div className="flex flex-wrap gap-1 text-xs max-h-[50px] overflow-hidden">
                                              {item?.item?.ingredients
                                                ?.slice(0, 3)
                                                .map(
                                                  (ing: string, i: number) => (
                                                    <span
                                                      key={i}
                                                      className="bg-muted px-2 py-0.5 rounded-full text-xs text-muted-foreground truncate max-w-[100px]"
                                                    >
                                                      {ing}
                                                    </span>
                                                  )
                                                )}

                                              {item?.item?.ingredients?.length >
                                                3 && (
                                                <span className="bg-muted px-2 py-0.5 rounded-full text-xs text-muted-foreground">
                                                  +
                                                  {item.item.ingredients
                                                    .length - 3}
                                                </span>
                                              )}
                                            </div>
                                          </TooltipTrigger>

                                          <TooltipContent>
                                            <div className="max-w-[200px] text-xs">
                                              {item?.item?.ingredients?.join(
                                                "، "
                                              )}
                                            </div>
                                          </TooltipContent>
                                        </Tooltip>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Payment and Address Section */}
                          <div className="space-y-6">
                            {/* Payment Information */}
                            <div className="relative bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl p-5">
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-t-2xl" />

                              <div className="flex items-center gap-3 mb-5">
                                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-xl">
                                  <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                  اطلاعات پرداخت
                                </h3>
                              </div>

                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    مبلغ کل سفارش:
                                  </span>
                                  <span className="font-bold text-gray-800 dark:text-white">
                                    {formatCurrency(selectedOrder.total_amount)}{" "}
                                    تومان
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    تخفیف:
                                  </span>
                                  <span className="font-bold text-green-600 dark:text-green-400">
                                    -
                                    {formatCurrency(
                                      selectedOrder.discount_amount
                                    )}{" "}
                                    تومان
                                  </span>
                                </div>
                                <Separator className="bg-gray-200 dark:bg-gray-700" />
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">
                                      مبلغ پرداختی:
                                    </span>
                                    <span className="text-xl font-bold text-gray-800 dark:text-white">
                                      {formatCurrency(
                                        selectedOrder.payment_amount
                                      )}{" "}
                                      تومان
                                    </span>
                                  </div>
                                </div>
                                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">
                                      شماره فاکتور:
                                    </span>
                                    <span className="font-mono font-medium text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                      {selectedOrder.payments[0].invoice_number}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">
                                      شماره کارت:
                                    </span>
                                    <span className="font-mono font-medium text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                      {selectedOrder.payments[0].card_pan}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Delivery Address */}
                            <div className="relative bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl p-5">
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-2xl" />

                              <div className="flex items-center gap-3 mb-5">
                                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-xl">
                                  <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                  آدرس تحویل
                                </h3>
                              </div>

                              <div className=" flex justify-evenly flex-col sm:flex-row items-start sm:items-center  gap-4">
                                <div className="flex items-center gap-3">
                                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
                                    <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                  </div>
                                  <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                      استان
                                    </p>
                                    <p className="font-medium text-gray-800 dark:text-white">
                                      {selectedOrder.address.province}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
                                    <svg
                                      className="h-5 w-5 text-gray-600 dark:text-gray-400"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                      شهر
                                    </p>
                                    <p className="font-medium text-gray-800 dark:text-white">
                                      {selectedOrder.address.city}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
                                    <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                  </div>
                                  <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                      آدرس دقیق
                                    </p>
                                    <p className="font-medium text-gray-800 dark:text-white">
                                      {selectedOrder.address.address}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                          <Button
                            variant="outline"
                            className="group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white font-medium rounded-xl px-5 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex items-center gap-2">
                              <Download className="h-5 w-5" />
                              دانلود فاکتور
                            </div>
                          </Button>
                          <Button className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium rounded-xl px-5 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex items-center gap-2">
                              <Truck className="h-5 w-5" />
                              پیگیری سفارش
                            </div>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-0 sm:mt-10 gap-4 p-2 sm:p-0 pb-10">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            نمایش {limitParam.toLocaleString("fa-IR")} از{" "}
            {totalParam.toLocaleString("fa-IR")}
          </div>
          <div className="flex items-center gap-2">
            <Select
              onValueChange={handleChange}
              defaultValue={limitParam.toString()}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="تعداد آیتم‌ها">
                  {limitParam.toLocaleString("fa-IR")} نمایش
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="4">۴</SelectItem>
                  <SelectItem value="10">۸</SelectItem>
                  <SelectItem value="15">۱۲</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Pagination dir="ltr">
              <PaginationContent>
                {/* دکمه رفتن به اولین صفحه */}
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      className="!p-1"
                      onClick={() => goToPage(1)}
                    >
                      <ChevronsLeft />
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* دکمه قبلی */}
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      className="!p-1"
                      onClick={() => goToPage(currentPage - 1)}
                    />
                  </PaginationItem>
                )}

                {/* شماره صفحات */}
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        className={`${
                          page === currentPage
                            ? "bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-600"
                            : "bg-gradient-to-l from-gray-100 to-white dark:from-gray-700 dark:to-gray-800"
                        }`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {/* دکمه بعدی */}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      className="!p-1"
                      onClick={() => goToPage(currentPage + 1)}
                    />
                  </PaginationItem>
                )}

                {/* دکمه رفتن به آخرین صفحه */}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      className="!p-1"
                      onClick={() => goToPage(totalPages)}
                    >
                      <ChevronsRight />
                    </PaginationLink>
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
