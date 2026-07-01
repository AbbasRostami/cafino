import { QueryProvider } from "@/components/providers/QueryProviders";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/Theme-Provider";
import { rootMetadata } from "@/lib/metadata/rootMetadata";
import { StructuredDataScripts } from "@/lib/metadata/structuredData";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
        <meta
          name="google-site-verification"
          content="SEucRGtURfTsosYq-_qdx9i9c4C0MVBn9XfLrSSbGjA"
        />
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
            <Toaster position="top-right" expand={true} richColors />
            <NuqsAdapter>{children}</NuqsAdapter>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
