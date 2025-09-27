"use client";

import { MotionDiv } from "@/utils/MotionWrapper";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Plus,
  Sparkles,
  Heart,
  Star,
  Zap,
  Shield,
  Users,
} from "lucide-react";

interface EmptyStateProps {
  onAction?: () => void;
  actionText?: string;
}

export function TicketsEmptyState({
  onAction,
  actionText = "بازگشت به لیست تیکت ها",
}: EmptyStateProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center py-16 px-6"
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full blur-3xl scale-150 animate-pulse" />
        <div className="relative w-32 h-32 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 dark:from-amber-900/30 dark:via-orange-900/30 dark:to-amber-800/30 rounded-full flex items-center justify-center shadow-2xl">
          <div className="absolute inset-4 bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-700 dark:to-orange-600 rounded-full flex items-center justify-center">
            <MessageSquare
              size={48}
              className="text-amber-700 dark:text-amber-300 drop-shadow-lg"
            />
          </div>
          <Sparkles
            className="absolute -top-2 -right-2 text-amber-500 animate-bounce"
            size={20}
          />
          <Heart
            className="absolute -bottom-2 -left-2 text-orange-500 animate-pulse"
            size={16}
          />
        </div>
      </div>

      <div className="max-w-md space-y-4">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          هنوز تیکتی ایجاد نکرده‌اید
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          برای دریافت پشتیبانی حرفه‌ای و پاسخ سریع به سوالات خود، تیکت جدید
          ایجاد کنید و از خدمات ما بهره‌مند شوید
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Shield size={16} className="text-green-500" />
            <span>پشتیبانی ۲۴/۷</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Zap size={16} className="text-yellow-500" />
            <span>پاسخ سریع</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Users size={16} className="text-blue-500" />
            <span>تیم متخصص</span>
          </div>
        </div>
      </div>

      {onAction && (
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8"
        >
          <Button
            onClick={onAction}
            className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Plus
              size={20}
              className="mr-2 group-hover:rotate-90 transition-transform duration-300"
            />
            {actionText}
            <Star className="ml-2 group-hover:animate-spin" size={16} />
          </Button>
        </MotionDiv>
      )}
    </MotionDiv>
  );
}

export function NoTicketsFoundState({
  onAction,
  actionText = "بازگشت به لیست تیکت ها",
}: EmptyStateProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center py-16 px-6"
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-slate-500/20 rounded-full blur-3xl scale-150 animate-pulse" />
        <div className="relative w-28 h-28 bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200 dark:from-gray-800/30 dark:via-slate-800/30 dark:to-gray-700/30 rounded-full flex items-center justify-center shadow-2xl">
          <div className="absolute inset-4 bg-gradient-to-br from-gray-200 to-slate-300 dark:from-gray-600 dark:to-slate-500 rounded-full flex items-center justify-center">
            <MessageSquare
              size={40}
              className="text-gray-600 dark:text-gray-400 drop-shadow-lg"
            />
          </div>
          <Sparkles
            className="absolute -top-2 -right-2 text-gray-500 animate-bounce"
            size={18}
          />
        </div>
      </div>

      <div className="max-w-md space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          هیچ تیکتی یافت نشد
        </h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
          با فیلترهای انتخابی شما هیچ تیکتی پیدا نشد. می‌توانید فیلترها را تغییر
          دهید یا تیکت جدید ایجاد کنید
        </p>
      </div>

      {onAction && (
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6"
        >
          <Button
            onClick={onAction}
            className="group relative overflow-hidden bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Plus
              size={18}
              className="mr-2 group-hover:rotate-90 transition-transform duration-300"
            />
            {actionText}
          </Button>
        </MotionDiv>
      )}
    </MotionDiv>
  );
}
