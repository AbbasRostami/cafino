"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/utils/utils";
import { ImageGalleryProps } from "@/types/main";
import { MotionDiv } from "@/utils/MotionWrapper";

export const ImageGallery = ({
  images,
  activeImage,
  onImageChange,
  discount,
}: ImageGalleryProps) => {
  const safeActiveImage = Math.min(
    Math.max(0, activeImage),
    (images?.length || 1) - 1
  );

  useEffect(() => {
    if (images && images?.length > 0 && activeImage >= images?.length) {
      onImageChange(0);
    }
  }, [images, activeImage, onImageChange]);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        const newIndex =
          safeActiveImage > 0 ? safeActiveImage - 1 : images?.length - 1;
        onImageChange(newIndex);
      } else {
        const newIndex =
          safeActiveImage < images?.length - 1 ? safeActiveImage + 1 : 0;
        onImageChange(newIndex);
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      const newIndex =
        safeActiveImage < images?.length - 1 ? safeActiveImage + 1 : 0;
      onImageChange(newIndex);
    } else {
      const newIndex =
        safeActiveImage > 0 ? safeActiveImage - 1 : images?.length - 1;
      onImageChange(newIndex);
    }
  };

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
        className="relative rounded-3xl overflow-hidden shadow-2xl h-[250px] sm:h-[480px] border-4 border-white dark:border-gray-800 cursor-grab active:cursor-grabbing"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <Image
          src={images[safeActiveImage]?.imageUrl}
          alt="Product image"
          width={800}
          height={800}
          priority
          className="w-full h-full sm:object-cover"
        />

        {discount && discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
            {discount}% تخفیف
          </div>
        )}

        <button
          onClick={() => {
            const newIndex =
              safeActiveImage > 0 ? safeActiveImage - 1 : images?.length - 1;
            onImageChange(newIndex);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
        >
          <svg
            className="w-5 h-5 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            const newIndex =
              safeActiveImage < images?.length - 1 ? safeActiveImage + 1 : 0;
            onImageChange(newIndex);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
        >
          <svg
            className="w-5 h-5 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {safeActiveImage + 1} / {images.length}
        </div>
      </MotionDiv>

      <div className="flex gap-4 overflow-x-auto p-4">
        {images?.map((img, index) => (
          <div
            key={index}
            className={cn(
              "flex-shrink-0 cursor-pointer transition-all duration-300",
              index === safeActiveImage && "scale-105"
            )}
            onClick={() => onImageChange(index)}
          >
            <MotionDiv
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-2xl overflow-hidden shadow-lg h-20 border-2 relative",
                index === safeActiveImage
                  ? "border-amber-500 shadow-amber-200 dark:shadow-amber-800"
                  : "border-transparent hover:border-amber-300"
              )}
            >
              <Image
                src={img?.imageUrl}
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                width={100}
                height={100}
                priority
              />
              {index === safeActiveImage && (
                <div className="absolute inset-0 bg-amber-500/20 border-2 border-amber-500 rounded-2xl" />
              )}
            </MotionDiv>
          </div>
        ))}
      </div>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-6 border border-amber-200 dark:border-amber-800/30 shadow-lg"
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
