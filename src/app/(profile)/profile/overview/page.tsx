"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Heart,
  MapPin,
  Clock,
  Star,
  Coffee,
  User,
  CalendarDays,
  Phone,
  Mail,
  LifeBuoy,
  LayoutDashboard,
  Gift,
  CreditCard,
  Settings,
  LogOut,
  UserPlus,
  UserMinus,
} from "lucide-react";
import Link from "next/link";
import { useUserProfile } from "@/services/update";
import { useGetFavorites } from "@/services/Favorite";
import { useGetOrders } from "@/services/Orders";
import { useGetAddresses } from "@/services/address";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment-jalaali";
import { getStatusBadge } from "../orders/Common";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddToCartButtonStyled } from "@/lib/AddToCartButtonStyled";
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function OverviewPage() {
  const { data: user, isLoading: userLoading } = useUserProfile();
  const { data: ordersData, isLoading: ordersLoading } = useGetOrders(100, 1);
  const { data: favoritesData, isLoading: favoritesLoading } = useGetFavorites(
    100,
    1
  );
  const { data: addressesData, isLoading: addressesLoading } =
    useGetAddresses();
  console.log("ordersData", ordersData?.data);
  console.log("favoritesData", favoritesData?.data);
  console.log("addressesData", addressesData?.data);
  // محاسبه آمار کلیدی
  const activeOrders = ordersData?.data?.filter(
    (order: any) => order.status === "processing"
  ).length;
  const totalPayments = ordersData?.data?.reduce(
    (sum: number, order: any) => sum + order.payment_amount,
    0
  );
  const favoriteItems = favoritesData?.data?.length;
  const savedAddresses = addressesData?.data?.length;

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-rose-50/50 to-amber-50/50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* هدر صفحه */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-rose-600 to-amber-500 dark:from-rose-800 dark:to-amber-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/placeholder.svg?height=200&width=800"
            alt="Background Pattern"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
        </div>
        <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-6">
          {/* Welcome message and main title */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight drop-shadow-md">
              داشبورد کاربری کافینو
            </h1>
            <p className="mt-2 text-rose-100 dark:text-amber-200 text-sm sm:text-base lg:text-lg">
              سلام {user?.first_name || "کاربر"} عزیز، به دنیای طعم و کیفیت خوش
              آمدید
            </p>
          </div>

          {/* User profile and contact info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <div className="relative flex-shrink-0">
              <Avatar className="w-20 h-20 border-4 border-white/50 dark:border-gray-700/50 shadow-lg">
                <AvatarImage
                  src={user?.imageUrl || user?.first_name?.charAt(0)}
                  alt="Profile"
                />
                <AvatarFallback className="bg-white text-amber-600 text-3xl font-semibold">
                  {user?.first_name ? user.first_name[0] : "U"}
                </AvatarFallback>
              </Avatar>
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
            </div>
            <div className="text-center sm:text-right space-y-1">
              <p className="font-semibold text-lg sm:text-xl">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-sm sm:text-base text-white dark:text-amber-200">
                {user?.role === "admin" ? "مدیر سیستم" : "کاربر عادی"}
              </p>
              <div className="flex flex-col items-center sm:items-start gap-1 mt-2">
                <div className="flex items-center gap-2 text-white dark:text-amber-200 text-sm">
                  <Mail size={16} />
                  <span>{user?.email || "ایمیل مشخص نیست"}</span>
                </div>
                <div className="flex items-center gap-2 text-white dark:text-amber-200 text-sm">
                  <Phone size={16} />
                  <span>{user?.phone || "شماره تلفن مشخص نیست"}</span>
                </div>
                <div className="flex items-center gap-2 text-white dark:text-amber-200 text-sm">
                  <CalendarDays size={16} />
                  <span>
                    تاریخ تولد:{" "}
                    {user?.birthday
                      ? moment(user?.birthday).format("jYYYY/jMM/jDD")
                      : "تاریخ تولد مشخص نیست"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                سفارش‌های فعال
              </CardTitle>
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                <ShoppingBag size={20} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeOrders}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              در حال پردازش
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                مجموع پرداختی‌ها
              </CardTitle>
              <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <Star size={20} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalPayments?.toLocaleString("fa-IR") || 0} تومان
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              از تمام سفارش‌ها
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                علاقه‌مندی‌ها
              </CardTitle>
              <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400">
                <Heart size={20} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {favoriteItems || 0}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              محصول مورد علاقه
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                آدرس‌ها
              </CardTitle>
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <MapPin size={20} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {savedAddresses || 0}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              آدرس ذخیره شده
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* آخرین سفارش‌ها */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-2xl border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-xl font-bold text-gray-800 dark:text-white">
              <Clock size={18} />
              آخرین سفارش‌ها
            </CardTitle>
            <Badge
              variant="outline"
              className="text-xs border-amber-300 text-amber-600 dark:text-amber-400"
            >
              {ordersData?.data?.length} سفارش
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4 min-h-[100px]">
            {ordersData?.data?.length > 0 ? (
              ordersData?.data?.slice(0, 3).map((order: any) => (
                <div
                  key={order.id}
                  className="min-h-[100px] flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-3 sm:mb-0 flex flex-col gap-2 w-full">
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <span className="text-md text-gray-800 dark:text-gray-400 font-semibold">
                        تاریخ سفارش:
                      </span>
                      <span className="text-sm text-gray-800 dark:text-gray-200">
                        {moment(order.payments[0].created_at).format(
                          "jYYYY/jMM/jDD"
                        )}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-1 w-full">
                      <span className="text-md text-gray-800 dark:text-gray-400 font-semibold">
                        محصولات سفارش:
                      </span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex flex-wrap gap-1 text-xs max-h-[50px] overflow-hidden">
                            {order?.items
                              ?.slice(0, 3)
                              .map((ing: any, i: number) => (
                                <span
                                  key={i}
                                  className=" py-0.5 rounded-full text-gray-800 dark:text-gray-200  text-xs  truncate max-w-[100px]"
                                >
                                  {ing.item.title}
                                </span>
                              ))}

                            {order?.items?.length > 3 && (
                              <span className=" px-2 py-0.5 rounded-full text-xs text-gray-500 dark:text-gray-400">
                                +{order?.items?.length - 3}
                              </span>
                            )}
                          </div>
                        </TooltipTrigger>

                        <TooltipContent>
                          <div className="max-w-[200px] text-xs">
                            {order?.items
                              ?.map((i: any) => i.item.title)
                              .join(", ")}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="text-left sm:text-right flex flex-col gap-2">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="font-medium text-gray-800 dark:text-white text-sm sm:text-base flex items-center gap-1">
                      {order.payment_amount.toLocaleString("fa-IR")}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        تومان
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                سفارشی یافت نشد
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg text-sm sm:text-base"
              asChild
            >
              <Link href="/profile/orders">مشاهده همه سفارش‌ها</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* محبوب‌ترین محصولات */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-2xl border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-xl font-bold text-gray-800 dark:text-white">
              <Star size={18} />
              محبوب‌ترین محصولات
            </CardTitle>
            <Badge
              variant="outline"
              className="text-xs border-rose-300 text-rose-600 dark:text-rose-400"
            >
              {favoritesData?.data?.length} مورد
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4 min-h-[100px]">
            {favoritesData?.data?.length > 0 ? (
              favoritesData?.data?.slice(0, 3).map((fav: any) => (
                <div
                  key={fav.item.id}
                  className=" min-h-[100px] flex flex-col sm:flex-row items-center gap-4 py-2 px-4 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="font-medium text-gray-800 dark:text-white text-md sm:text-base truncate max-w-[200px]">
                      {fav.item.title}
                    </div>
                    <div className="text-rose-600 dark:text-rose-400 font-medium text-md sm:text-base">
                      {fav.item.price.toLocaleString("fa-IR")} تومان
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      امتیاز: {fav.item.rate || "N/A"} (
                      {fav.item.rate_count || 0} نظر)
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <AddToCartButtonStyled itemId={fav.item.id} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                محصولی در علاقه‌مندی‌ها وجود ندارد
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-sm sm:text-base"
              asChild
            >
              <Link href="/profile/favorites">مشاهده همه علاقه‌مندی‌ها</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* بنر تبلیغاتی */}
      <Card className="bg-gradient-to-r from-rose-600 to-amber-500 dark:from-rose-800 dark:to-amber-700 text-white shadow-2xl rounded-3xl border-none overflow-hidden">
        <CardContent className="p-6 sm:p-8 text-center">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3">
            تخفیف ویژه امروز!
          </h3>
          <p className="text-rose-100 dark:text-amber-200 text-sm sm:text-base mb-4">
            با سفارش بالای ۲۰۰,۰۰۰ تومان، ۱۰٪ تخفیف بگیرید
          </p>
          <Button className="bg-white text-rose-700 hover:bg-rose-100 rounded-full px-6 py-2 text-sm sm:text-base font-medium">
            <Link href="/menu">سفارش دهید</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl rounded-3xl border-none p-2 mb-18 sm:p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.1)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            اقدامات سریع
          </CardTitle>
        </CardHeader>
        <CardContent className="!px-1">
          <div className="grid grid-cols-2   lg:grid-cols-3 gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              className="group relative overflow-hidden bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-full text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium transition-all duration-300"
              asChild
            >
              <Link
                href="/profile/settings"
                className="flex items-center !justify-start gap-1"
              >
                <User
                  size={14}
                  className=" group-hover:scale-110 transition-transform"
                />
                ویرایش پروفایل
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="group relative overflow-hidden bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-full text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium transition-all duration-300"
              asChild
            >
              <Link
                href="/profile/addresses"
                className="flex items-center justify-start gap-1"
              >
                <MapPin
                  size={14}
                  className=" group-hover:scale-110 transition-transform"
                />
                مدیریت آدرس‌ها
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="group relative overflow-hidden bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-full text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium transition-all duration-300"
              asChild
            >
              <Link
                href="/menu"
                className="flex items-center justify-start gap-1"
              >
                <Coffee
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />
                سفارش جدید
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="group relative overflow-hidden bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-full text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium transition-all duration-300"
              asChild
            >
              <Link
                href="/profile/orders"
                className="flex items-center justify-start gap-1"
              >
                <Clock
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />
                سفارشات
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="group relative overflow-hidden bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-full text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium transition-all duration-300"
              asChild
            >
              <Link
                href="/favorites"
                className="flex items-center justify-start gap-1"
              >
                <Star
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />
                موارد دلخواه
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="group relative overflow-hidden bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-full text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium transition-all duration-300"
              asChild
            >
              <Link
                href="/rewards"
                className="flex items-center justify-start gap-1"
              >
                <Gift
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />
                پاداش‌ها
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
