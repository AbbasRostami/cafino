import Navbar from "@/components/common/Header/navbar-04";
import HeroSection from "@/components/Landing/HeroSection";
import CategorySection from "@/components/Landing/CategorySection";

export default function Home() {
  return (
    <div className="container px-4 sm:px-12 mx-auto">
      <Navbar />
      <HeroSection />
      <CategorySection />
    </div>
  );
}
