import HeroSection from "@/components/Landing/HeroSection/HeroSection";
import CategorySection from "@/components/Landing/Category/CategorySection";
import StatsSection from "@/components/Landing/StatsSection/StatsSection";
import ItemSection from "@/components/Landing/Items/ItemSection";

export default function Home() {
  return (
    <>
      <div className="container px-4 sm:px-12 mx-auto">
        <HeroSection />
        <CategorySection />
        <StatsSection />
        <ItemSection />
      </div>
    </>
  );
}
