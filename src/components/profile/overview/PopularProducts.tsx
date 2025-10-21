import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, EyeOff, Heart, Star } from "lucide-react";
import Link from "next/link";
import { AddToCartButtonStyled } from "@/components/ui/AddToCartButtonStyled";
import { FavoriteItem } from "@/types/Profile";
import { MotionDiv } from "@/utils/MotionWrapper";
import { formatCurrency } from "@/utils/formatters";
import Image from "next/image";

export const PopularProducts = ({
  favoritesData,
}: {
  favoritesData: FavoriteItem[];
}) => {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-2xl border-none">
      {favoritesData?.length ? (
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-xl font-bold text-gray-800 dark:text-white">
            <Star size={18} />
            محبوب‌ترین محصولات
          </CardTitle>
        </CardHeader>
      ) : null}
      <CardContent className="space-y-4 min-h-[100px]">
        {favoritesData?.length > 0 ? (
          favoritesData?.slice(0, 3).map((fav: FavoriteItem) => (
            <div
              key={fav?.item?.id}
              data-testid="favorite-item"
              className="!min-h-[110px] group flex gap-3 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="w-20 !h-[120px] bg-gray-50 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
                <Image
                  src={fav?.item?.images?.[0]?.imageUrl || ""}
                  alt={fav?.item?.title}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between min-w-0 p-3">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-semibold group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-all duration-300 text-gray-800 dark:text-white text-sm sm:text-base truncate flex-1">
                    {fav?.item?.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                    <Star size={12} className="fill-current" />
                    <span>{fav?.item?.rate || "5"}</span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 font-normal text-sm">
                    <span className="text-red-600 dark:text-red-400 font-semibold text-base">
                      {formatCurrency(fav?.item?.price)}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 font-normal text-sm">
                      تومان
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {fav?.isAvailable ? (
                      <AddToCartButtonStyled itemId={fav?.item?.id} />
                    ) : (
                      <Button
                        className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg flex items-center justify-center gap-1 px-3 py-1.5"
                        disabled
                        variant="outline"
                        size="sm"
                      >
                        <EyeOff size={14} />
                        <span className="font-medium text-xs">موجود نیست</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <div className="relative mb-5">
              <Heart
                className="w-16 h-16 text-rose-400/20 dark:text-rose-600/20"
                strokeWidth={1}
              />
              <Heart
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-rose-500/40 dark:text-rose-400/40"
                fill="currentColor"
              />
            </div>

            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
              لیست علاقه‌مندی‌های شما خالی است
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm max-w-xs mb-4">
              محصولاتی که دوست دارید را با کلیک روی قلب ذخیره کنید
            </p>

            <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-rose-600 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-full px-6 shadow-sm"
                asChild
              >
                <Link href="/menu">
                  جستجوی محصولات
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Link>
              </Button>
            </MotionDiv>
          </MotionDiv>
        )}
      </CardContent>
      {favoritesData?.length > 0 && (
        <CardFooter>
          <Button
            variant="outline"
            className="w-full text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-sm sm:text-base"
            asChild
          >
            <Link href="/profile/favorites">مشاهده همه علاقه‌مندی‌ها</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
