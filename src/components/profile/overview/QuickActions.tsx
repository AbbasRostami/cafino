import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, MapPin, Coffee, Clock, Star, Gift } from "lucide-react";
import Link from "next/link";

export const QuickActions = () => {
  return (
    <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl rounded-3xl border-none p-2 mb-18 sm:p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.1)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
          اقدامات سریع
        </CardTitle>
      </CardHeader>
      <CardContent className="!px-1">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Button
            variant="outline"
            size="sm"
            className="group relative overflow-hidden bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-full text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium transition-all duration-300"
            asChild
          >
            <Link
              href="/profile/settings"
              className="flex items-center !justify-start lg:!justify-center gap-1"
            >
              <User
                size={14}
                className=" group-hover:scale-110 transition-transform"
              />
              ویرایش پروفایل
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="group relative overflow-hidden bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-full text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium transition-all duration-300"
            asChild
          >
            <Link
              href="/profile/addresses"
              className="flex items-center !justify-start lg:!justify-center gap-1"
            >
              <MapPin
                size={14}
                className=" group-hover:scale-110 transition-transform"
              />
              مدیریت آدرس‌ها
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="group relative overflow-hidden bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-full text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium transition-all duration-300"
            asChild
          >
            <Link
              href="/menu"
              className="flex items-center !justify-start lg:!justify-center gap-1"
            >
              <Coffee
                size={14}
                className="group-hover:scale-110 transition-transform"
              />
              سفارش جدید
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="group relative overflow-hidden bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-full text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium transition-all duration-300"
            asChild
          >
            <Link
              href="/profile/orders"
              className="flex items-center !justify-start lg:!justify-center gap-1"
            >
              <Clock
                size={14}
                className="group-hover:scale-110 transition-transform"
              />
              سفارشات
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="group relative overflow-hidden bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-full text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium transition-all duration-300"
            asChild
          >
            <Link
              href="/profile/favorites"
              className="flex items-center !justify-start lg:!justify-center gap-1"
            >
              <Star
                size={14}
                className="group-hover:scale-110 transition-transform"
              />
              موارد دلخواه
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="group relative overflow-hidden bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-full text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium transition-all duration-300"
            asChild
          >
            <Link
              href="/profile/tickets"
              className="flex items-center !justify-start lg:!justify-center gap-1"
            >
              <Gift
                size={14}
                className="group-hover:scale-110 transition-transform"
              />
              تیکت ها
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
