import { ServicePage } from "@/components/site/ServicePage";
import { getService } from "@/lib/content";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Performance Ads — Grow",
  description: "Performance marketing agency running Meta ads and Google ads for Indian SMBs. Creative, targeting, tracking, and reporting — one team, end to end.",
};

export default async function Page() {
  const s = await getService("performance-ads");
  if (!s) notFound();
  return <ServicePage service={s} />;
}
