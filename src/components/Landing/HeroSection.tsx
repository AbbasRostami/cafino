"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuthStore } from "@/store/authStore";
import {
  Coffee,
  Utensils,
  Star,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  Play,
} from "lucide-react";

const HeroSection = () => {
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-[#18181c] dark:via-[#23232a] dark:to-[#18181c] pt-32">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full filter blur-xl opacity-20 animate-pulse mix-blend-multiply dark:bg-amber-300 dark:bg-none dark:opacity-70 dark:mix-blend-normal"></div>
        <div className="absolute top-60 right-10 w-72 h-72 bg-gradient-to-r from-orange-400 to-red-400 rounded-full filter blur-xl opacity-20 animate-pulse delay-1000 mix-blend-multiply dark:bg-orange-300 dark:bg-none dark:opacity-60 dark:mix-blend-normal"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-red-400 to-pink-400 rounded-full filter blur-xl opacity-20 animate-pulse delay-2000 mix-blend-multiply dark:bg-amber-300 dark:bg-none dark:opacity-50 dark:mix-blend-normal"></div>

        {/* Floating coffee beans */}
        <div className="absolute top-32 left-1/4 w-4 h-4 bg-amber-600 rounded-full opacity-60 animate-bounce mix-blend-multiply dark:bg-white dark:opacity-90 dark:mix-blend-normal"></div>
        <div className="absolute top-64 right-1/3 w-3 h-3 bg-orange-600 rounded-full opacity-60 animate-bounce delay-500 mix-blend-multiply dark:bg-white dark:opacity-90 dark:mix-blend-normal"></div>
        <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-red-600 rounded-full opacity-60 animate-bounce delay-1000 mix-blend-multiply dark:bg-white dark:opacity-90 dark:mix-blend-normal"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="text-center lg:text-right space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 dark:bg-[#23232a] dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>بهترین کافه شهر</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent dark:from-yellow-400 dark:to-orange-300">
                  کـــافـینو
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-200">
                  تجربه‌ای متفاوت
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                با بهترین قهوه‌ها و غذاهای خانگی، لحظات شیرین را با ما تجربه
                کنید
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Coffee className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
                <span>قهوه تازه</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Utensils className="w-4 h-4 text-orange-600 dark:text-orange-300" />
                <span>غذای خانگی</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>۲۴/۷ باز</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {!isAuthenticated ? (
                <Dialog
                  open={openLoginDialog}
                  onOpenChange={setOpenLoginDialog}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className=" cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Coffee className="w-5 h-5 ml-2" />
                      سفارش آنلاین
                      <ArrowRight className="w-5 h-5 mr-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md p-0">
                    <LoginForm onSuccess={() => setOpenLoginDialog(false)} />
                  </DialogContent>
                </Dialog>
              ) : (
                <Button
                  size="lg"
                  className="cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Coffee className="w-5 h-5 ml-2" />
                  سفارش آنلاین
                  <ArrowRight className="w-5 h-5 mr-2" />
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 dark:border-gray-500 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                <Play className="w-5 h-5 ml-2" />
                تماشای ویدیو
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
                <span className="dark:text-gray-200">تهران، خیابان ولیعصر</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-600 dark:text-orange-300" />
                <span className="dark:text-gray-200">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative z-10">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-200 via-orange-200 to-red-200 dark:from-[#23232a] dark:via-[#18181c] dark:to-[#23232a]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/80 dark:text-white">
                    <Coffee className="w-24 h-24 mx-auto mb-4 opacity-60 text-black dark:text-white" />
                    <div className="text-2xl font-bold text-black dark:text-white">
                      کـــافیـنـو
                    </div>
                    <div className="text-lg text-black dark:text-gray-200">
                      تجربه‌ای متفاوت
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    قهوه تازه
                  </span>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    هر روز
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    غذای خانگی
                  </span>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    طعم اصیل
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-8 left-8 bg-white dark:bg-[#23232a] rounded-full p-3 shadow-xl border border-gray-100 dark:border-[#23232a]">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400 dark:fill-yellow-400 dark:text-yellow-400"
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-900 dark:text-white">
                  ۴.۸
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
