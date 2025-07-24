import React from "react";
import DashboardClient from "./DashboardClient";
import { SidebarProvider } from "../context/SidebarContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل کاربری  مدیریت",
  description: "مدیریت حساب کاربری  مدیریت در سامانه Cafino.پنل مدیریت",
  openGraph: {
    title: "پنل کاربری  مدیریت | Cafino",
    description: "مدیریت حساب کاربری  مدیریت در سامانه Cafino .پنل مدیریت",
  },
  twitter: {
    title: "پنل کاربری  مدیریت | Cafino",
    description: "مدیریت حساب کاربری  مدیریت در سامانه Cafino.پنل مدیریت",
  },
  authors: [{ name: "Cafino" }],
};

export default function BuyerLayout({
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
