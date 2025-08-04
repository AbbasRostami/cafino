"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageGalleryProps } from "@/types/main/items-details/items-details";
import { MotionDiv } from "@/utils/MotionWrapper";

export const ImageGallery = ({
  images,
  activeImage,
  onImageChange,
}: ImageGalleryProps) => {
  return (
    <div className="space-y-8">
      {/* تصویر اصلی */}
      <MotionDiv
        className="relative rounded-3xl overflow-hidden shadow-2xl h-[250px] sm:h-[500px] border-4 border-white dark:border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={images[activeImage]?.imageUrl}
          alt="Product image"
          width={100}
          height={100}
          className="w-full h-full sm:object-cover"
        />

        {/* تخفیف */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6"></div>
      </MotionDiv>

      {/* تصاویر کوچک */}
      <div className="grid grid-cols-4 gap-4">
        {images?.map((img, index) => (
          <MotionDiv
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "rounded-2xl overflow-hidden shadow-lg h-20 cursor-pointer transition-all duration-300 border-2",
              index === activeImage
                ? "border-amber-500 scale-105 shadow-amber-200 dark:shadow-amber-800"
                : "border-transparent"
            )}
            onClick={() => onImageChange(index)}
          >
            <Image
              src={img?.imageUrl}
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};
