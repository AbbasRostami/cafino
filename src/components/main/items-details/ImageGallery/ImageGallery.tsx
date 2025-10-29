"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/utils";
import { ImageGalleryProps } from "@/types/main";
import { MotionDiv } from "@/utils/MotionWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Thumbs,
  FreeMode,
  EffectFade,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { ChevronLeftIcon } from "lucide-react";
import { ChevronRightIcon } from "lucide-react";

export const ImageGallery = ({ images, discount }: ImageGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!images || images?.length === 0) {
    return (
      <div className="space-y-8">
        <div className="rounded-3xl overflow-hidden shadow-2xl h-[250px] sm:h-[420px] border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">تصویری موجود نیست</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="custom-prev absolute bottom-4 left-4 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-1 rounded-full text-sm cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95">
          <ChevronLeftIcon className="w-6 h-6" />
        </div>
        <div className="custom-next absolute bottom-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-1 rounded-full text-sm cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95">
          <ChevronRightIcon className="w-6 h-6" />
        </div>

        <Swiper
          modules={[Navigation, Pagination, Thumbs, EffectFade]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop={true}
          pagination={{
            type: "fraction",
            renderFraction: function (currentClass, totalClass) {
              return `
                <span class="w-10 h-10 bg-black/50 text-white text-base px-2 py-1 rounded-full">
                  <span class="${currentClass}"></span> / <span class="${totalClass}"></span>
                </span>
              `;
            },
          }}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          className="rounded-3xl overflow-hidden shadow-2xl h-[250px] sm:h-[480px] border-4 border-white dark:border-gray-800"
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index} className="relative">
              <Image
                src={img?.imageUrl}
                alt={`Product image ${index + 1}`}
                fill
                priority={index === (thumbsSwiper as SwiperType)?.activeIndex}
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 800px"
              />

              {discount && discount > 0 && (
                <div className="absolute top-4 right-4 z-20 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                  {discount}% تخفیف
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </MotionDiv>

      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mt-4"
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index} className="!w-auto py-6 px-1.5">
            <MotionDiv
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-2xl overflow-hidden shadow-lg h-20 w-20 border relative cursor-pointer transition-all",
                index === (thumbsSwiper as SwiperType)?.activeIndex
                  ? "border-amber-500 shadow-amber-200 dark:shadow-amber-800 scale-105"
                  : "border-transparent hover:border-amber-300"
              )}
            >
              <Image
                src={img?.imageUrl}
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300"
                width={80}
                height={80}
              />
              {index === (thumbsSwiper as SwiperType)?.activeIndex && (
                <div className="absolute inset-0 bg-amber-500/20 border-2 border-amber-500 rounded-2xl" />
              )}
            </MotionDiv>
          </SwiperSlide>
        ))}
      </Swiper>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="hidden md:block bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-6 border border-amber-200 dark:border-amber-800/30 shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          اطلاعات تکمیلی
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              کیفیت تضمین شده
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              ارسال سریع
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              پشتیبانی 24/7
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              بازگشت آسان
            </span>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};
