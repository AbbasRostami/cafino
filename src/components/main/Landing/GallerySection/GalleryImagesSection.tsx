"use client";

import { useRef } from "react";
import { Coffee, ChefHat, Camera, MapPin } from "lucide-react";
import Gallery1 from "./../../../../assets/Gallery/Gallery1.avif";
import Gallery2 from "./../../../../assets/Gallery/Gallery2.avif";
import Gallery3 from "./../../../../assets/Gallery/Gallery3.avif";
import Gallery4 from "./../../../../assets/Gallery/Gallery4.avif";
import Image from "next/image";
import { MotionDiv, MotionP } from "@/utils/MotionWrapper";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";

const GalleryImagesSection = ({
  hoveredIndex,
  setHoveredIndex,
}: {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) => {
  const isMobile = useIsMobile();
  const containerRef = useRef(null);

  const Container = isMobile ? "div" : MotionDiv;
  const Item = isMobile ? "div" : MotionDiv;
  const HoverOverlay = isMobile ? "div" : MotionDiv;
  const HoverIcon = isMobile ? "div" : MotionDiv;
  const TextWrapper = isMobile ? "div" : MotionDiv;

  const containerVariants = !isMobile
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }
    : {};

  const itemVariants = !isMobile
    ? {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }
    : {};

  const galleryItems = [
    {
      id: 1,
      title: "فضای داخلی کافه",
      description: "فضای آرامش‌بخش با طراحی مدرن و دکوراسیون چشم‌نواز",
      icon: <MapPin className="w-5 h-5" />,
      image: Gallery2,
    },
    {
      id: 2,
      title: "قهوه تخصصی",
      description: "دانه‌های قهوه باکیفیت از بهترین مناطق جهان",
      icon: <Coffee className="w-5 h-5" />,
      image: Gallery3,
    },
    {
      id: 3,
      title: "صبحانه لذیذ",
      description: "صبحانه‌های متنوع و سالم با مواد اولیه تازه",
      icon: <ChefHat className="w-5 h-5" />,
      image: Gallery4,
    },
    {
      id: 4,
      title: "فضای بیرونی",
      description: "محیطی دلنشین برای لذت بردن از طبیعت و قهوه",
      icon: <Camera className="w-5 h-5" />,
      image: Gallery1,
    },
  ];

  return (
    <Container
      ref={containerRef}
      {...(!isMobile && {
        variants: containerVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
      })}
      className="grid grid-cols-2 gap-4 order-1 lg:order-2"
    >
      {galleryItems.map((item, index) => (
        <Item
          key={item.id}
          {...(!isMobile && { variants: itemVariants, whileHover: { y: -5 } })}
          className={`overflow-hidden rounded-2xl shadow-xl ${
            index % 3 === 0 ? "col-span-2 h-52" : "h-40"
          }`}
          onMouseEnter={() => !isMobile && setHoveredIndex(index)}
          onMouseLeave={() => !isMobile && setHoveredIndex(null)}
        >
          <div className="relative h-full w-full group">
            <Image
              data-testid="gallery-image"
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />

            <HoverOverlay
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
              {...(!isMobile && {
                initial: { opacity: 0.6 },
                animate: { opacity: hoveredIndex === index ? 0.9 : 0.6 },
                transition: { duration: 0.3 },
              })}
            />

            <TextWrapper
              className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white"
              {...(!isMobile && {
                initial: { y: 20, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { delay: 0.2 + index * 0.1 },
              })}
            >
              <div className="flex items-center gap-2 mb-2">
                <HoverIcon
                  {...(!isMobile && {
                    animate: {
                      scale: hoveredIndex === index ? 1.2 : 1,
                      rotate: hoveredIndex === index ? 5 : 0,
                    },
                  })}
                >
                  {item.icon}
                </HoverIcon>

                <h3 className="font-bold text-lg md:text-xl">{item.title}</h3>
              </div>

              <MotionP
                className="text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                {...(!isMobile && {
                  initial: { y: 10 },
                  animate: { y: 0 },
                })}
              >
                {item.description}
              </MotionP>
            </TextWrapper>
          </div>
        </Item>
      ))}
    </Container>
  );
};

export default GalleryImagesSection;
