import { MotionDiv } from "@/utils/MotionWrapper";
import { Coffee } from "lucide-react";

const FooterBackground = () => {
  const coffeeIcons = [
    {
      top: "top-1/4",
      left: "left-1/4",
      size: "w-4 h-4",
      color: "text-amber-500",
      opacity: "opacity-40",
      rotate: "rotate-12",
      delay: 0,
    },
    {
      top: "top-3/4",
      right: "right-1/4",
      size: "w-3 h-3",
      color: "text-amber-400",
      opacity: "opacity-40",
      rotate: "rotate-[-15deg]",
      delay: 1000,
    },
    {
      bottom: "bottom-1/3",
      left: "left-1/2",
      size: "w-2 h-2",
      color: "text-orange-400",
      opacity: "opacity-40",
      rotate: "rotate-20",
      delay: 500,
    },
    {
      top: "top-1/3",
      right: "right-1/3",
      size: "w-3 h-3",
      color: "text-orange-300",
      opacity: "opacity-30",
      rotate: "rotate-[-10deg]",
      delay: 700,
    },
    {
      bottom: "bottom-1/4",
      left: "left-3/4",
      size: "w-2 h-2",
      color: "text-amber-400",
      opacity: "opacity-40",
      rotate: "rotate-15",
      delay: 300,
    },
  ];

  return (
    <>
      {coffeeIcons.map((icon, index) => (
        <MotionDiv
          key={index}
          className={`absolute ${icon.top} ${
            icon.left || icon.right
          } animate-pulse`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          style={{ animationDelay: `${icon.delay}ms` }}
        >
          <Coffee
            className={`${icon.size} ${icon.color} ${icon.opacity} ${icon.rotate}`}
          />
        </MotionDiv>
      ))}

      <MotionDiv
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </>
  );
};

export default FooterBackground;
