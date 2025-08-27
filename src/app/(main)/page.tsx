import {
  CategorySection,
  Gallery,
  HeroSection,
  ItemSection,
  StatsSection,
} from "@/components/main/Landing";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="container px-4 sm:px-12 mx-auto">
        <CategorySection />
        <StatsSection />
        <ItemSection />
        <Gallery />
      </div>
    </>
  );
}
