import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getLocation, getAllLocations } from "@/lib/content";
import { CTASection } from "@/components/site/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://gloood.in";

export async function generateStaticParams() {
  const all = await getAllLocations();
  return all.map(l => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = await getLocation(slug);
  if (!l) return {};
  return {
    title: l.title,
    description: l.description,
    keywords: l.keyword,
    alternates: { canonical: `/locations/${l.slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/locations/${l.slug}`,
      title: l.title,
      description: l.description,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = await getLocation(slug);
  if (!l) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: l.title, item: `${SITE_URL}/locations/${l.slug}` },
    ],
  };

  const schemas: Record<string, unknown>[] = [breadcrumb];

  if (l.slug === "mumbai") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "gloood",
      url: `${SITE_URL}/locations/mumbai`,
      description: l.description,
      areaServed: [
        { "@type": "City", name: "Mumbai" },
        { "@type": "City", name: "Navi Mumbai" },
        { "@type": "City", name: "Thane" },
      ],
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    });
  } else {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: l.title,
      description: l.description,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "India" },
      url: `${SITE_URL}/locations/${l.slug}`,
    });
  }

  return (
    <>
      <JsonLd data={schemas} />
      <article className="mx-auto max-w-[820px] px-8 py-24">
        <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">Locations</div>
        <h1 className="mt-4 text-4xl md:text-6xl">{l.h1}</h1>
        <p className="mt-6 text-xl text-[var(--color-muted)]">{l.intro}</p>
        <div className="prose prose-invert prose-lg mt-12 max-w-none">
          <MDXRemote source={l.content} />
        </div>
      </article>
      <CTASection />
    </>
  );
}
