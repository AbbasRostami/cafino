import { Toaster } from "@/components/ui/sonner";
import React from "react";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Header/navbar-04";
import { ConfirmModal } from "@/components/common/ConfirmModal";

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
