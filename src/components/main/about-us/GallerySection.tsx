"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import {
  MotionDiv,
  MotionH3,
  MotionAnimatePresence,
} from "@/utils/MotionWrapper";

import image1 from "../../../assets/Gallery/Gallery1.avif";
import image2 from "../../../assets/Gallery/Gallery2.avif";
import image3 from "../../../assets/Gallery/Gallery3.avif";
import image4 from "../../../assets/Gallery/Gallery4.avif";

const galleryImages = [
  { src: image1, alt: "کافه داخلی", featured: false },
  { src: image2, alt: "محیط آرام", featured: false },
  { src: image3, alt: "نوشیدنی‌های گرم", featured: false },
  { src: image4, alt: "فضای مدرن", featured: false },
];

export const GallerySection: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <MotionDiv
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: false, margin: "-100px" }}
      className="relative"
    >
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl p-7 shadow-3xl border border-amber-100/60 dark:border-amber-800/40 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-amber-400/25 rounded-full blur-2xl"></div>

        <div className="flex items-center justify-between mb-7 relative z-10">
          <MotionH3
            className="text-xl font-bold text-amber-900 dark:text-amber-100 flex items-center gap-3"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: false }}
          >
            <div className="p-2 bg-amber-100/60 dark:bg-amber-900/40 rounded-full">
              <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            گالری کافینو
          </MotionH3>
        </div>

        <div className="w-full">
          <div className="relative h-96 rounded-2xl overflow-hidden mb-5 z-10">
            <Swiper
              modules={[Autoplay, Thumbs, EffectFade]}
              effect="fade"
              speed={1500}
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop
              thumbs={{ swiper: thumbsSwiper }}
              className="h-full w-full"
            >
              {galleryImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <MotionAnimatePresence mode="wait">
                    <MotionDiv
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover rounded-xl"
                        priority={image.featured}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 text-white">
                        <p className="text-base font-medium bg-amber-600/30 backdrop-blur-sm px-4 py-2 rounded-full">
                          {image.alt}
                        </p>
                      </div>
                    </MotionDiv>
                  </MotionAnimatePresence>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            spaceBetween={12}
            watchSlidesProgress
            className="relative z-10"
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 4 },
            }}
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index} className="!h-24 py-4 px-1.5 ">
                <MotionDiv
                  className="relative h-full rounded-xl overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </MotionDiv>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </MotionDiv>
  );
};
