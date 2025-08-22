"use client";
import { MotionButton, MotionDiv, MotionP } from "@/utils/MotionWrapper";
import { HeartPulse } from "lucide-react";
import { useEffect, useState } from "react";

const FooterBottom = () => {
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
    <>
      <MotionDiv
        className="pt-8 border-t border-amber-200 dark:border-amber-800/30 flex flex-col md:flex-row justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center md:text-right mb-4 md:mb-0">
          <MotionP
            className="text-gray-600 dark:text-gray-400 text-sm font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            © {new Date().getFullYear()} کافینو
          </MotionP>
          <MotionP
            className="text-gray-500 dark:text-gray-500 text-xs mt-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            تمامی حقوق محفوظ است
          </MotionP>
        </div>

        <MotionDiv
          className="flex items-center gap-2 text-amber-600 dark:text-amber-400"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="text-lg font-bold">ساخته شده با</span>
          <MotionDiv
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HeartPulse size={20} />
          </MotionDiv>
        </MotionDiv>
      </MotionDiv>

      <MotionButton
        onClick={scrollToTop}
        aria-label="بازگشت به بالا"
        className={`
          hidden md:flex fixed bottom-6 right-6 w-12 h-12 rounded-full 
          bg-gradient-to-br from-amber-500 to-amber-600 text-white 
          items-center justify-center shadow-lg hover:shadow-xl 
          transition-all duration-500 z-50
          ${
            visible
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
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
      </MotionButton>
    </>
  );
};

export default FooterBottom;
