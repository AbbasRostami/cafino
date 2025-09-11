import { Metadata } from "next";
import {
  HeroSection,
  StatsSection,
  StorySection,
  GallerySection,
  TimelineSection,
  AwardsSection,
  ValuesSection,
  TeamSection,
  TestimonialsSection,
  CTASection,
} from "@/components/main/about-us";
import { aboutUsMetadata } from "@/lib/metadata";

export const metadata: Metadata = aboutUsMetadata;

export default function AboutUs() {
  return (
    <section className="pb-8 pt-28 px-4 md:px-8 lg:px-16 overflow-hidden">
      <HeroSection />
      <StatsSection />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-14">
        <StorySection />
        <GallerySection />
      </div>

      <TimelineSection />
      <AwardsSection />
      <ValuesSection />
      <TeamSection />
      <TestimonialsSection />
      <CTASection />
    </section>
  );
}
