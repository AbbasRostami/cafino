import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/Theme-Provider";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/QueryProviders";
import { rootMetadata } from "@/lib/metadata/rootMetadata";
import { StructuredDataScripts } from "@/lib/metadata/structuredData";

const vazirmatn = localFont({
  src: "./../assets/fonts/Vazirmatn-UI-FD-Regular.ttf",
  variable: "--Vazirmatn-UI-FD-Regular",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <StructuredDataScripts />
      </head>
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
