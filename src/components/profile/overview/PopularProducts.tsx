import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";
import { AddToCartButtonStyled } from "@/lib/AddToCartButtonStyled";
import { FavoriteItem, FavoriteListResponse } from "@/types/Profile";

export const PopularProducts = ({
  favoritesData,
}: {
  favoritesData: FavoriteListResponse;
}) => {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-2xl border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-sm sm:text-xl font-bold text-gray-800 dark:text-white">
          <Star size={18} />
          محبوب‌ترین محصولات
        </CardTitle>
        <Badge
          variant="outline"
          className="text-xs border-rose-300 text-rose-600 dark:text-rose-400"
        >
          {favoritesData?.data?.length} مورد
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4 min-h-[100px]">
        {favoritesData?.data?.length > 0 ? (
          favoritesData?.data?.slice(0, 3).map((fav: FavoriteItem) => (
            <div
              key={fav?.item?.id}
              className=" min-h-[100px] flex flex-col sm:flex-row items-center gap-4 py-2 px-4 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex-1 flex flex-col gap-1">
                <div className="font-medium text-gray-800 dark:text-white text-md sm:text-base truncate max-w-[200px]">
                  {fav?.item?.title}
                </div>
                <div className="text-rose-600 dark:text-rose-400 font-medium text-md sm:text-base">
                  {fav?.item?.price?.toLocaleString("fa-IR")} تومان
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  امتیاز: {fav?.item?.rate || "N/A"} (
                  {fav?.item?.rate_count || 0} نظر)
                </div>
              </div>
              <div className="flex items-center gap-2 ">
                <AddToCartButtonStyled itemId={fav?.item?.id} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            محصولی در علاقه‌مندی‌ها وجود ندارد
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-sm sm:text-base"
          asChild
        >
          <Link href="/profile/favorites">مشاهده همه علاقه‌مندی‌ها</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
