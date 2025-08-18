"use client";
import React, { useRef } from "react";
import Logo from "./../../../../assets/Stattis.webp";
import Image from "next/image";
import { useInView, useMotionValue, animate } from "framer-motion";

const toPersianNumber = (num: number) =>
  num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

const stats = [
  {
    value: 600,
    title: "سفارش",
    subtitle: "تحویل داده شد",
  },
  {
    value: 4.9,
    title: "امتیاز ما در گوگل",
  },
  {
    value: 200,
    title: "محصول طبیعی",
    subtitle: "که استفاده می‌کنیم",
  },
  {
    value: 60,
    title: "دستور پخت",
    subtitle: "که داریم",
  },
];

const StatItem = ({
  value,
  title,
  subtitle,
}: {
  value: number;
  title: string;
  subtitle?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = React.useState("۰");

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        onUpdate(latest) {
          setDisplayValue(toPersianNumber(Math.round(latest)));
        },
      });
      return controls.stop;
    }
  }, [isInView, motionValue, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="text-4xl md:text-6xl font-extrabold text-amber-500">
        {displayValue}
        {value >= 10 && "+"}
      </div>
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
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center  justify-between gap-8 py-8 ">
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={Logo}
          alt="لوگو کافی‌نو"
          width={550}
          className="object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex-1 flex flex-wrap justify-evenly items-start gap-8 md:gap-10">
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            value={stat.value}
            title={stat.title}
            subtitle={stat.subtitle}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
