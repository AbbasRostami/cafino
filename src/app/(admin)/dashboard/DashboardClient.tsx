"use client";

import React from "react";
import AppSidebar from "../layout/AppSidebar";
import Backdrop from "../layout/Backdrop";
import AppHeader from "../layout/AppHeader";
import { useSidebar } from "../context/SidebarContext";
import dynamic from "next/dynamic";
import BuyerBreadcrumbs from "../components/Breadcrumbs";
import { Toaster } from "sonner";

const ConfirmModal = dynamic(
  () =>
    import("@/components/common/ConfirmModal").then(
      (mod) => mod.ConfirmModal
    ),
  { ssr: false }
);

export default function DashboardClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "mr-0"
    : isExpanded || isHovered
    ? "lg:mr-[310px]"
    : "lg:mr-[110px]";

  return (
    <div className="min-h-screen xl:flex">
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <ConfirmModal />
          <BuyerBreadcrumbs />
          <Toaster position="top-center" />
          {children}
        </div>
      </div>
      <AppSidebar />
      <Backdrop />
    </div>
  );
}
