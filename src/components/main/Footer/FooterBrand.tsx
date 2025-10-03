import Image from "next/image";
import CafeinLogoLight from "../../../assets/Logo/1.webp";
import CafeinLogoDark from "../../../assets/Logo/2.webp";
import { MotionDiv, MotionP } from "@/utils/MotionWrapper";

const FooterBrand = () => {
  return (
    <div className="flex flex-col items-center sm:items-start h-full">
      <MotionDiv
        className="relative group transition-all duration-500 hover:scale-[1.02] mb-6"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute -inset-2 blur-md opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
        <Image
            src={CafeinLogoLight}
          alt="کافینو - لوگو روشن | کافه و رستوران مدرن"
          className="block dark:hidden object-contain relative z-10"
          width={300}
          priority
          style={{ height: "auto" }}
        />
        <Image
          src={CafeinLogoDark}
          alt="کافینو - لوگو تیره | کافه و رستوران مدرن"
          className="hidden dark:block object-contain relative z-10"
          width={300}
          priority
          style={{ height: "auto" }}
        />
      </MotionDiv>

      <MotionP
        className="text-gray-600 dark:text-gray-300 text-justify mb-6 max-w-xs"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        کافینو، برند متفاوت در دنیای کافه و رستوران. کیفیت، طعم و طراحی مدرن در
        یک تجربه‌ی خاص جمع شده‌اند.
      </MotionP>
    </div>
  );
};

export default FooterBrand;
