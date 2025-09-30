"use client";

import { useSidebar } from "../context/SidebarContext";
import dynamic from "next/dynamic";
import DashboardBreadcrumbs from "../components/common/Breadcrumbs";
import { AppHeader, AppSidebar, Backdrop } from "../layout";

const ConfirmModal = dynamic(
  () =>
    import("@/components/shared/ConfirmModal").then((mod) => mod.ConfirmModal),
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
        <div className="p-4 mx-auto max-w-8xl md:p-6">
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
