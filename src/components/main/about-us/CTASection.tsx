"use client";

import { Calendar, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  MotionDiv,
  MotionH2,
  MotionP,
  MotionButton,
} from "@/utils/MotionWrapper";

export const CTASection: React.FC = () => {
  const router = useRouter();

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: false, margin: "-100px" }}
      className="text-center"
    >
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-14 shadow-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/15 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/15 rounded-full"></div>

        <div className="relative z-10">
          <MotionH2
            className="text-3xl md:text-4xl font-bold text-white mb-7"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: false }}
          >
            سفارش خود را انجام بدهید
          </MotionH2>

          <MotionP
            className="text-amber-100 mb-9 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: false }}
          >
            همین امروز به کافینو بیایید و تجربه‌ای متفاوت از طعم و محیط را داشته
            باشید
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: false }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/menu")}
              className="px-7 py-4 bg-white text-amber-700 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
            >
              سفارش آنلاین
              <Calendar className="h-5 w-5" />
            </MotionButton>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/contact-us")}
              className="px-7 py-4 border-2 border-white text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
            >
              تماس با ما
              <Phone className="h-5 w-5" />
            </MotionButton>
          </MotionDiv>
        </div>
      </div>
    </MotionDiv>
  );
};
