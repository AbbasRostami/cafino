import {
  CategorySection,
  Gallery,
  HeroSection,
  ItemSection,
  StatsSection,
} from "@/components/main/Landing";
export const revalidate = 3600;
export const dynamic = "force-static";
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
