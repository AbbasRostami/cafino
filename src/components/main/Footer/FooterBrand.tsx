"use client";

import Image from "next/image";
import CafeinLogoLight from "../../../assets/Logo/1.webp";
import CafeinLogoDark from "../../../assets/Logo/2.webp";
import { MotionDiv, MotionP } from "@/utils/MotionWrapper";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";

const FooterBrand = () => {
  const isMobile = useIsMobile();
  const WrapperDiv = isMobile ? "div" : MotionDiv;
  const WrapperP = isMobile ? "p" : MotionP;

  return (
    <div className="flex flex-col items-center sm:items-start h-full">
      <WrapperDiv
        className="relative group transition-all duration-500 hover:scale-[1.02] mb-6"
        {...(!isMobile && {
          initial: { opacity: 0, y: -30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.8 },
        })}
      >
        <div className="absolute -inset-2 blur-md opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
        <Image
          src={CafeinLogoLight}
          alt="کافینو - لوگو روشن | کافه و رستوران مدرن"
          className="block dark:hidden h-40 sm:h-auto object-contain relative z-10"
          width={300}
          priority
        />
        <Image
          src={CafeinLogoDark}
          alt="کافینو - لوگو تیره | کافه و رستوران مدرن"
          className="hidden dark:block h-40 sm:h-auto object-contain relative z-10"
          width={300}
          priority
        />
      </WrapperDiv>

      <WrapperP
        className="text-gray-600 dark:text-gray-300 text-justify mb-6 max-w-xs"
        {...(!isMobile && {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: 0.2 },
        })}
      >
        کافینو، برند متفاوت در دنیای کافه و رستوران. کیفیت، طعم و طراحی مدرن در
        یک تجربه‌ی خاص جمع شده‌اند.
      </WrapperP>
    </div>
  );
};

export default FooterBrand;
