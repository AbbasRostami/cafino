"use client";
import { MotionDiv } from "@/utils/MotionWrapper";
import { Package } from "lucide-react";

export const OrdersHeader = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
        <Package size={32} className="text-amber-500" />
        تاریخچه سفارشات شما
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        در این بخش می‌توانید تمام سفارش‌های گذشته‌ی خود را مشاهده و مدیریت کنید.
        امکان مشاهده جزئیات و ثبت مجدد سفارش نیز فراهم است.
      </p>
    </MotionDiv>
  );
};
