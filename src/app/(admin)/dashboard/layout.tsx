import DashboardClient from "./DashboardClient";
import { SidebarProvider } from "../context/SidebarContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل مدیریت کافینو | Cafino",
  description: "مدیریت حساب  مدیریت در سامانه Cafino.پنل مدیریت",
  authors: [{ name: "Cafino" }],
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardClient>{children}</DashboardClient>
    </SidebarProvider>
  );
}
