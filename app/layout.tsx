import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { GTM } from "@/components/analytics/GTM";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "gloood — Websites that convert. Ads that compound.", template: "%s · gloood" },
  description: "Website design and performance marketing for ambitious SMBs.",
  metadataBase: new URL("https://gloood.in"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <GTM />
        <Nav />
        <main>{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
