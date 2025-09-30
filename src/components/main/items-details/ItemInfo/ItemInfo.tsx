"use client";
import { StarIcon, Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FavoriteToggleButton } from "@/components/ui/FavoriteToggleButton";
import { ItemInfoProps } from "@/types/main";
import { useState } from "react";
import { MotionDiv } from "@/utils/MotionWrapper";

export const ItemInfo = ({ item }: ItemInfoProps) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/70 dark:border-gray-700/50 relative overflow-hidden"
    >
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-r from-amber-300/20 to-orange-300/20 dark:from-amber-700/10 dark:to-orange-700/10 blur-xl"></div>
      <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-gradient-to-r from-amber-200/20 to-orange-200/20 dark:from-amber-800/10 dark:to-orange-800/10 blur-xl"></div>
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6 relative z-10">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-medium shadow-md">
              {item?.category?.title}
            </span>

            <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
              <div className="flex items-center">
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
              <span className="text-sm font-bold text-amber-700 dark:text-amber-300 ml-1">
                {item?.rate || 4.8}
              </span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {item?.title}
          </h1>

          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-5"
          >
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-gray-800 dark:to-gray-800 p-4 rounded-xl border border-amber-100 dark:border-gray-700">
              {item?.description}
            </p>
          </MotionDiv>
        </div>

        <FavoriteToggleButton
          itemId={item?.id}
          isFavorite={item?.isFav}
          iconSize={38}
          className={`rounded-full flex items-center justify-center ${
            item?.isFav ? "text-amber-500" : "text-gray-900 dark:text-white"
          }`}
        />
      </div>

      <MotionDiv
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
          {item?.ingredients?.map((ingredient, index) => (
            <MotionDiv
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
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>

      <MotionDiv
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
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: item?.title,
                  text: item?.description,
                  url: `${window.location.origin}/menu/${item?.id}`,
                })
                .catch(() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/menu/${item?.id}`
                  );
                  toast.success("لینک با موفقیت کپی شد");
                });
            } else {
              navigator.clipboard.writeText(
                `${window.location.origin}/menu/${item?.id}`
              );
              toast.success("لینک با موفقیت کپی شد");
            }
          }}
        >
          <Share2 className="w-4 h-4" />
          اشتراک‌گذاری
        </Button>
      </MotionDiv>
    </MotionDiv>
  );
};
