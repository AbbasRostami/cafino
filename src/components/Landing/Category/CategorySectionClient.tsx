"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import WaveBackground from "@/assets/vector";
import Image from "next/image";
import {
  Category,
  CategorySectionClientProps,
} from "@/types/main/Landing/Category/CategorySection";

const CategorySectionClient: React.FC<CategorySectionClientProps> = ({
  items,
  itemsPerSlide = 3,
  onItemClick,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    direction: "rtl",
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => emblaApi && emblaApi.scrollTo(index);

  return (
    <>
      <div
        className="overflow-hidden pb-14 pt-4 px-5 rounded-[30px]"
        ref={emblaRef}
      >
        <div className="flex" style={{ direction: "rtl" }}>
          {items?.map((item: Category, index: number) => (
            <div
              key={item.id}
              className="px-2 rounded-[30px] cursor-pointer category-embla-slide"
              style={{
                flex: `0 0 ${100 / itemsPerSlide}%`,
                minWidth: 0,
              }}
              role="button"
              tabIndex={0}
              aria-label={`دسته‌بندی ${item.title}`}
              onClick={() => onItemClick && onItemClick(item, index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onItemClick && onItemClick(item, index);
                }
              }}
            >
              <div className="py-3 shadow-b-lg min-h-[280px] h-[280px] relative rounded-[30px] text-center flex flex-col items-center justify-between bg-no-repeat bg-[#18181c] dark:bg-[#18181c] bg-gradient-to-r from-amber-500 to-amber-700 dark:bg-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                <Image
                  width={200}
                  height={200}
                  src={item.imageUrl}
                  alt={item?.title || "محصول"}
                  className="mx-auto mb-7 w-[50%] max-h-[190px] object-contain"
                  loading="lazy"
                />
                <p className="relative z-[2] font-bold text-2xl truncate text-[#282525] dark:text-amber-100 mb-0">
                  {item?.title || "بدون عنوان"}
                </p>
                <WaveBackground className="absolute bottom-[-1px] left-1/2 w-52 sm:w-[23.281vw] -translate-x-1/2 mix-blend-screen" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {scrollSnaps.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
              selectedIndex === idx
                ? "bg-amber-500 w-6"
                : "bg-neutral-300 dark:bg-neutral-300"
            }`}
            onClick={() => scrollTo(idx)}
            aria-label={`رفتن به اسلاید ${idx + 1}`}
            type="button"
          />
        ))}
      </div>
    </>
  );
};

export default CategorySectionClient;
