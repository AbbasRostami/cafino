"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Coffee,
  HeartPulse,
} from "lucide-react";
import Image from "next/image";
import CafeinLogoLight from "../../assets/Logo/1.webp";
import CafeinLogoDark from "../../assets/Logo/2.webp";
import { RiTelegram2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.pageYOffset > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-[#0a0a0a] dark:via-[#1a1a1a] dark:to-[#0a0a0a]">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 animate-pulse">
          <Coffee className="w-4 h-4 text-amber-500 opacity-40 rotate-12" />
        </div>
        <div className="absolute top-3/4 right-1/4 animate-pulse delay-1000">
          <Coffee className="w-3 h-3 text-amber-400 opacity-40 rotate-[-15deg]" />
        </div>
        <div className="absolute bottom-1/3 left-1/2 animate-pulse delay-500">
          <Coffee className="w-2 h-2 text-orange-400 opacity-40 rotate-20" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-pulse delay-700">
          <Coffee className="w-3 h-3 text-orange-300 opacity-30 rotate-[-10deg]" />
        </div>
        <div className="absolute bottom-1/4 left-3/4 animate-pulse delay-300">
          <Coffee className="w-2 h-2 text-amber-400 opacity-40 rotate-15" />
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      <div className="relative container mx-auto px-4 sm:px-12 pt-12 pb-5 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 pb-3 items-start">
          <div className="flex flex-col items-start h-full">
            <div className="relative group transition-all duration-500 hover:scale-[1.02] mb-6">
              <div className="absolute -inset-2  blur-md opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
              <Image
                src={CafeinLogoLight}
                alt="Cafino Logo Light"
                className="block dark:hidden object-contain relative z-10"
                width={300}
                height={300}
              />
              <Image
                src={CafeinLogoDark}
                alt="Cafino Logo Dark"
                className="hidden dark:block object-contain relative z-10"
                width={300}
                height={300}
              />
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-justify mb-6 max-w-xs">
              کافینو، برند متفاوت در دنیای کافه و رستوران. کیفیت، طعم و طراحی
              مدرن در یک تجربه‌ی خاص جمع شده‌اند.
            </p>
          </div>
          <div className="space-y-3 items-start h-full">
            <div className="relative pb-3 border-b border-amber-200 dark:border-amber-800/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white relative inline-block">
                ساعت های کاری
              </h3>
            </div>
            <div className="text-right space-y-5 text-gray-700 dark:text-gray-300 text-base font-medium leading-loose">
              <div className="flex justify-between">
                <span>دوشنبه</span>
                <span>۸:۰۰ عصر – ۵:۰۰ صبح</span>
              </div>
              <div className="flex justify-between">
                <span>سه شنبه</span>
                <span>۹:۰۰ صبح – ۶:۰۰ عصر</span>
              </div>
              <div className="flex justify-between">
                <span>چهارشنبه</span>
                <span>۱۰:۰۰ صبح – ۵:۰۰ عصر</span>
              </div>
              <div className="flex justify-between">
                <span>جمعه</span>
                <span>۹:۰۰ صبح – ۵:۰۰ عصر</span>
              </div>
              <div className="flex justify-between">
                <span>شنبه - یکشنبه</span>
                <span>بسته</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 items-start h-full">
            <div className="relative pb-3 border-b border-amber-200 dark:border-amber-800/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white relative inline-block">
                دسترسی سریع
              </h3>
            </div>
            <div className="space-y-2">
              {[
                { href: "#", text: "خانه", icon: "🏠" },
                { href: "/category", text: "دسته بندی", icon: "🍽️" },
                { href: "/menu", text: "منو", icon: "📝" },
                { href: "#", text: "درباره ما", icon: "ℹ️" },
                { href: "#", text: "تماس با ما", icon: "📞" },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="group flex items-center space-x-3 space-x-reverse text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 transition-all duration-300 p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/10"
                >
                  <span className="text-lg transition-all duration-300 transform group-hover:scale-125 group-hover:text-amber-500">
                    {link.icon}
                  </span>
                  <span className="relative text-base font-medium pb-1">
                    {link.text}
                    <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 group-hover:w-full transition-all duration-500"></div>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3 items-start h-full">
            <div className="relative pb-3 border-b border-amber-200 dark:border-amber-800/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white relative inline-block">
                خدمات ما
              </h3>
            </div>
            <div className="space-y-2">
              {[
                { href: "#", text: "قهوه‌های تخصصی", icon: "☕" },
                { href: "#", text: "فست فود و ساندویچ", icon: "🍔" },
                { href: "#", text: "دسر و شیرینی", icon: "🍰" },
                { href: "#", text: "سفارش آنلاین", icon: "📱" },
                { href: "#", text: "پذیرایی در محل", icon: "🎉" },
              ].map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="group flex items-center space-x-3 space-x-reverse text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 transition-all duration-300 p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/10"
                >
                  <span className="text-lg transition-all duration-300 transform group-hover:scale-125 group-hover:text-amber-500">
                    {service.icon}
                  </span>
                  <span className="relative text-base font-medium pb-1">
                    {service.text}
                    <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 group-hover:w-full transition-all duration-500"></div>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3 items-start h-full">
            <div className="relative pb-3 border-b border-amber-200 dark:border-amber-800/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white relative inline-block">
                اطلاعات تماس
              </h3>
            </div>
            <div className="space-y-2">
              {[
                { icon: MapPin, text: "تهران، خیابان ولیعصر، پلاک ۱۲۳" },
                { icon: Phone, text: "۰۲۱-۱۲۳۴۵۶۷۸" },
                { icon: Mail, text: "info@cafino.ir" },
                { icon: Clock, text: "همه روزه: ۸ صبح تا ۱۱ شب" },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-5 p-2 rounded-xl transition-all duration-300 hover:bg-amber-50 dark:hover:bg-amber-900/10"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <contact.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 text-sm font-medium leading-relaxed">
                    {contact.text}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-5 justify-center w-full">
                {[
                  {
                    icon: Facebook,
                    color: "bg-blue-600",
                    hover: "bg-blue-700",
                  },
                  {
                    icon: Instagram,
                    color: "bg-gradient-to-r from-purple-500 to-pink-500",
                    hover: "from-purple-600 to-pink-600",
                  },
                  { icon: Twitter, color: "bg-blue-400", hover: "bg-blue-500" },
                  { icon: Youtube, color: "bg-red-600", hover: "bg-red-700" },
                  {
                    icon: RiTelegram2Fill,
                    color: "bg-blue-600",
                    hover: "bg-blue-700",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`${social.color} w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:${social.hover} hover:scale-110 shadow-lg hover:shadow-xl`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-amber-200 dark:border-amber-800/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-bold">
            © {new Date().getFullYear()} کافینو. تمامی حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <span className="text-xl font-bold ">ساخته شده با</span>
            <HeartPulse size={20} />
          </div>
        </div>
      </div>
      <button
        onClick={scrollToTop}
        aria-label="بازگشت به بالا"
        className={`
        fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 
        text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 z-50
        ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
        style={{ transitionProperty: "opacity" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
