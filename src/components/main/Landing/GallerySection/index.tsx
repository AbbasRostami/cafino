import { gallerySectionStructuredData } from "@/lib/metadata/gallerySection";
import GalleryMainSection from "./GalleryMainSection";
import GalleryTextSection from "./GalleryTextSection";
import GalleryImagesSection from "./GalleryImagesSection";

const GallerySection = () => {
  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gallerySectionStructuredData),
        }}
      />

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <GalleryMainSection />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <GalleryTextSection />

            <GalleryImagesSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default GallerySection;
