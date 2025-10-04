"use client";
import { MotionDiv } from "@/utils/MotionWrapper";
import { Wifi, WifiOff, RefreshCw, Sparkles, Home } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-amber-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <MotionDiv
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          >
            <div className="w-2 h-2 bg-white/10 rounded-full" />
          </MotionDiv>
        ))}
      </div>

      <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-slate-700/50 shadow-2xl">
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-lg opacity-50 animate-pulse" />
            <div className="relative bg-slate-900 p-4 rounded-2xl border border-slate-700/50">
              <WifiOff className="w-12 h-12 text-amber-400" />
            </div>
            <Sparkles
              className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-3">
            اتصال قطع شد
          </h1>

          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Wifi className="w-5 h-5" />
            <span className="text-sm font-medium">حالت آفلاین</span>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-slate-300 text-center leading-relaxed text-lg">
            ارتباط با سرور برقرار نیست. لطفاً اتصال اینترنت خود را بررسی کرده و
            مجدداً تلاش کنید.
          </p>

          <div className="grid grid-cols-1 gap-3 bg-slate-900/50 rounded-2xl p-4 border border-slate-700/30">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-700/30 transition-all duration-300">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
              </div>
              <span className="text-slate-300 text-sm">
                منو و محصولات در دسترس
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-700/30 transition-all duration-300">
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
              </div>
              <span className="text-slate-300 text-sm">تجربه آفلاین بهینه</span>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full group relative bg-gradient-to-r from-zinc-600 to-zinc-600 hover:from-zinc-500 hover:to-zinc-500 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-zinc-500/25 border border-zinc-400/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3">
              <Home className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>صفحه اصلی</span>
            </div>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full group relative bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/25 border border-amber-400/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3">
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>تلاش مجدد</span>
            </div>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            کافینو • تجربه‌ای فراموش‌نشدنی
          </p>
        </div>
      </div>
    </div>
  );
}
