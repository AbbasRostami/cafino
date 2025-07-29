import Navbar from "@/components/common/Header/navbar-04";
import Sidebar from "@/app/(profile)/sidebar";
import { ConfirmModal } from "@/components/common/ConfirmModal";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* نوبار */}
      <Navbar />

      {/* محتوای اصلی */}
      <div className="container mx-auto px-2 md:px-8 lg:px-28 pt-24 sm:pt-26">
        <div className="flex flex-col md:flex-row gap-6">
          {/* سایدبار */}
          <Sidebar />

          {/* محتوای صفحه */}
          <main className="flex-1 min-w-0">
            <ConfirmModal />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
