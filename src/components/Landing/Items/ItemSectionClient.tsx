"use client";
import React from "react";
import { Star, ChevronLeft } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { FavoriteToggleButton } from "@/lib/FavoriteToggleButton";
import { AddToCartButtonStyled } from "@/lib/AddToCartButtonStyled";
import { Item } from "@/types/main/Landing/itemsSection/itemsSection";
import { SkeletonItemSection } from "@/components/skeleton/main/Landing/ItemSectionSkeleton";
import { CartItem } from "@/store/cartStore";

interface ItemSectionClientProps {
  items: Item[];
  isLoading: boolean;
}

const ItemSectionClient: React.FC<ItemSectionClientProps> = ({
  items,
  isLoading,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    direction: "rtl",
  });

  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
    <section className="container mx-auto px-2 py-12 pb-16" dir="rtl">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
          <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent dark:from-amber-400 dark:to-orange-500 relative z-10">
            منوی محبوب
          </span>
          <span className="absolute -top-3 -right-4 text-amber-400 dark:text-amber-500 text-9xl opacity-20">
            ✨
          </span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          بهترین انتخاب‌های ما از میان صدها غذای خوشمزه
        </p>
      </div>
      <div
        className="overflow-hidden pb-8 pt-2 px-2 rounded-2xl"
        ref={emblaRef}
      >
        <div className="flex gap-6 flex-nowrap" style={{ direction: "rtl" }}>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonItemSection key={index} />
              ))
            : items?.map((item: Item) => {
                const discount = Number(item?.discount || 0);
                const originalPrice = Number(item?.price);
                const finalPrice = discount
                  ? originalPrice - (originalPrice * discount) / 100
                  : originalPrice;
                const isFavorite = item?.isFav;
                const isOutOfStock = item?.quantity === 0;
                const isLowStock = item?.quantity > 0 && item?.quantity < 3;
                const isMediumStock = item?.quantity >= 3 && item?.quantity < 6;

                // تبدیل item به CartItem برای مهمان‌ها
                const itemData: CartItem = {
                  itemId: item.id,
                  title: item.title,
                  description: item.description,
                  count: 0, // این مقدار در store تنظیم می‌شود
                  images: item.images.map((img) => img.imageUrl), // تبدیل به آرایه string
                  price: originalPrice.toString(),
                  discount: discount.toString(),
                  finalPrice: finalPrice,
                  category: {
                    title: item.category?.title || "",
                  },
                  quantity: item.quantity,
                };

                return (
                  <div
                    key={item?.id}
                    className="group bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hitemIdden transition-all duration-500 hover:shadow-2xl relative border border-transparent hover:border-amber-400 dark:hover:border-amber-600 min-w-[70vw] sm:min-w-[48vw] md:min-w-[32vw] lg:min-w-[25%] xl:min-w-[25%] max-w-[320px] w-full"
                  >
                    <div className="relative rounded-t-2xl aspect-[4/3] w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />

                      {/* تصویر محصول */}
                      <Image
                        src={item?.images[0]?.imageUrl || "/images/default.png"}
                        alt={item?.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110 "
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <FavoriteToggleButton
                        itemId={item?.id}
                        isFavorite={isFavorite}
                        iconSize={34}
                        className={`absolute top-4 left-4 z-10 p-2 rounded-full cursor-pointer shadow-md transition-all duration-300 hover:scale-110 ${
                          isFavorite
                            ? "text-amber-500 border-amber-500 fill-current"
                            : "text-white border-white"
                        }`}
                      />

                      {/* برچسب تخفیف */}
                      {discount > 0 && (
                        <div className="absolute top-4 right-4 bg-gradient-to-tr from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                          {Math.round(discount)}% تخفیف
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
                            {item?.title}
                          </h3>
                          <span className="text-xs text-amber-600 dark:text-amber-400 mt-1 block">
                            {item?.category?.title}
                          </span>
                        </div>

                        {/* امتیاز */}
                        <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                          <Star className="text-yellow-400 fill-current" />
                          <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
                            {item?.rate.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm truncate line-clamp-2 text-justify">
                        {item?.description}
                      </p>

                      {/* مواد تشکیل دهنده */}
                      <div className="flex flex-wrap gap-1">
                        {item?.ingredients
                          .slice(0, 2)
                          .map((ingredient: any, index: number) => (
                            <span
                              key={index}
                              className="text-xs bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full"
                            >
                              {ingredient}
                            </span>
                          ))}
                      </div>

                      {/* موجودی */}
                      <div className="mt-2">
                        <div className="relative flex items-center">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500 dark:text-gray-400">
                                تعداد موجود
                              </span>
                              <span
                                className={`font-bold ${
                                  isOutOfStock
                                    ? "text-red-500"
                                    : isLowStock
                                    ? "text-amber-500"
                                    : isMediumStock
                                    ? "text-yellow-500"
                                    : "text-green-500"
                                }`}
                              >
                                {item?.quantity} عدد
                              </span>
                            </div>

                            <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`absolute top-0 left-0 h-2 rounded-full ${
                                  isOutOfStock
                                    ? "bg-red-300"
                                    : isLowStock
                                    ? "bg-gradient-to-r from-amber-400 to-amber-600"
                                    : isMediumStock
                                    ? "bg-gradient-to-r from-yellow-400 to-amber-400"
                                    : "bg-gradient-to-r from-green-400 to-teal-400"
                                }`}
                                style={{
                                  width: isOutOfStock
                                    ? "0%"
                                    : `${Math.min(100, item?.quantity * 10)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* پیام وضعیت موجودی */}
                        <div
                          className={`mt-2 text-xs px-3 py-1.5 rounded-full text-center ${
                            isOutOfStock
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                              : isLowStock
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                              : isMediumStock
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          }`}
                        >
                          {isOutOfStock ? (
                            <span>این محصول فعلاً موجود نیست.</span>
                          ) : isLowStock ? (
                            <span>فقط {item?.quantity} عدد باقی مانده! </span>
                          ) : isMediumStock ? (
                            <span>موجودی محدود! فقط {item?.quantity} عدد</span>
                          ) : (
                            <span>موجودی کافی! {item?.quantity} عدد آماده</span>
                          )}
                        </div>
                      </div>

                      {/* قیمت و دکمه‌ها */}
                      <div className="mt-4 flex flex-col  justify-between items-center gap-2">
                        <div className="flex sm:flex-col xl:flex-row items-center justify-between gap-3 md:gap-1 min-h-[44px]">
                          <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                            {finalPrice?.toLocaleString()} تومان
                          </span>

                          <span
                            className={`text-sm line-through text-gray-400 ${
                              discount === 0 ? "invisible" : ""
                            }`}
                          >
                            {originalPrice?.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-end">
                          <AddToCartButtonStyled
                            itemId={item?.id}
                            itemData={itemData}
                            disabled={item?.quantity === 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="flex justify-center gap-2 mt-10  ">
          {scrollSnaps?.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
                idx === selectedIndex
                  ? "bg-amber-500 w-6"
                  : "bg-neutral-300 dark:bg-neutral-400"
              }`}
              onClick={() => scrollTo && scrollTo(idx)}
              aria-label={`رفتن به اسلاید ${idx + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
      <Link href="/menu" className="text-center mt-10">
        <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white cursor-pointer px-6 py-3 rounded-full font-medium flex items-center gap-2 mx-auto transition-all duration-300 group shadow-lg hover:shadow-amber-500/30">
          مشاهده همه محصولات
          <ChevronLeft
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </Link>
    </section>
  );
};

export default ItemSectionClient;
