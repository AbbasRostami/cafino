"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  ArrowLeft,
  X,
  Trash2,
  Truck,
  CreditCard,
  Gift,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CartApiResponse,
  useClearCart,
  useAddDiscount,
  useRemoveDiscount,
} from "@/store/cartStore";
import { confirm } from "@/components/common/ConfirmModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import CheckoutItemControls from "@/lib/CheckoutItemControls";

const discountSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, { message: "کد تخفیف صحیح نیست" })
    .max(10, { message: "کد تخفیف صحیح نیست" }),
});

type DiscountFormValues = z.infer<typeof discountSchema>;

export default function CheckoutCart({
  cart,
  isLoading,
  refetchCart,
  isAuthenticated,
}: {
  cart: CartApiResponse;
  isLoading: boolean;
  refetchCart: () => void;
  isAuthenticated: boolean;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const clearCartMutation = useClearCart();
  const addDiscountMutation = useAddDiscount();
  const removeDiscountMutation = useRemoveDiscount();
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
  });

  const onSubmit = (data: DiscountFormValues) => {
    addDiscountMutation.mutate(
      { code: data?.code },
      {
        onSuccess: () => {
          toast.success("کد تخفیف اعمال شد");
          setIsDiscountApplied(true);
        },
      }
    );
  };

  const handleRemove = () => {
    removeDiscountMutation.mutate(
      { code: cart?.generalDiscount?.code },
      {
        onSuccess: () => {
          toast.success("کد تخفیف حذف شد");
          setIsDiscountApplied(false);
          reset();
        },
      }
    );
  };

  const handleClearCart = async () => {
    if (isAuthenticated) {
      try {
        await clearCartMutation.mutateAsync();
        setTimeout(() => {
          refetchCart();
        }, 100);
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    } else {
      // guestClearCart();
      // guestSyncCart();
    }
  };

  return (
    <div className="min-h-screen pt-36 py-8 px-4 relative ">
      {/* افکت‌های پس‌زمینه */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[10%] right-[15%] w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[15%] left-[20%] w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/2 w-64 h-64 bg-amber-300/15 rounded-full blur-2xl animate-pulse-slow animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] dark:bg-[url('/grid-dark.svg')] opacity-[0.03] dark:opacity-[0.05]"></div>
      </div>

      <div className="container mx-auto px-2 md:px-8 lg:px-16">
        {/* هدر صفحه */}
        <motion.div
          className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-10 border-b-4 border-amber-400 dark:border-amber-700 pb-4 px-2 sm:px-4"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/menu")}
            className="flex items-center gap-2 cursor-pointer bg-amber-50 dark:bg-amber-900/30 text-gray-600 dark:text-amber-300
                 border border-amber-400 dark:border-amber-600
                 transition-all duration-300 ease-in-out rounded-xl px-4 py-2
                 shadow-[0_4px_10px_rgba(255,193,7,0.2)] hover:shadow-[0_6px_15px_rgba(255,193,7,0.4)]"
          >
            <motion.div
              whileHover={{ x: -6, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <ArrowLeft size={20} />
            </motion.div>
            بازگشت به منو
          </motion.button>

          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 dark:text-white"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-gray-800 dark:text-gray-100">
              سبد خرید شما
            </span>
          </motion.h1>

          {/* Cart Info */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            {/* دکمه حذف همه آیتم‌ها */}
            {cart?.cartItems?.length && cart?.cartItems?.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  const result = await confirm({
                    title: "حذف همه محصولات",
                    description: "همه محصولات سبد خرید شما حذف خواهند شد؟",
                    confirmText: "حذف",
                    cancelText: "انصراف",
                  });
                  if (result) {
                    handleClearCart();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl
                   bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300
                   border border-red-300 dark:border-red-600 text-sm font-semibold
                   shadow-md transition-all duration-300 hover:bg-red-600 hover:text-white "
              >
                <Trash2 size={16} />
                حذف همه
              </motion.button>
            )}
            {/* تعداد آیتم‌ها */}
            <motion.div
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="backdrop-blur-md bg-gray-100 dark:bg-gray-800 flex items-center gap-2
                 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl shadow-lg
                 border border-gray-300 dark:border-gray-600 font-medium text-sm tracking-tight"
            >
              <ShoppingCart size={20} />
              {cart?.cartItems?.length.toLocaleString("fa-IR")} آیتم
            </motion.div>
          </motion.div>
        </motion.div>
        {/* محتوای اصلی */}
        {/* حالت سبد خالی */}
        {cart?.cartItems?.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-56 h-5w-56 mb-6">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 dark:from-amber-600/10 dark:to-orange-600/10 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              <ShoppingCart
                className="w-full h-full text-gray-300 dark:text-gray-700"
                strokeWidth={1.2}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              سبد خرید شما خالی است
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
              هنوز هیچ محصولی به سبد خرید خود اضافه نکرده‌اید. از منوی ما دیدن
              کنید و محصولات دلخواه خود را انتخاب نمایید.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => router.push("/menu")}
                className="px-8 py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg shadow-lg group"
              >
                <motion.span
                  animate={{ x: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mr-2"
                >
                  <ArrowLeft size={20} />
                </motion.span>
                مشاهده منو
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* بخش آیتم‌های سبد خرید */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {cart?.cartItems?.map((item: any) => (
                  <motion.div
                    key={item?.itemId}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, rotate: -5 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="relative bg-white h-fit dark:bg-gray-700 rounded-2xl"
                  >
                    <div className="overflow-hidden border border-amber-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group rounded-2xl dark:bg-gray-800 hover:border-amber-200 dark:hover:border-amber-600">
                      <div className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* تصویر محصول */}
                          <div className="sm:w-1/3  md:max-h-48 relative">
                            <div className="aspect-square overflow-hidden bg-gradient-to-br from-amber-50/30 to-orange-50/30 dark:from-gray-800 dark:to-gray-900" />
                            <Image
                              src={
                                item?.image ||
                                item?.images?.[0] ||
                                "https://i.pinimg.com/1200x/81/84/78/8184780b5b14d9357ef9fa7adacfb6e8.jpg"
                              }
                              alt={item?.title}
                              fill
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                            />
                            {item?.discount > 0 && (
                              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md">
                                {Math.round(item?.discount)}% تخفیف
                              </Badge>
                            )}
                          </div>

                          {/* اطلاعات محصول */}
                          <div className="sm:w-2/3 p-5 flex justify-center gap-6 flex-col">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                  {item?.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                  {item?.description}
                                </p>
                              </div>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              {/* قیمت‌ها */}
                              <div className="flex items-baseline gap-3">
                                <span className="text-xl font-bold text-amber-700 dark:text-amber-300">
                                  {(
                                    item?.price *
                                    (1 - item?.discount / 100)
                                  ).toLocaleString("fa-IR")}{" "}
                                  تومان
                                </span>
                                {item?.discount > 0 && (
                                  <span className="text-gray-500 dark:text-gray-400 line-through">
                                    {Number(item.price).toLocaleString(
                                      "fa-IR",
                                      {
                                        maximumFractionDigits: 0,
                                      }
                                    )}
                                  </span>
                                )}
                              </div>
                              <CheckoutItemControls
                                itemId={item?.itemId}
                                maxQuantity={item?.quantity}
                                disabled={item?.quantity === 0}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* بخش کد تخفیف */}

              <div className="relative overflow-hidden rounded-2xl border border-amber-300 dark:border-amber-700 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-6 shadow-[0_10px_30px_rgba(245,158,11,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                {/* افکت نور پس‌زمینه */}
                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-r from-amber-400/20 to-transparent blur-2xl"></div>

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <motion.div
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
                    </motion.div>

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
                          <p className="text-sm text-rose-500 mt-1">
                            {errors.code.message}
                          </p>
                        )}
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-full"
                      >
                        {!!cart?.generalDiscount &&
                        cart?.generalDiscount?.discountAmount > 0 ? (
                          <Button
                            type="button"
                            onClick={handleRemove}
                            className="h-full rounded-xl py-2 px-4 bg-rose-500 font-bold text-white shadow-lg hover:bg-rose-600 transition-all duration-300"
                          >
                            حذف کد
                            <Trash2 className="mr-2" size={20} />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            className="h-full rounded-xl py-2 px-4 bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-white shadow-lg shadow-amber-400/30 hover:from-amber-600 hover:to-orange-600 hover:shadow-amber-500/40 focus:ring-2 focus:ring-amber-300/50 focus:ring-offset-2 dark:shadow-amber-600/20"
                          >
                            اعمال کد
                            <Zap className="mr-2" size={20} />
                          </Button>
                        )}
                      </motion.div>
                    </div>
                  </form>
                </div>

                {/* افکت نور پایین */}
                <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-amber-500/10 to-transparent blur-xl"></div>
              </div>
            </div>

            {/* بخش خلاصه سفارش (فیکس در دسکتاپ) */}
            <div className="hidden lg:block">
              <div
                className="sticky top-24 max-w-sm rounded-2xl shadow-xl border border-amber-200 dark:border-gray-800 
                 bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg p-6 space-y-4 z-10"
              >
                <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Truck
                    size={22}
                    className="text-amber-600 dark:text-amber-400"
                  />
                  جزئیات پرداخت
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 font-bold text-medium">
                    مجموع آیتم ها
                  </span>
                  <span className="font-bold text-medium">
                    {cart?.totalAmount?.toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                {cart?.generalDiscount &&
                cart?.generalDiscount?.discountAmount > 0 ? (
                  <>
                    <div className="flex justify-between font-bold text-emerald-600 dark:text-emerald-400">
                      <span>کد تخفیف: {cart.generalDiscount.code}</span>
                      <span>
                        {Number(
                          cart.generalDiscount.discountAmount
                        ).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 font-bold text-medium">
                        مجموع تخفیف آیتم ها
                      </span>
                      <span className="font-bold">
                        {Math.round(cart?.totalDiscount)?.toLocaleString(
                          "fa-IR"
                        )}{" "}
                        تومان
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-left mt-1">
                      {cart.generalDiscount.percent
                        ? `${Number(
                            cart.generalDiscount.percent
                          ).toLocaleString("fa-IR")}% تخفیف روی کل سبد خرید`
                        : `${Number(cart.generalDiscount.amount).toLocaleString(
                            "fa-IR"
                          )} تومان تخفیف ثابت`}
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 font-bold text-medium">
                      مجموع تخفیف
                    </span>
                    <span className="font-bold">
                      {Math.round(cart?.totalDiscount)?.toLocaleString("fa-IR")}{" "}
                      تومان
                    </span>
                  </div>
                )}

                <Separator className="my-2 bg-amber-200 dark:bg-amber-800" />

                <div className="flex flex-col xl:flex-row justify-center md:justify-between items-center gap-3 mt-5 text-lg font-bold">
                  <span>مبلغ قابل پرداخت</span>
                  <span className="text-amber-700 dark:text-amber-300 ">
                    {cart?.paymentAmount?.toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full pt-2"
                >
                  <Button
                    className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 
                     hover:from-amber-600 hover:to-orange-600 text-lg shadow-lg group"
                    aria-label="ادامه فرآیند خرید"
                  >
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="ml-2"
                    >
                      <CreditCard size={20} />
                    </motion.span>
                    ادامه فرآیند خرید
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* بخش خلاصه سفارش (موبایل) */}
        {cart?.cartItems?.length && cart?.cartItems?.length > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl z-50">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <motion.div
                  className="p-4 flex justify-between items-center cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      مبلغ قابل پرداخت
                    </p>
                    <p className="text-xl font-bold text-amber-700 dark:text-amber-300">
                      {cart?.paymentAmount?.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md">
                    تکمیل سفارش
                  </Button>
                </motion.div>
              </SheetTrigger>

              <SheetContent
                side="bottom"
                className="rounded-t-2xl max-h-[80vh] bg-gradient-to-b from-white to-amber-50/30 dark:from-gray-900 dark:to-gray-950/50"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <Truck
                        size={20}
                        className="text-amber-600 dark:text-amber-400"
                      />
                      جزئیات پرداخت
                    </h3>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="بستن"
                        className="text-gray-500 dark:text-gray-400"
                      >
                        <X size={18} />
                      </Button>
                    </SheetClose>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        مجموع کالاها
                      </span>
                      <span className="font-medium">
                        {cart?.totalAmount?.toLocaleString("fa-IR")} تومان
                      </span>
                    </div>
                    {/* 
                      {cart?.discountApplied && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                          <span>تخفیف (10%)</span>
                          <span>
                            -{cart?.totalDiscount.toLocaleString("fa-IR")} تومان
                          </span>
                        </div>
                      )} */}

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        مجموع تخفیف
                      </span>
                      <span className="font-medium">
                        {cart?.totalDiscount?.toLocaleString("fa-IR")} تومان
                      </span>
                    </div>

                    <Separator className="my-2 bg-amber-200 dark:bg-amber-800" />

                    <div className="flex justify-between text-lg font-bold">
                      <span>مبلغ قابل پرداخت</span>
                      <span className="text-amber-700 dark:text-amber-300">
                        {cart?.paymentAmount?.toLocaleString("fa-IR")} تومان
                      </span>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6"
                    >
                      <Button
                        className="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg shadow-lg group"
                        aria-label="ادامه فرآیند خرید"
                      >
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="ml-2"
                        >
                          <CreditCard size={20} />
                        </motion.span>
                        ادامه فرآیند خرید
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </div>
  );
}
