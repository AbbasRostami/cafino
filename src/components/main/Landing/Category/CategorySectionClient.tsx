"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Category, CategorySectionClientProps } from "@/types/main";
import { MotionDiv } from "@/utils/MotionWrapper";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CircleArrowOutUpRight } from "lucide-react";

const CategorySectionClient: React.FC<CategorySectionClientProps> = ({
  categories,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="relative">
        <MotionDiv
          className="text-center mb-4 md:mb-9"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8 },
            },
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className=" text-amber-600 dark:text-amber-400 relative z-10">
              دسته‌بندی‌های ما
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            بهترین انتخاب‌ها از منوی متنوع ما
          </p>
        </MotionDiv>

        <Swiper
          dir="rtl"
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          pagination={{
            clickable: true,
            el: ".Category-slider-pagination",
          }}
          className="pb-14 pt-4 rounded-[30px]"
        >
          {categories?.map((item: Category) => (
            <SwiperSlide className="py-7 px-4" key={item?.id}>
              <div
                className="rounded-[30px] hover:scale-105 transition duration-300 h-full"
                role="button"
                tabIndex={0}
                aria-label={`دسته‌بندی ${item?.title}`}
              >
                <div className="bg-[#18181c] dark:bg-[#18181c] bg-gradient-to-r from-amber-500 to-amber-700 dark:bg-none w-full h-72 rounded-xl relative flex flex-col justify-center items-center">
                  <div
                    onClick={() => {
                      router.push(`/menu?category=${item?.title}`);
                    }}
                    className="top-radius absolute top-0 -right-0.5 w-auto px-3 h-14 bg-orange-50 dark:bg-[#23232a] rounded-bl-2xl rounded-tr-2xl flex justify-center items-center "
                  >
                    <CircleArrowOutUpRight className="text-gray-600 dark:text-gray-200 w-8 h-8 sm:w-10 sm:h-10  z-10" />
                  </div>

                  <Image
                    width={200}
                    height={200}
                    src={item?.imageUrl}
                    alt={item?.title || "محصول"}
                    className="mx-auto w-[50%] max-h-[190px] object-contain"
                    loading="lazy"
                  />

                  <div
                    className="bottom-radius absolute bottom-0 left-1/2 -translate-x-1/2 w-auto max-w-14 h-10
                     bg-orange-50 px-10 md:px-16 font-semibold
                        dark:bg-[#23232a] text-gray-950
                     dark:text-white rounded-ss-2xl rounded-se-2xl flex justify-center items-center"
                  >
                    {item?.title || "بدون عنوان"}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="Category-slider-pagination mt-4 mb-6 cursor-pointer flex items-center justify-center gap-2"></div>
      </div>
    </>
  );
};

export default CategorySectionClient;
