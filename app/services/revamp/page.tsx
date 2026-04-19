import { ServicePage } from "@/components/site/ServicePage";
import { getService } from "@/lib/content";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Revamp",
  description: "Website redesign and CRO agency rebuilding underperforming sites using analytics and user research — without losing your SEO.",
};

export default async function Page() {
  const s = await getService("revamp");
  if (!s) notFound();
  return <ServicePage service={s} />;
}
