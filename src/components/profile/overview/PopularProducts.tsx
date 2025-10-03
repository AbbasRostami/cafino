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
              className=" min-h-[100px] flex flex-col sm:flex-row items-center gap-4 py-2 px-4 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex-1 flex flex-col gap-1">
                <div className="font-medium text-gray-800 dark:text-white text-md sm:text-base truncate max-w-[200px]">
                  {fav?.item?.title}
                </div>
                <div className="text-rose-600 dark:text-rose-400 font-medium text-md sm:text-base">
                  {formatCurrency(fav?.item?.price)} تومان
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  امتیاز: {fav?.item?.rate || "5"}
                </div>
              </div>
              <div className="flex items-center gap-2 ">
                {fav?.isAvailable ? (
                  <AddToCartButtonStyled itemId={fav?.item?.id} />
                ) : (
                  <Button
                    className="w-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg flex items-center justify-center gap-2"
                    disabled
                    variant="outline"
                  >
                    <EyeOff size={18} />
                    <span className="font-medium text-sm">موجود نیست</span>
                  </Button>
                )}
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
