import type { Metadata } from "next";
import { Figtree, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bigtoastcompany.com"),
  title: "Big Toast Company | Storytelling-Led Content Studio",
  description:
    "Storytelling-led content studio crafting high-retention videos, podcasts, and digital campaigns for ambitious brands and founders.",
  keywords: [
    "Big Toast Company",
    "Storytelling-Led Content Studio",
    "Video Production",
    "Podcast Production",
    "Content Distribution",
    "Founder Stories",
    "Brand Strategy",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Big Toast Company | Storytelling-Led Content Studio",
    description:
      "Storytelling-led content studio crafting high-retention videos, podcasts, and digital campaigns for ambitious brands and founders.",
    url: "https://www.bigtoastcompany.com",
    siteName: "Big Toast Company",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.bigtoastcompany.com/logo.png",
        width: 512,
        height: 512,
        alt: "Big Toast Company",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Big Toast Company | Storytelling-Led Content Studio",
    description:
      "Storytelling-led content studio crafting high-retention videos, podcasts, and digital campaigns for ambitious brands and founders.",
    images: ["https://www.bigtoastcompany.com/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased selection:bg-sky-600 selection:text-white">
        <SmoothScroll>
          {/* Ambient Lighting Background */}
          <div className="fixed-bg-glow" />

          {/* Main Top Header Navbar */}
          <Navbar />

          {/* Page Contents */}
          <main className="relative z-10">{children}</main>

          {/* Global Footer */}
          <Footer />

          {/* Floating Scroll To Top Button */}
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
