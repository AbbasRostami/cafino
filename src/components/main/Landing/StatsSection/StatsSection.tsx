import Logo from "./../../../../assets/HeroSection/Stattis.webp";
import Image from "next/image";
import { AnimatedStatItem } from "./AnimatedStatItem";

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

const StatsSection = () => {
  return (
    <section
      data-testid="stats-section"
      className="flex flex-col md:flex-row items-center  justify-between gap-8 py-8 "
    >
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
          <AnimatedStatItem
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
