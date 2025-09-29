import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProfileOverview } from "@/types/Profile";
import { ShoppingBag, Heart, MapPin, ShoppingCart } from "lucide-react";

export const StatsCards = ({ data }: { data: ProfileOverview | undefined }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card className="border-0 border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              سفارش‌های فعال
            </CardTitle>
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
              <ShoppingBag size={20} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="">
          <div data-testid="total-orders" className="text-2xl font-bold text-gray-900 dark:text-white">
            {data?.order?.active}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            در حال پردازش
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              مجموع سفارش‌ها
            </CardTitle>
            <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
              <ShoppingCart size={20} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div data-testid="total-spent" className="text-2xl font-bold text-gray-900 dark:text-white">
            {data?.order?.total}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            تمام سفارشات ارسال شده
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 border-l-4 border-l-rose-500 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              علاقه‌مندی‌ها
            </CardTitle>
            <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400">
              <Heart size={20} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div data-testid="favorite-items" className="text-2xl font-bold text-gray-900 dark:text-white">
            {data?.favorite?.total}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            محصول مورد علاقه
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              آدرس‌ها
            </CardTitle>
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <MapPin size={20} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {data?.address?.total}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            آدرس ذخیره شده
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
