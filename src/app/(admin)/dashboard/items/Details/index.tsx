"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/ui/useMediaQuery";
import { MotionDiv } from "@/utils/MotionWrapper";
import {
  X,
  Star,
  Package,
  DollarSign,
  Percent,
  Eye,
  EyeOff,
  Calendar,
  Hash,
  Image as ImageIcon,
  ChefHat,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { formatJalaliDate } from "@/utils/formatters";
import { ItemDetailsModalProps } from "@/types/admin";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { formatCurrency } from "@/utils/formatters";

export function ItemDetailsModal({
  isOpen,
  onClose,
  item,
}: ItemDetailsModalProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!item) return null;

  const {
    title,
    description,
    price,
    discount,
    quantity,
    rate,
    rate_count,
    show,
    created_at,
    images,
    ingredients,
    category,
  } = item;

  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;
  const mainImage =
    images?.[selectedImageIndex]?.imageUrl || images?.[0]?.imageUrl;

  const ModalContent = () => (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-right bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              جزئیات محصول
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
              مشاهده اطلاعات کامل محصول
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
        >
          <X size={20} />
        </Button>
      </div>

      <div className="space-y-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-xl">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={title}
                width={600}
                height={600}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>

          {images && images?.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {images?.map((image: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? "border-purple-500 shadow-lg"
                      : "border-gray-200 dark:border-gray-700 hover:border-purple-300"
                  }`}
                >
                  <Image
                    src={image?.imageUrl}
                    alt={`${title} ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {category?.title || "بدون دسته‌بندی"}
            </Badge>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < rate
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({rate_count} امتیاز)
            </span>
          </div>

          {description && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 text-right leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </MotionDiv>

        <Separator className="my-6" />

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              قیمت محصول
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                قیمت اصلی:
              </span>
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {formatCurrency(price)} تومان
              </span>
            </div>

            {discount > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Percent className="w-4 h-4 text-red-500" />
                    تخفیف ({discount}%):
                  </span>
                  <span className="text-lg font-medium text-red-600">
                    -{(price * discount) / 100} تومان
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    قیمت نهایی:
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    {formatCurrency(discountedPrice)} تومان
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  قیمت نهایی:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {price} تومان
                </span>
              </div>
            )}
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800 text-center">
            <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">موجودی</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {quantity}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800 text-center">
            <Star className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">امتیاز</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {rate}/5
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800 text-center">
            <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              تعداد امتیازات
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {rate_count}
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-4 border border-green-200 dark:border-green-800 text-center">
            {show ? (
              <Eye className="w-6 h-6 text-green-600 mx-auto mb-2" />
            ) : (
              <EyeOff className="w-6 h-6 text-red-600 mx-auto mb-2" />
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400">وضعیت</p>
            <p
              className={`text-lg font-bold ${
                show ? "text-green-600" : "text-red-600"
              }`}
            >
              {show ? "فعال" : "غیرفعال"}
            </p>
          </div>
        </MotionDiv>

        {ingredients && ingredients.length > 0 && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800"
          >
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                مواد اولیه
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white dark:bg-gray-800 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700"
                >
                  {ingredient}
                </Badge>
              ))}
            </div>
          </MotionDiv>
        )}

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                تاریخ ثبت:
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {formatJalaliDate(
                  new Date(created_at),
                  "jYYYY/jMM/jDD - HH:MM"
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                شناسه محصول:
              </span>
              <span className="text-gray-900 dark:text-white font-mono text-sm">
                {item.id.slice(0, 8)}...
              </span>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="max-h-[95vh]">
          <VisuallyHidden>
            <DrawerTitle>جزئیات ایتم </DrawerTitle>
            <DrawerDescription>توضیحات و جزئیات کامل ایتم ها</DrawerDescription>
          </VisuallyHidden>
          <div className="overflow-y-auto p-4">
            <ModalContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl max-h-[95vh] scrollbar-hide overflow-y-auto p-6"
      >
        <VisuallyHidden>
          <DialogTitle>جزئیات ایتم </DialogTitle>
          <DialogDescription>توضیحات و جزئیات کامل ایتم ها</DialogDescription>
        </VisuallyHidden>
        <ModalContent />
      </DialogContent>
    </Dialog>
  );
}
