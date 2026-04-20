import Link from "next/link";
import { getInsights } from "@/lib/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Insights",
  description: "Practical guides on website design, performance marketing, and growth for Indian SMBs — by the gloood team.",
};

export default async function InsightsIndex() {
  const insights = await getInsights();
  const description = "Practical guides on website design, performance marketing, and growth for Indian SMBs — by the gloood team.";
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ url: "/insights", title: "Insights", description, type: "CollectionPage" }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Insights", href: "/insights" },
          ]),
        ]}
      />
    <div className="mx-auto max-w-[900px] px-8 py-24">
      <h1 className="text-5xl md:text-7xl">Insights</h1>
      <p className="mt-6 max-w-xl text-[var(--color-muted)]">Practical guides on building and growing a business online in India. No fluff.</p>
      <div className="mt-16 space-y-8">
        {insights.map(i => (
          <Link key={i.slug} href={`/insights/${i.slug}`} className="group block border-b border-[var(--color-border-subtle)] pb-8 hover:border-[var(--color-accent)] transition-colors">
            <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">
              <time dateTime={i.publish_date}>{new Date(i.publish_date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</time>
              <span className="mx-2">·</span>
              <span>{i.reading_time} min read</span>
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl group-hover:text-[var(--color-accent-2)] transition-colors">{i.title}</h2>
            <p className="mt-3 text-[var(--color-muted)]">{i.description}</p>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
