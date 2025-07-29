import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/Theme-Provider";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { QueryProvider } from "@/hooks/QueryProviders";

const vazirmatn = localFont({
  src: "./../assets/fonts/Vazirmatn.ttf",
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cafino",
  description: "Cafino is a platform for buying and selling coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-right" richColors />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
