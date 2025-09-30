import type { Metadata } from "next";
import Sidebar from "@/components/profile/layout";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import Navbar from "@/components/shared/Header";

export const metadata: Metadata = {
  title: "پنل کاربری | Cafino",
  description:
    "مدیریت حساب کاربری، سفارش‌ها، آدرس‌ها و تنظیمات در کافه رستوران کافینو.",
  authors: [{ name: "Cafino" }],
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="mx-auto px-2 md:px-8 xl:px-28 pt-24 sm:pt-26">
        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar />
          <main className="flex-1 min-w-0 ">
            <ConfirmModal />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
