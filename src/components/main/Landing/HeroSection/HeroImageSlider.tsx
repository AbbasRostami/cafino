"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import { MotionDiv } from "@/utils/MotionWrapper";
import Photo1 from "./../../../../assets/HeroSection/HeroSection1.png";
import Photo2 from "./../../../../assets/HeroSection/HeroSection2.png";
import Photo3 from "./../../../../assets/HeroSection/HeroSection3.png";
import Photo4 from "./../../../../assets/HeroSection/HeroSection4.png";

const HeroImageSlider = () => {
  const photos = [Photo1, Photo2, Photo3, Photo4];

  return (
    <MotionDiv
      className="relative w-full max-w-[90vw] mx-auto rounded-2xl overflow-hidden mb-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        effect="fade"
        speed={1500}
        fadeEffect={{ crossFade: true }}
        modules={[Autoplay, EffectFade]}
        className="h-full"
      >
        {photos.map((photo, idx) => (
          <SwiperSlide key={idx} className="!flex !justify-center">
            <Image
              width={500}
              src={photo}
              alt={`Slide ${idx + 1}`}
              className="object-cover h-auto"
              priority={idx === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </MotionDiv>
  );
};

export default HeroImageSlider;
