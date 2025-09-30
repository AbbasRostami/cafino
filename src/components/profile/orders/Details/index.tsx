"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Package, CreditCard, MapPin, Download, Truck, X } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { OrderDetailsModalProps } from "@/types/Profile";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import { DrawerContent } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { ImageDialog } from "@/app/(admin)/components/common/ImageDialog";

export const OrderDetailsModal = ({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProps) => {
  if (!order) return null;
  const isMobile = useIsMobile();
  const Content = () => {
    const router = useRouter();
    return (
      <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-6">
        <div className="grid grid-cols-1 gap-6">
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
              {order?.items?.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border-t-4 border-indigo-500 dark:border-indigo-400 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <ImageDialog
                            src={item?.item?.images?.[0]?.imageUrl || ""}
                            alt={item?.item?.title}
                          >
                            <Image
                              src={item?.item?.images?.[0]?.imageUrl || ""}
                              alt={item?.item?.title || ""}
                              width={100}
                              height={100}
                              className="w-16 h-16 cursor-pointer hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-gray-800 rounded-2xl object-cover border border-gray-200 dark:border-gray-700"
                            />
                          </ImageDialog>
                          <div>
                            <h4 className="font-bold text-gray-800 dark:text-white text-lg">
                              {item?.item?.title}
                            </h4>
                            <p className="text-gray-500 dark:text-gray-400  text-md  font-medium mt-1">
                              تعداد: {item?.count}
                            </p>
                          </div>
                        </div>

                        <div className="text-left">
                          <div className=" flex items-center gap-1 font-bold  text-gray-800 dark:text-white mt-1 text-lg">
                            {formatCurrency(item?.item?.price)}
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              تومان
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
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
                    {formatCurrency(order?.total_amount)} تومان
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    تخفیف:
                  </span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    -{formatCurrency(order?.discount_amount)} تومان
                  </span>
                </div>
                <Separator className="bg-gray-200 dark:bg-gray-700" />
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">
                      مبلغ پرداختی:
                    </span>
                    <span className="text-xl font-bold text-gray-800 dark:text-amber-500">
                      {formatCurrency(order?.payment_amount)} تومان
                    </span>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      شماره فاکتور:
                    </span>
                    <span className="font-mono font-medium text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {order?.payments[0]?.invoice_number}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      شماره پیگیری
                    </span>
                    <span className="font-mono font-medium text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {order?.payments[0]?.ref_id || "نامشخص"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

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

              <div className="flex justify-evenly flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
                    <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      استان
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {order?.address?.province || "نامشخص"}
                    </p>
                  </div>
                </div>
                <div className="flex  items-center gap-3">
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
                      {order?.address?.city || "نامشخص"}
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
                      {order?.address?.address || "نامشخص"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
          <Button
            onClick={() => router.push("/profile/tickets")}
            className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium rounded-xl px-5 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2">
              <Truck className="h-5 w-5" />
              پیگیری سفارش
            </div>
          </Button>
        </div>
      </div>
    );
  };

  return isMobile ? (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[80vh] border-none">
        <DrawerHeader className="p-2">
          <DrawerTitle className="flex justify-center items-center gap-3">
            <Package size={25} className="text-amber-500 dark:text-amber-500" />
            جزئیات سفارش
          </DrawerTitle>
          <VisuallyHidden>
            <DrawerDescription>جزئیات سفارش</DrawerDescription>
          </VisuallyHidden>
        </DrawerHeader>
        <Content />
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="
        overflow-hidden border-none shadow-2xl p-0 min-w-4xl rounded-3xl max-h-[90vh] scrollbar-hide"
      >
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
          <VisuallyHidden>
            <DialogDescription>جزئیات سفارش</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
};
