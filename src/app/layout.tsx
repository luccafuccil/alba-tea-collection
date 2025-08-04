import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alba - Your Tea Collection",
    template: "%s | Alba",
  },
  description:
    "Take your time, breathe, catalogue your tea collection and discover new sensations.",
  keywords: ["tea", "collection", "tasting", "brewing", "journal"],
  authors: [{ name: "Alba Team" }],
  creator: "Alba",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alba.tea",
    title: "Alba - Your Tea Collection",
    description:
      "Take your time, breathe, catalogue your tea collection and discover new sensations.",
    siteName: "Alba",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alba - Your Tea Collection",
    description:
      "Take your time, breathe, catalogue your tea collection and discover new sensations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          "text-text-color selection:bg-primary-green/20"
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
