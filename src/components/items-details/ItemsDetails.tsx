"use client";
import { useState } from "react";
import {
  ShoppingCart,
  MessageCircle,
  Clock,
  Coffee,
  Pizza,
  Copy,
  Share2,
  Check,
  StarIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import { useAddComment } from "@/services/Comments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FavoriteToggleButton } from "@/lib/FavoriteToggleButton";
import { useAddToCart } from "@/store/cartStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { AddToCartButtonStyled } from "@/lib/AddToCartButtonStyled";

export default function ItemsDetails({ item }: { item: any }) {
  const [activeImage, setActiveImage] = useState(0);

  const originalPrice = parseFloat(item?.price);
  const discount = parseFloat(item?.discount);
  const finalPrice =
    discount > 0
      ? originalPrice - (originalPrice * discount) / 100
      : originalPrice;

  const [isCopied, setIsCopied] = useState(false);
  const { mutate: addComment } = useAddComment();
  const { mutate: addToCart } = useAddToCart();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        text: z
          .string()
          .min(1, "نظر خود را وارد کنید")
          .max(50, "کمتر از 50 کاراکتر وارد کنید"),
      })
    ),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (data: any) => {
    const payload = {
      text: data.text,
      itemId: item?.id,
    };
    addComment(payload);
    reset();
  };
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleReplyClick = (id: string) => {
    setActiveReplyId((prev) => (prev === id ? null : id));
    setReplyText("");
  };

  const handleReplySubmit = (data: any) => {
    const payload = {
      text: data.text,
      itemId: item?.id,
      parentId: activeReplyId,
    };
    console.log("payload", payload);
    addComment(payload, {
      onSuccess: () => {
        toast.success("بعد از تایید توسط مدیر پاسخ شما نمایش داده خواهد شد");
      },
      onError: () => {
        toast.error("خطا در ثبت پاسخ");
      },
    });
    reset();
  };
  const renderReplyInput = (parentId: string) => (
    console.log("parentId", parentId),
    (
      <div className="mt-3 space-y-2 flex flex-col  items-end gap-2">
        <Textarea
          {...register("text")}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="پاسخ خود را بنویسید..."
          className="min-h-[80px] bg-white/80 dark:bg-gray-900/30 border border-amber-300 dark:border-amber-700 text-sm"
        />
        <Button
          size="sm"
          className="bg-amber-500 hover:bg-amber-600 text-white"
          onClick={handleSubmit(handleReplySubmit)}
        >
          ارسال پاسخ
        </Button>
      </div>
    )
  );

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-28">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-amber-400/10 rounded-full blur-3xl  "></div>
        <div className="absolute bottom-[15%] right-[20%] w-80 h-80 bg-orange-500/10 rounded-full blur-3xl   animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-amber-300/15 rounded-full blur-2xl   animation-delay-4000"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* سمت چپ: تصاویر و اطلاعات پایه */}
        <div className="space-y-8">
          {/* تصویر اصلی */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl h-[250px] sm:h-[500px]  border-4 border-white dark:border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={item?.images[activeImage]?.imageUrl}
              alt={item?.title}
              width={100}
              height={100}
              className="w-full h-full sm: object-cover"
            />

            {/* تخفیف */}
            {discount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 left-4 bg-gradient-to-tr from-red-500 to-red-600 text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg z-20"
              >
                {discount}% تخفیف
              </motion.div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6"></div>
          </motion.div>

          {/* تصاویر کوچک */}
          <div className="grid grid-cols-4 gap-4">
            {item?.images?.map((img: any, index: number) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "rounded-2xl overflow-hidden shadow-lg h-20 cursor-pointer transition-all duration-300 border-2",
                  index === activeImage
                    ? "border-amber-500 scale-105 shadow-amber-200 dark:shadow-amber-800"
                    : "border-transparent"
                )}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={img?.imageUrl}
                  alt={`${item?.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {/* توضیحات و مواد تشکیل دهنده */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/70 dark:border-gray-700/50 relative overflow-hidden"
          >
            {/* عناصر تزئینی */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-r from-amber-300/20 to-orange-300/20 dark:from-amber-700/10 dark:to-orange-700/10 blur-xl"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-gradient-to-r from-amber-200/20 to-orange-200/20 dark:from-amber-800/10 dark:to-orange-800/10 blur-xl"></div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6 relative z-10">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-medium shadow-md">
                    {item?.category?.title}
                  </span>

                  {/* امتیاز */}
                  <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < (item?.rate || 4)
                              ? "text-amber-500 fill-amber-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-300 ml-1">
                      {item?.rate || 4.8}
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
                  {item?.title}
                </h1>

                {/* توضیحات */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-5"
                >
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-gray-800 dark:to-gray-800 p-4 rounded-xl border border-amber-100 dark:border-gray-700">
                    {item?.description}
                  </p>
                </motion.div>
              </div>

              <FavoriteToggleButton
                itemId={item?.id}
                isFavorite={item?.isFav}
                iconSize={38}
                className={`rounded-full flex items-center justify-center   ${
                  item?.isFav
                    ? " text-amber-500"
                    : "  text-gray-900 dark:text-white"
                }`}
              />
            </div>

            {/* مواد تشکیل دهنده */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  مواد تشکیل دهنده
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-amber-300 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {item?.ingredients?.map((ingredient: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-100 dark:border-amber-800/30 shadow-sm"
                  >
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {ingredient}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* دکمه‌های پایین */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-end items-center gap-3 mt-6"
            >
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white dark:bg-gray-800 border-amber-200 dark:border-amber-800/50 hover:bg-amber-50 dark:hover:bg-amber-900/10 text-amber-600 dark:text-amber-400"
                onClick={() => {
                  setIsCopied(true);
                  navigator.clipboard.writeText(
                    `${window.location.origin}/menu/${item?.id}`
                  );
                  toast.success("لینک با موفقیت کپی شد");
                  setTimeout(() => setIsCopied(false), 2000);
                }}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    لینک کپی شد
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    کپی لینک
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white dark:bg-gray-800 border-amber-200 dark:border-amber-800/50 hover:bg-amber-50 dark:hover:bg-amber-900/10 text-amber-600 dark:text-amber-400"
                onClick={() =>
                  toast.info("قابلیت اشتراک‌گذاری به زودی فعال می‌شود")
                }
              >
                <Share2 className="w-4 h-4" />
                اشتراک‌گذاری
              </Button>
            </motion.div>
          </motion.div>
          {/* قیمت و افزودن به سبد */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-5 shadow-md border border-amber-100 dark:border-amber-800/30 sticky top-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* بخش قیمت و موجودی */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  {/* قیمت‌ها */}
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-amber-700 dark:text-amber-300">
                        {finalPrice?.toLocaleString("fa-IR")} تومان
                      </span>
                      {discount > 0 && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          {originalPrice?.toLocaleString("fa-IR")}
                        </span>
                      )}
                    </div>

                    {/* موجودی */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item?.quantity > 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item?.quantity > 0
                          ? `${item?.quantity} عدد موجود`
                          : "ناموجود"}
                      </span>
                    </div>
                  </div>

                  {/* تخفیف */}
                  {discount > 0 && (
                    <div className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                      {discount}% تخفیف
                    </div>
                  )}
                </div>
              </div>

              {/* دکمه افزودن به سبد خرید */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0"
              >
                <AddToCartButtonStyled
                  itemId={item.id}
                  disabled={item.quantity === 0}
                  className=""
                />
              </motion.div>
            </div>

            {/* بار پیشرفت موجودی */}
            {item?.quantity > 0 && (
              <div className="mt-3">
                <div className="h-1.5 bg-amber-100 dark:bg-amber-900/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(100, (item?.quantity / 10) * 100)}%`,
                    }}
                    transition={{ duration: 1 }}
                    className={`h-full ${
                      item?.quantity > 5 ? "bg-green-500" : "bg-amber-500"
                    }`}
                  />
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-amber-200 dark:border-amber-800/30 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>گارانتی اصالت کالا</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span>پرداخت امن</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <span>تحویل سریع</span>
              </div>
            </div>
          </motion.div>

          {/* کامنت‌ها */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm  rounded-3xl p-6 shadow-xl border border-white dark:border-gray-700"
          >
            <Tabs defaultValue="comments">
              <TabsList className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 backdrop-blur-sm grid w-full grid-cols-2">
                <TabsTrigger
                  value="comments"
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-white cursor-pointer"
                >
                  نظرات ({item?.comments?.length})
                </TabsTrigger>
                <TabsTrigger
                  value="add-comment"
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-white cursor-pointer"
                >
                  ثبت نظر
                </TabsTrigger>
              </TabsList>

              <TabsContent value="comments" className="mt-6">
                <div className="space-y-8">
                  <Accordion
                    dir="rtl"
                    type="multiple"
                    className="w-full space-y-4 text-right"
                  >
                    {item?.comments?.map((comment: any) => (
                      <AccordionItem
                        dir="rtl"
                        key={comment.id}
                        value={comment.id}
                        className="overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-amber-100 dark:border-amber-800/50 shadow-lg transition-all duration-300 hover:shadow-xl"
                      >
                        {/* کامنت اصلی */}
                        <div className="p-5 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                  {comment.user.first_name[0]}
                                  {comment.user.last_name[0]}
                                </div>
                                <div>
                                  <p className="font-bold text-gray-800 dark:text-white">
                                    {comment.user.first_name}{" "}
                                    {comment.user.last_name}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-amber-600 dark:text-amber-400 ttra"
                                onClick={() => handleReplyClick(comment.id)}
                              >
                                پاسخ
                              </Button>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {comment.text}
                            </p>
                            {activeReplyId === comment.id &&
                              renderReplyInput(comment.id)}
                          </div>
                        </div>

                        {/* پاسخ‌ها */}
                        {comment.children?.length > 0 && (
                          <>
                            <AccordionTrigger className="text-sm px-5 py-2 text-amber-600 dark:text-amber-400">
                              {`مشاهده ${comment.children.length} پاسخ`}
                            </AccordionTrigger>
                            <AccordionContent className="px-5 pb-4 space-y-4 border-t pt-2 border-amber-200 dark:border-amber-800/30">
                              {comment.children.map((reply: any) => (
                                <div
                                  key={reply.id}
                                  className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-amber-100 dark:border-amber-700"
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                      <div className="bg-amber-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
                                        {reply.user.first_name[0]}
                                      </div>
                                      <div>
                                        <p className="font-medium text-gray-800 dark:text-white text-sm">
                                          {reply.user.first_name}{" "}
                                          {reply.user.last_name}
                                        </p>
                                      </div>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-xs text-amber-600 dark:text-amber-400"
                                      onClick={() => handleReplyClick(reply.id)}
                                    >
                                      پاسخ
                                    </Button>
                                  </div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                    {reply.text}
                                  </p>
                                  {activeReplyId === reply.id &&
                                    renderReplyInput(reply.id)}
                                </div>
                              ))}
                            </AccordionContent>
                          </>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                  {item?.comments?.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <MessageCircle
                        className="mx-auto mb-4 text-gray-300 dark:text-gray-600"
                        size={40}
                      />
                      <p>هنوز نظری برای این محصول ثبت نشده است.</p>
                      <p className="mt-2">اولین نفری باشید که نظر می‌دهد!</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="add-comment" className="mt-6" dir="rtl">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      نظر شما
                    </label>
                    <Textarea
                      {...register("text")}
                      placeholder="نظر خود را در مورد این محصول بنویسید..."
                      className={cn(
                        "min-h-[150px] bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border",
                        errors.text
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      )}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex justify-end text-xs text-muted-foreground mb-1">
                      {50 - (watch("text")?.length || 0)} کاراکتر باقی مانده
                    </div>

                    {errors.text && (
                      <p className="text-red-500 text-sm">
                        {errors.text.message}
                      </p>
                    )}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      disabled={!isValid}
                      onClick={handleSubmit(onSubmit)}
                      className="w-full py-6 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg"
                    >
                      ثبت نظر
                    </Button>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
