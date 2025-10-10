import { Button } from "@/components/ui/button";
import { ShieldX, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-rose-200/40 to-orange-200/30 dark:from-rose-900/10 dark:to-orange-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-amber-200/30 to-yellow-200/20 dark:from-amber-900/10 dark:to-yellow-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-slate-200/20 to-gray-200/10 dark:from-slate-800/10 dark:to-gray-800/10 rounded-full blur-2xl"></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-rose-400/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-lg w-full mx-4 text-center relative z-10">
        <div className="mb-12">
          <div className="relative mx-auto w-32 h-32 bg-gradient-to-br from-rose-400 via-rose-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-rose-500/30 dark:shadow-rose-900/40 transform transition-transform duration-700 hover:rotate-12">
            <div className="absolute -inset-4 bg-gradient-to-br from-rose-400/20 to-orange-400/20 rounded-3xl blur-xl"></div>
            <ShieldX className="w-24 h-24 text-white drop-shadow-lg" />
          </div>
        </div>

        <div className="mb-10">
          <div className="relative inline-block mb-6">
            <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-orange-500 dark:from-rose-400 dark:via-rose-300 dark:to-orange-400 tracking-tighter">
              403
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full"></div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text">
            متأسفانه دسترسی شما به این صفحه محدود شده است.
          </h2>

          <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg font-light max-w-md mx-auto">
            لطفاً بررسی کنید که وارد حساب کاربری درستی شده‌اید یا با پشتیبانی
            تماس بگیرید.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <Link href="/" className="w-full sm:flex-1">
            <Button className="w-full h-14 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white shadow-2xl shadow-rose-500/30 hover:shadow-rose-500/40 transition-all duration-500 rounded-2xl font-semibold group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Home className="w-5 h-5 ml-3 transition-transform group-hover:scale-110 group-hover:-translate-y-0.5" />
              بازگشت به صفحه اصلی
            </Button>
          </Link>

          <Link href="/menu" className="w-full sm:flex-1">
            <Button
              variant="outline"
              className="w-full h-14 border-2 border-gray-300/80 dark:border-gray-600/50 hover:border-rose-300 dark:hover:border-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 text-gray-700 dark:text-gray-300 transition-all duration-500 rounded-2xl font-medium group backdrop-blur-sm bg-white/50 dark:bg-gray-900/50"
            >
              <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
              مشاهده منو
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
