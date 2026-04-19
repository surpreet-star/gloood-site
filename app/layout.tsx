import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { GTM } from "@/components/analytics/GTM";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const SITE_URL = "https://gloood.in";
const DEFAULT_TITLE = "gloood — Websites that convert. Ads that compound.";
const DEFAULT_DESCRIPTION = "Website design and performance marketing for ambitious SMBs.";
const DEFAULT_OG = `${SITE_URL}/api/og?title=${encodeURIComponent("Websites that convert. Ads that compound.")}`;

export const metadata: Metadata = {
  title: { default: DEFAULT_TITLE, template: "%s · gloood" },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "gloood",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: "gloood" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "gloood",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: "hello@gloood.in",
  description: DEFAULT_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <JsonLd data={organizationSchema} />
        <GTM />
        <Nav />
        <main>{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
