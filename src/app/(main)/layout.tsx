import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/common/Footer/Footer";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import Navbar from "@/components/common/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Toaster position="top-right" richColors />
      <Navbar />
      <ConfirmModal />
      {children}
      <Footer />
      {/* <FloatingContactButton /> */}
    </div>
  );
}
