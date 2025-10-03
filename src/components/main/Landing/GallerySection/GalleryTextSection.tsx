"use client";

import { Coffee, ChefHat, Camera, MapPin } from "lucide-react";
import { MotionDiv, MotionP, MotionSpan } from "@/utils/MotionWrapper";

const GalleryTextSection = ({
  hoveredIndex,
  setHoveredIndex,
}: {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) => {
  const galleryItems = [
    {
      id: 1,
      title: "فضای داخلی کافه",
      description: "فضای آرامش‌بخش با طراحی مدرن و دکوراسیون چشم‌نواز",
      category: "interior",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "قهوه تخصصی",
      description: "دانه‌های قهوه باکیفیت از بهترین مناطق جهان",
      category: "menu",
      icon: <Coffee className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "صبحانه لذیذ",
      description: "صبحانه‌های متنوع و سالم با مواد اولیه تازه",
      category: "menu",
      icon: <ChefHat className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "فضای بیرونی",
      description: "محیطی دلنشین برای لذت بردن از طبیعت و قهوه",
      category: "exterior",
      icon: <Camera className="w-5 h-5" />,
    },
  ];

  const text = `کافه ما با طراحی مدرن و فضایی آرامش‌بخش، محیطی ایده‌آل برای استراحت، کار و ملاقات با دوستان فراهم کرده است. با دکوراسیون چشم‌نواز و نورپردازی مناسب، تجربه‌ای به یاد ماندنی برای شما ایجاد می‌کنیم.`;

  return (
    <MotionDiv
      className="space-y-8 order-2 lg:order-1 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      <MotionDiv
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
        whileHover={{ y: -5 }}
        className="relative p-8 rounded-3xl overflow-hidden group bg-gradient-to-br from-white/90 via-amber-50/80 to-orange-50/70 dark:from-gray-900/95 dark:via-amber-900/20 dark:to-orange-900/15 backdrop-blur-sm border border-amber-200/60 dark:border-amber-700/40 shadow-xl transition-all duration-500"
      >
        <MotionDiv
          className="flex items-center gap-4 mb-8 relative z-10"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 },
            },
          }}
        >
          <MotionDiv
            className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <MapPin className="w-7 h-7 text-white" />
          </MotionDiv>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">
              فضای منحصر به فرد کافینو
            </h2>
            <p className="text-amber-600/90 dark:text-amber-400/90 text-lg mt-2 font-medium">
              تجربه‌ای به یاد ماندنی در محیطی آرامش‌بخش
            </p>
          </div>
        </MotionDiv>

        <MotionP
          className="text-gray-700/90 dark:text-gray-300/90 mb-10 leading-relaxed text-justify text-lg font-medium relative z-10"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1 } },
          }}
        >
          {text.split("").map((char, index) => (
            <MotionSpan
              key={index}
              variants={{
                hidden: { opacity: 0, y: 5 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: 0.02 * index }}
            >
              {char}
            </MotionSpan>
          ))}
        </MotionP>

        <MotionDiv
          className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {galleryItems.slice(0, 4).map((item, index) => (
            <MotionDiv
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 },
                },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="flex flex-col p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/60 dark:from-gray-800/90 dark:to-amber-900/20 hover:from-amber-100/90 hover:to-orange-100/70 dark:hover:from-amber-800/40 dark:hover:to-orange-800/20 transition-all duration-500 cursor-pointer group border border-amber-200/40 dark:border-amber-700/30 shadow-md hover:shadow-lg"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-4 mb-4">
                <MotionDiv
                  className={`p-3 rounded-xl transition-all duration-300 flex-shrink-0 ${
                    hoveredIndex === index
                      ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg"
                      : "bg-white/90 dark:bg-gray-700/80 text-amber-600 dark:text-amber-400 shadow-md"
                  }`}
                  animate={{
                    rotate: hoveredIndex === index ? 8 : 0,
                    scale: hoveredIndex === index ? 1.15 : 1,
                  }}
                >
                  {item.icon}
                </MotionDiv>
                <h3 className="text-amber-700/90 dark:text-amber-100/90 font-bold text-lg">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-800 dark:text-amber-300/80 text-sm font-semibold leading-relaxed">
                {item.description}
              </p>
            </MotionDiv>
          ))}
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
};

export default GalleryTextSection;
