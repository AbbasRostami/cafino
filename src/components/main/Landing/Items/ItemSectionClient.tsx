"use client";
import { Star, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FavoriteToggleButton } from "@/components/ui/FavoriteToggleButton";
import { AddToCartButtonStyled } from "@/components/ui/AddToCartButtonStyled";
import {
  Item,
  ItemSectionClientProps,
} from "@/types/main/Landing/itemsSection";
import { CartItem } from "@/store/cartStore";
import { MotionDiv } from "@/utils/MotionWrapper";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";
import { formatCurrency, getStockStatus } from "@/utils/formatters";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { SkeletonItemSection } from "@/components/skeleton";
import { useGetItemsLanding } from "@/services/items/useGetItems";

const ItemSectionClient: React.FC<ItemSectionClientProps> = ({ items }) => {
  const { data: itemsResponse, isLoading } = useGetItemsLanding(
    1,
    15,
    "topRated",
    items
  );

  if (isLoading || !itemsResponse?.data?.items?.length) {
    return (
      <section className="container mx-auto px-2 py-12 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className="text-amber-600 dark:text-amber-400 relative z-10">
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
        <div className="overflow-hidden pt-2 px-2 rounded-2xl">
          <div className="flex gap-6 flex-nowrap">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 py-4 md:py-10">
                <SkeletonItemSection />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
          <span className="text-amber-600 dark:text-amber-400 relative z-10">
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

      <div className="overflow-hidden  pt-2 px-2 rounded-2xl">
        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          pagination={{
            clickable: true,
            el: ".items-slider-pagination",
          }}
          className="items-slider "
          style={{ direction: "rtl" }}
        >
          {itemsResponse?.data?.items?.map((item: Item, index: number) => {
            const discount = Number(item?.discount || 0);
            const originalPrice = Number(item?.price);
            const finalPrice = discount
              ? originalPrice - (originalPrice * discount) / 100
              : originalPrice;
            const isFavorite = item?.isFav;
            const stockStatus = getStockStatus(item?.quantity || 0);

            const itemData: CartItem = {
              itemId: item?.id,
              title: item?.title,
              description: item?.description,
              count: 0,
              images: item?.images?.map((img) => img?.imageUrl),
              price: originalPrice.toString(),
              discount: discount.toString(),
              finalPrice: finalPrice,
              category: {
                title: item?.category?.title || "",
              },
              quantity: item?.quantity,
            };
            return (
              <SwiperSlide className=" py-2 md:py-10 " key={item?.id}>
                <MotionDiv
                  className="group bg-white dark:bg-[#1a1a1a]  rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl relative border border-transparent hover:border-amber-400 dark:hover:border-amber-600 w-full max-w-[320px] mx-auto"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <div className="relative rounded-t-2xl aspect-[4/3] w-full overflow-hidden">
                    <div className="relative rounded-t-2xl aspect-[4/3] w-full overflow-hidden group">
                      <Swiper
                        modules={[Pagination, EffectFade]}
                        effect="fade"
                        speed={3000}
                        fadeEffect={{ crossFade: true }}
                        pagination={{
                          type: "fraction",
                          renderFraction: function (currentClass, totalClass) {
                            return `
                                <span class="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                  <span class="${currentClass}"></span> / <span class="${totalClass}"></span>
                                </span>
                              `;
                          },
                        }}
                        loop={item?.images?.length > 1}
                        className="h-full w-full"
                      >
                        {item?.images?.length > 0 ? (
                          item?.images?.map((img) => (
                            <SwiperSlide key={img?.id}>
                              <Image
                                src={img.imageUrl || "/images/default.png"}
                                alt={item?.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          <SwiperSlide>
                            <Image
                              src="/images/default.png"
                              alt={item?.title}
                              fill
                              className="object-cover"
                              sizes="100vw"
                            />
                          </SwiperSlide>
                        )}
                      </Swiper>
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

                      {discount > 0 && (
                        <div className="absolute top-4 right-4 bg-gradient-to-tr from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                          {Math?.round(discount)}% تخفیف
                        </div>
                      )}
                    </div>

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

                    {discount > 0 && (
                      <div className="absolute top-4 right-4 bg-gradient-to-tr from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                        {Math?.round(discount)}% تخفیف
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

                      <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                        <Star className="text-yellow-400 fill-current" />
                        <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
                          {item?.rate?.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 text-justify cursor-help min-h-[40px] max-h-[40px]">
                            {item?.description.length > 37
                              ? `${item?.description.slice(0, 37)}...`
                              : item?.description}
                          </p>
                        </TooltipTrigger>
                        {item?.description.length > 37 && (
                          <TooltipContent side="top" className="max-w-xs ">
                            <p className="text-sm">{item?.description}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>

                    <div className="flex flex-wrap items-center gap-1 mt-1 min-h-[50px] max-h-[50px]">
                      {item?.ingredients
                        ?.slice(0, 2)
                        .map((ingredient: string, index: number) => (
                          <span
                            key={index}
                            className="text-xs bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full"
                          >
                            {ingredient}
                          </span>
                        ))}
                      {item?.ingredients && item?.ingredients?.length > 2 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-xs bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full cursor-help">
                                +{item?.ingredients?.length - 2} بیشتر
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              <div className="space-y-2">
                                <div className="flex flex-wrap gap-1">
                                  {item?.ingredients?.map(
                                    (ingredient, index) => (
                                      <span
                                        key={index}
                                        className="text-xs rounded-full"
                                      >
                                        {ingredient + "،"}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>

                    <div className="mt-2">
                      <div className="relative flex items-center">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500 dark:text-gray-400">
                              تعداد موجود
                            </span>
                            <span
                              className={`font-bold ${
                                stockStatus?.isOutOfStock
                                  ? "text-red-500"
                                  : stockStatus?.isLowStock
                                  ? "text-amber-500"
                                  : stockStatus?.isMediumStock
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              }`}
                            >
                              {item?.quantity} عدد
                            </span>
                          </div>

                          <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`absolute top-0 left-0 h-2 rounded-full ${stockStatus.progressColor}`}
                              style={{
                                width: stockStatus?.progressWidth,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`mt-2 hidden sm:block text-xs px-3 py-1.5 rounded-full text-center ${stockStatus.stockColor}`}
                      >
                        <span>{stockStatus?.stockMessage}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-col  justify-between items-center gap-2">
                      <div className="flex sm:flex-col xl:flex-row items-center justify-between gap-3 md:gap-1 min-h-[44px]">
                        <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                          {formatCurrency(finalPrice)} تومان
                        </span>

                        <span
                          className={`text-sm line-through text-gray-400 ${
                            discount === 0 ? "invisible" : ""
                          }`}
                        >
                          {formatCurrency(originalPrice)} تومان
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
                </MotionDiv>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="items-slider-pagination mt-4 mb-6 cursor-pointer flex items-center justify-center gap-2"></div>
      <Link href="/menu" className="text-center mt-10">
        <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white cursor-pointer px-6 py-3 rounded-full font-medium flex items-center gap-2 mx-auto transition-all duration-300 group shadow-lg hover:shadow-amber-500/30">
          مشاهده همه محصولات
          <ChevronLeft
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </Link>
    </>
  );
};

export default ItemSectionClient;
