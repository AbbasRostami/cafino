import Link from "next/link";
import {
  PackageOpen,
  TrendingUp,
  ArrowRight,
  LayoutPanelLeft,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MotionLi } from "@/utils/MotionWrapper";
import { ItemOverview } from "@/types/admin";

export function ItemsMetrics({ data }: { data?: ItemOverview }) {
  return (
    <Card className="gap-2 bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden h-full md:h-[450px]">
      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="flex justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 shadow-md dark:from-amber-500 dark:to-amber-700">
                <LayoutPanelLeft size={20} />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-medium font-semibold text-gray-800 dark:text-white">
                  آمار کلی آیتم‌ها
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                  کالاهای پرفروش و رو به اتمام
                </CardDescription>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-800 dark:text-amber-200">
              مجموع: {data?.total}
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 grid md:grid-cols-2 gap-8 pt-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-sm">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              پرفروش‌ترین‌ها
            </h3>
          </div>

          <ul className="space-y-1.5">
            {data?.topSellingItems?.map((item, index) => (
              <MotionLi
                key={item?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={`/menu/${item?.id}`}
                  className="group flex justify-between items-center rounded-xl border border-gray-200 dark:border-gray-700 p-2.5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-600 dark:text-green-400 font-bold">
                      {index + 1}
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {item?.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {item?.totalSold}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      فروش
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </MotionLi>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 shadow-sm">
              <PackageOpen className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              آیتم های رو به اتمام
            </h3>
          </div>

          <ul className="space-y-1.5">
            {data?.lowStockItems.map((item, index) => (
              <MotionLi
                key={item?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={`/menu/${item?.id}`}
                  className="group flex justify-between items-center rounded-xl border border-gray-200 dark:border-gray-700 p-2.5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 dark:hover:from-rose-900/20 dark:hover:to-pink-900/20 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 text-rose-600 dark:text-rose-400 font-bold">
                      !
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      {item?.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                      {item?.quantity}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      عدد
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-rose-500 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </MotionLi>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
