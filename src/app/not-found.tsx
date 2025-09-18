"use client";
import { MotionButton, MotionDiv } from "@/utils/MotionWrapper";
import {
  Coffee,
  Home,
  ArrowLeft,
  Sparkles,
  Star,
  Coffee as CoffeeIcon,
} from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-amber-800 to-orange-700 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="max-w-6xl w-full text-center relative z-10">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="mb-5 flex justify-center"
        >
          <div className="relative">
            <MotionDiv
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative"
            >
              <div className="w-40 h-40 bg-gradient-to-br from-amber-800 to-orange-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-amber-600/30">
                <Coffee className="h-20 w-20 text-amber-200" />
              </div>

              <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-10 h-16 border-r-4 border-t-4 border-b-4 border-amber-600/30 rounded-r-full" />
            </MotionDiv>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 "
        >
          <h1 className="text-9xl md:text-[12rem] font-black tracking-tighter bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
            404
          </h1>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-amber-100 mb-6 tracking-wide">
            صفحه مورد نظر یافت نشد
          </h2>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10"
        >
          <Link href="/">
            <MotionButton
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full overflow-hidden shadow-2xl"
            >
              <div className="flex items-center gap-3 text-white font-medium text-sm md:text-lg">
                <Home className="h-5 w-5" />
                بازگشت به صفحه اصلی
                <MotionDiv
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </MotionDiv>
              </div>
            </MotionButton>
          </Link>

          <Link href="/menu">
            <MotionButton
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-lg border border-amber-400/30 rounded-full overflow-hidden shadow-xl"
            >
              <div className="relative flex items-center gap-3 text-amber-100 font-medium text-sm md:text-lg">
                <CoffeeIcon className="h-5 w-5" />
                مشاهده منوی کافینو
                <MotionDiv
                  animate={{ rotate: [0, 15, 0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="h-4 w-4" />
                </MotionDiv>
              </div>
            </MotionButton>
          </Link>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { href: "/menu", icon: Coffee, label: "منو" },
              { href: "/about-us", icon: Star, label: "درباره ما" },
              { href: "/contact-us", icon: Coffee, label: "تماس با ما" },
            ].map((item, index) => (
              <Link key={index} href={item.href}>
                <MotionDiv
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-full text-amber-200 hover:text-white transition-all duration-300"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </MotionDiv>
              </Link>
            ))}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
