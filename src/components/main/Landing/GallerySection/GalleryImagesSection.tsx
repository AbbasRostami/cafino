"use client";

import { useRef } from "react";
import { Coffee, ChefHat, Camera, MapPin } from "lucide-react";
import Gallery1 from "./../../../../assets/Gallery/Gallery1.avif";
import Gallery2 from "./../../../../assets/Gallery/Gallery2.avif";
import Gallery3 from "./../../../../assets/Gallery/Gallery3.avif";
import Gallery4 from "./../../../../assets/Gallery/Gallery4.avif";
import Image from "next/image";
import { MotionDiv, MotionP } from "@/utils/MotionWrapper";

const GalleryImagesSection = ({
  hoveredIndex,
  setHoveredIndex,
}: {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) => {
  const containerRef = useRef(null);

  const galleryItems = [
    {
      id: 1,
      title: "فضای داخلی کافه",
      description: "فضای آرامش‌بخش با طراحی مدرن و دکوراسیون چشم‌نواز",
      category: "interior",
      icon: <MapPin className="w-5 h-5" />,
      image: Gallery2,
    },
    {
      id: 2,
      title: "قهوه تخصصی",
      description: "دانه‌های قهوه باکیفیت از بهترین مناطق جهان",
      category: "menu",
      icon: <Coffee className="w-5 h-5" />,
      image: Gallery3,
    },
    {
      id: 3,
      title: "صبحانه لذیذ",
      description: "صبحانه‌های متنوع و سالم با مواد اولیه تازه",
      category: "menu",
      icon: <ChefHat className="w-5 h-5" />,
      image: Gallery4,
    },
    {
      id: 4,
      title: "فضای بیرونی",
      description: "محیطی دلنشین برای لذت بردن از طبیعت و قهوه",
      category: "exterior",
      icon: <Camera className="w-5 h-5" />,
      image: Gallery1,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <MotionDiv
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="grid grid-cols-2 gap-4 order-1 lg:order-2"
    >
      {galleryItems.map((item, index) => (
        <MotionDiv
          key={item.id}
          variants={itemVariants}
          className={`overflow-hidden rounded-2xl shadow-xl ${
            index % 3 === 0 ? "col-span-2 h-52" : "h-40"
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{ y: -5 }}
        >
          <div className="relative h-full w-full group">
            <Image
              data-testid="gallery-image"
              src={item?.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <MotionDiv
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: hoveredIndex === index ? 0.9 : 0.6 }}
              transition={{ duration: 0.3 }}
            />
            <MotionDiv
              className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MotionDiv
                  animate={{
                    scale: hoveredIndex === index ? 1.2 : 1,
                    rotate: hoveredIndex === index ? 5 : 0,
                  }}
                >
                  {item.icon}
                </MotionDiv>
                <h3 className="font-bold text-lg md:text-xl">{item.title}</h3>
              </div>
              <MotionP
                className="text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
              >
                {item.description}
              </MotionP>
            </MotionDiv>
          </div>
        </MotionDiv>
      ))}
    </MotionDiv>
  );
};

export default GalleryImagesSection;
