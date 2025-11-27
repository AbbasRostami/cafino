"use client";

import { useMotionValue, animate } from "framer-motion";
import { MotionDiv, MotionSpan } from "@/utils/MotionWrapper";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";

interface AnimatedStatItemProps {
  value: number;
  title: string;
  subtitle?: string;
}

export const AnimatedStatItem = ({
  value,
  title,
  subtitle,
}: AnimatedStatItemProps) => {
  const isMobile = useIsMobile();
  const Container = isMobile ? "div" : MotionDiv;

  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  const startAnimation = () => {
    if (isMobile) return;
    animate(motionValue, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest).toString());
      },
    });
  };

  useEffect(() => {
    if (isMobile) {
      setDisplayValue(value.toString()); // نمایش مستقیم مقدار در موبایل
      return;
    }
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest).toString());
    });
    return unsubscribe;
  }, [motionValue, isMobile, value]);

  return (
    <Container
      data-testid="stat-item"
      className="flex flex-col items-center gap-4"
      {...(!isMobile && {
        whileInView: { opacity: 1 },
        initial: { opacity: 0 },
        viewport: { once: true, amount: 0.5 },
        onViewportEnter: startAnimation,
      })}
    >
      <MotionSpan className="text-4xl md:text-6xl font-extrabold text-amber-500">
        {displayValue}
        {value >= 10 && "+"}
      </MotionSpan>
      <div className="flex flex-col text-right">
        <span className="text-xl font-bold text-gray-900 dark:text-amber-100">
          {title}
        </span>
        {subtitle && (
          <span className="text-sm text-gray-500 dark:text-gray-300">
            {subtitle}
          </span>
        )}
      </div>
    </Container>
  );
};
