"use client";
import { Search, Coffee, Pizza, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const EmptyState = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-400 opacity-20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-orange-400 opacity-20 rounded-full blur-xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
            <Search className="w-12 h-12 text-white" />
          </div>

          <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <Pizza className="w-4 h-4 text-white" />
          </div>
          <div
            className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            <Coffee className="w-4 h-4 text-white" />
          </div>
          <div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            <Cake className="w-4 h-4 text-white" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          محصولی یافت نشد!
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          متأسفانه هیچ محصولی با فیلترهای انتخابی شما پیدا نشد. می‌توانید
          فیلترها را تغییر دهید یا از منوی کامل ما دیدن کنید.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => router.push("/menu")}
            className="border-2 border-amber-400 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-6 py-3 rounded-xl transition-all duration-300"
          >
            پاک کردن فیلترها
          </Button>
        </div>

        <div className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800">
          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
            💡 نکات جستجو:
          </h4>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 text-right">
            <li>• کلمات کلیدی ساده‌تر را امتحان کنید</li>
            <li>• فیلترهای قیمت را تنظیم کنید</li>
            <li>• دسته‌بندی‌های مختلف را بررسی کنید</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
