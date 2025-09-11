import type { Metadata } from "next";
import { ContactForm } from "@/components/main/contact-us/ContactForm";
import {
  HeaderSection,
  ContactInfoSection,
  FAQSection,
} from "@/components/main/contact-us";
import { contactUsMetadata } from "@/lib/metadata";

export const metadata: Metadata = contactUsMetadata;

export default function ContactUs() {
  return (
    <section className="w-full overflow-hidden pt-28 px-6 md:px-8 lg:px-20 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-amber-200/20 dark:bg-amber-800/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-slate-200/20 dark:bg-slate-700/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-100/10 dark:bg-amber-900/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <HeaderSection />

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <ContactForm />
          <ContactInfoSection />
        </div>

        <FAQSection />
      </div>
    </section>
  );
}
