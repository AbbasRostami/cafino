import {
  CategorySection,
  Gallery,
  HeroSection,
  ItemSection,
  StatsSection,
} from "@/components/main/Landing";
import InstallPrompt from "@/components/common/InstallPrompt";
import PushNotificationManager from "@/components/common/PushNotificationManager";

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

        {/* PWA Components */}
        <div className="mt-12 space-y-6">
          <InstallPrompt />
          <PushNotificationManager />
        </div>
      </div>
    </>
  );
}
