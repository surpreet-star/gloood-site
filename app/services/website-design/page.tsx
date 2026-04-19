import { ServicePage } from "@/components/site/ServicePage";
import { getService } from "@/lib/content";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Website Design — Launch",
  description: "Website design agency building conversion-focused sites for SMBs. Next.js, fast, SEO-ready. Mumbai + India.",
};

export default async function Page() {
  const s = await getService("website-design");
  if (!s) notFound();
  return <ServicePage service={s} />;
}
