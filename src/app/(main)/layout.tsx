import { Toaster } from "@/components/ui/sonner";
import React from "react";
import Footer from "@/components/common/Footer/Footer";
import Navbar from "@/components/common/Header/Navbar";
import { ConfirmModal } from "@/components/common/ConfirmModal/ConfirmModal";

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
    </div>
  );
}
