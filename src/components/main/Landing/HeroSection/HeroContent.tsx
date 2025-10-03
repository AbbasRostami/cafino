"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Coffee,
  Utensils,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  MotionDiv,
  MotionH1,
  MotionP,
  MotionSpan,
} from "@/utils/MotionWrapper";
import VideoButton from "./VideoButton";

const HeroContent = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const features = [
    {
      icon: Coffee,
      text: "قهوه تازه",
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Utensils,
      text: "غذای خانگی",
      color: "text-orange-600 dark:text-orange-300",
    },
    {
      icon: Clock,
      text: "۲۴/۷ باز",
      color: "text-red-600 dark:text-red-400",
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: "تهران، خیابان ولیعصر",
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Phone,
      text: "۰۲۱-۱۲۳۴۵۶۷۸",
      color: "text-orange-600 dark:text-orange-300",
    },
  ];

  return (
    <div className="text-center lg:text-right space-y-8">
      <MotionDiv
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <MotionH1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MotionSpan
            data-testid="hero-title"
            className="text-amber-600 dark:text-amber-400 font-bold relative z-10"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            کـــافـینو
          </MotionSpan>
          <br />
          <MotionSpan
            className="text-gray-800 dark:text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            تجربه‌ای متفاوت
          </MotionSpan>
        </MotionH1>

        <MotionP
          data-testid="hero-description"
          className="text-lg sm:text-xl font-bold text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          با بهترین قهوه‌ها و غذاهای خانگی، لحظات شیرین را با ما تجربه کنید
        </MotionP>
      </MotionDiv>

      <MotionDiv
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        {features.map((item, index) => (
          <MotionDiv
            key={index}
            data-testid="feature-item"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <item.icon className={`w-4 h-4 ${item.color}`} />
            <span className="font-bold">{item.text}</span>
          </MotionDiv>
        ))}
      </MotionDiv>

      <MotionDiv
        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            data-testid="order-online-button"
            onClick={() => router.push("/menu")}
            size="lg"
            className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <MotionDiv
              className="absolute inset-0 bg-gradient-to-r from-amber-400 to-transparent opacity-0 group-hover:opacity-100"
              animate={{ x: [-100, 200] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
            <Coffee className="w-5 h-5 ml-2" />
            سفارش آنلاین
            <ArrowRight className="w-5 h-5 mr-2" />
          </Button>
        </MotionDiv>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <VideoButton onClick={() => setOpen(true)} />
          </DialogTrigger>

          <DialogContent
            className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl 
    p-0 overflow-hidden bg-black rounded-xl border-2 border-amber-500/30"
          >
            <VisuallyHidden>
              <DialogTitle>ویدیو معرفی</DialogTitle>
              <DialogDescription>ویدیو معرفی</DialogDescription>
            </VisuallyHidden>

            {open && (
              <video
                controls
                autoPlay
                className="w-full aspect-video rounded-xl"
              >
                <source src="/videos/Teaser.mp4" type="video/mp4" />
                مرورگر شما از ویدیو پشتیبانی نمی‌کند.
              </video>
            )}
          </DialogContent>
        </Dialog>
      </MotionDiv>

      <MotionDiv
        className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-sm text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        {contactInfo?.map((item, index) => (
          <MotionDiv
            key={index}
            data-testid="contact-info"
            className="flex items-center gap-2 p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            whileHover={{ x: 5 }}
          >
            <item.icon className={`w-4 h-4 ${item?.color}`} />
            <span className="dark:text-gray-200 font-bold">{item?.text}</span>
          </MotionDiv>
        ))}
      </MotionDiv>
    </div>
  );
};

export default HeroContent;
