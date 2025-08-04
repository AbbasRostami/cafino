"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
  User,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUserProfile } from "@/services/update";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const navItems = [
  {
    href: "/profile/overview",
    icon: <LayoutDashboard size={20} />,
    label: "داشبورد",
  },
  {
    href: "/profile/orders",
    icon: <ShoppingBag size={20} />,
    label: "سفارش‌ها",
  },
  {
    href: "/profile/favorites",
    icon: <Heart size={20} />,
    label: "علاقه‌مندی‌ها",
  },
  {
    href: "/profile/addresses",
    icon: <MapPin size={20} />,
    label: "آدرس‌ها",
  },
  {
    href: "/profile/settings",
    icon: <Settings size={20} />,
    label: "پروفایل",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: user } = useUserProfile();
  return (
    <>
      {/* دسکتاپ */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden md:block w-full md:w-64 flex-shrink-0 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-xl h-fit sticky top-24 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 overflow-hidden"
        style={{
          boxShadow:
            "0 10px 30px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)",
        }}
      >
        {/* Header with decorative elements */}
        <div className="relative p-5 flex flex-col items-center gap-4 border-b border-gray-200 dark:border-gray-800">
          {/* Decorative top bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>

          {/* Floating elements */}
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-amber-400"></div>
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-400"></div>

          {/* User avatar with elegant frame */}
          <div className="relative">
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 p-1">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                <User
                  size={32}
                  className="text-amber-600 dark:text-amber-400"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <motion.h3
              className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-1"
              whileHover={{ scale: 1.05 }}
            >
              {user?.first_name} {user?.last_name}
            </motion.h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              عضویت: {moment(user?.created_at).format("jYYYY/jMM/jDD")}
            </p>
          </div>
        </div>

        {/* Navigation items with elegant styling */}
        <nav className="p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 p-2 rounded-xl mb-2 transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-amber-50/80 to-orange-50/80 dark:from-amber-900/30 dark:to-orange-900/20 text-amber-700 dark:text-amber-300 shadow-inner"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/50"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 to-orange-500 rounded-l-lg"
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div
                  className={`p-2 rounded-lg ${
                    isActive
                      ? "bg-gradient-to-br from-amber-400/20 to-orange-400/20 dark:from-amber-700/30 dark:to-orange-700/20"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {item.icon}
                </div>

                <span className="font-medium">{item.label}</span>

                {/* Animated chevron for active item */}
                {isActive && (
                  <motion.div
                    className="ml-auto"
                    animate={{ x: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ChevronLeft size={16} className="text-amber-500" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Decorative separator */}
        <div className="relative px-5 py-2 flex justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative bg-white dark:bg-gray-900 px-3 text-xs text-gray-500 dark:text-gray-400">
            حساب کاربری
          </div>
        </div>

        {/* Logout button with elegant styling */}
        <div className="p-3">
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 15px rgba(239, 68, 68, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 p-3 text-gray-700 dark:text-gray-200 rounded-xl bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500 transition-all relative overflow-hidden"
          >
            {/* Animated background on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-50/0 to-red-50/0"
              whileHover={{
                background:
                  "linear-gradient(to right, rgba(254, 226, 226, 0), rgba(254, 226, 226, 0.5))",
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Main content */}
            <div className="relative z-10 flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-red-100 dark:bg-red-900/30">
                <LogOut size={16} className="text-red-500 dark:text-red-400" />
              </div>
              <span className="font-medium">خروج از حساب</span>
            </div>
          </motion.button>
        </div>
      </motion.aside>

      {/* موبایل */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="md:hidden w-full px-4 py-3 bg-gradient-to-t from-white/95 to-white/80 dark:from-gray-900/95 dark:to-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 flex justify-around gap-1 fixed bottom-0 left-0 right-0 z-50 shadow-2xl"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-16 h-14 rounded-xl"
            >
              <div className="z-10 flex flex-col items-center">
                <motion.div
                  className={`p-1.5 rounded-full ${
                    isActive
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  animate={{
                    rotate: isActive ? [0, 10, -10, 0] : 0,
                    scale: isActive ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>

                <motion.span
                  className={`text-xs mt-0.5 font-medium ${
                    isActive
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  animate={{
                    y: isActive ? [0, -2, 0] : 0,
                    scale: isActive ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              </div>

              {/* نشانگر متحرک بالای آیتم فعال */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute top-0 w-10 h-1 bg-amber-500 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </motion.nav>
    </>
  );
}
