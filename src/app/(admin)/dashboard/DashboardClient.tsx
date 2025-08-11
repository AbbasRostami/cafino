"use client";

import React from "react";
import AppSidebar from "../layout/AppSidebar";
import Backdrop from "../layout/Backdrop";
import AppHeader from "../layout/AppHeader";
import { useSidebar } from "../context/SidebarContext";
import dynamic from "next/dynamic";
import DashboardBreadcrumbs from "../components/common/Breadcrumbs/Breadcrumbs";
import { Toaster } from "sonner";

const ConfirmModal = dynamic(
  () =>
    import("@/components/common/ConfirmModal/ConfirmModal").then(
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
    ? "lg:mr-[240px]"
    : "lg:mr-[110px]";

  return (
    <div className="min-h-screen xl:flex">
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <ConfirmModal />
          <DashboardBreadcrumbs />
          {children}
        </div>
      </div>
      <AppSidebar />
      <Backdrop />
    </div>
  );
}
