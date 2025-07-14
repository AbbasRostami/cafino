import Navbar from "@/components/common/Header/navbar-04";
import HeroSection from "@/components/Landing/HeroSection";
import CategorySection from "@/components/Landing/Category/CategorySection";
import StatsSection from "@/components/Landing/StatsSection";
import ItemSection from "@/components/Landing/ItemSection";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <>
      <div className="container px-4 sm:px-12 mx-auto">
        <Navbar />
        <HeroSection />
        <CategorySection />
        <StatsSection />
        <ItemSection />
      </div>
      <Footer />
    </>
  );
}
