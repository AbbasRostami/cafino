import CategorySection from "@/components/main/Landing/Category/CategorySection";
import HeroSection from "@/components/main/Landing/HeroSection/HeroSection";
import ItemSection from "@/components/main/Landing/Items/ItemSection";
import StatsSection from "@/components/main/Landing/StatsSection/StatsSection";

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
