"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Coffee,
  Utensils,
  Star,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  Play,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Photo1 from "./../../../assets/HeroSection/HeroSection1.png";
import Photo2 from "./../../../assets/HeroSection/HeroSection2.png";
import Photo3 from "./../../../assets/HeroSection/HeroSection3.png";
import Photo4 from "./../../../assets/HeroSection/HeroSection4.png";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { useRouter } from "next/navigation";
const HeroSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, direction: "rtl" }, [
    Autoplay({ delay: 3000 }),
    Fade(),
  ]);

  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .embla { overflow: hidden; width: 100%; height: 100%; }
      .embla__container { display: flex; height: 100%; }
      .embla__slide { position: relative; min-width: 100%; height: 24rem; }
      @media (min-width: 1024px) { .embla__slide { height: 32rem; } }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const router = useRouter();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-10 pt-28">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full filter blur-xl opacity-20 animate-pulse mix-blend-multiply dark:bg-white dark:bg-none dark:opacity-70 dark:mix-blend-normal"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-orange-400 to-red-400 rounded-full filter blur-xl opacity-20 animate-pulse delay-1000 mix-blend-multiply dark:bg-white dark:bg-none dark:opacity-60 dark:mix-blend-normal"></div>
        <div className="absolute top-32 left-1/4 w-4 h-4 bg-amber-600 rounded-full opacity-60 animate-bounce mix-blend-multiply dark:bg-white dark:opacity-90 dark:mix-blend-normal"></div>
        <div className="absolute top-64 right-1/3 w-3 h-3 bg-orange-600 rounded-full opacity-60 animate-bounce delay-500 mix-blend-multiply dark:bg-white dark:opacity-90 dark:mix-blend-normal"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-2 items-center">
          <div className="text-center lg:text-right space-y-8">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 dark:bg-[#23232a] dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>بهترین کافه شهر</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent dark:from-yellow-400 dark:to-orange-300">
                  کـــافـینو
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-200">
                  تجربه‌ای متفاوت
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-bold text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                با بهترین قهوه‌ها و غذاهای خانگی، لحظات شیرین را با ما تجربه
                کنید
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Coffee className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
                <span className="font-bold">قهوه تازه</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Utensils className="w-4 h-4 text-orange-600 dark:text-orange-300" />
                <span className="font-bold">غذای خانگی</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="font-bold">۲۴/۷ باز</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => router.push("/menu")}
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Coffee className="w-5 h-5 ml-2" />
                سفارش آنلاین
                <ArrowRight className="w-5 h-5 mr-2" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 dark:border-gray-500 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                <Play className="w-5 h-5 ml-2" />
                تماشای ویدیو
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
                <span className="dark:text-gray-200 font-bold">
                  تهران، خیابان ولیعصر
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-600 dark:text-orange-300" />
                <span className="dark:text-gray-200 font-bold">
                  ۰۲۱-۱۲۳۴۵۶۷۸
                </span>
              </div>
            </div>
          </div>

          <div className="relative ">
            <div className="relative z-10">
              <div
                className="embla w-full max-w-[90vw] mx-auto rounded-2xl overflow-hidden h-[800px] lg:h-[800px]"
                ref={emblaRef}
              >
                <div className="embla__container flex h-full">
                  {[Photo1, Photo2, Photo3, Photo4].map((photo, idx) => (
                    <div
                      key={idx}
                      className="embla__slide relative flex items-center justify-center w-full h-full"
                    >
                      <Image
                        fill
                        src={photo}
                        alt={`Slide ${idx + 1}`}
                        className=" object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute  -bottom-3 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
