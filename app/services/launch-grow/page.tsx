import { ServicePage } from "@/components/site/ServicePage";
import { getService } from "@/lib/content";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Launch + Grow",
  description: "Website plus paid ads bundle: a new Next.js site and 90 days of Meta and Google Ads, delivered by one team so site and funnel stay in sync.",
};

export default async function Page() {
  const s = await getService("launch-grow");
  if (!s) notFound();
  return <ServicePage service={s} />;
}
