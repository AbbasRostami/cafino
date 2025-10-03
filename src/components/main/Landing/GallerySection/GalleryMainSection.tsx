"use client";

import { MotionDiv } from "@/utils/MotionWrapper";

const GalleryMainSection = () => {
  return (
    <MotionDiv
      className="text-center mb-12 md:mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8 },
        },
      }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
        <span className="text-amber-600 dark:text-amber-400 relative z-10">
          گالری تصاویر کافینو
        </span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        فضای دلنشین و منوی متنوع ما را در تصاویر زیر مشاهده کنید
      </p>
    </MotionDiv>
  );
};

export default GalleryMainSection;
