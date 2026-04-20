import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getIndustry, getAllIndustries, getCaseStudy } from "@/lib/content";
import { CTASection } from "@/components/site/CTASection";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://gloood.in";

export async function generateStaticParams() {
  const all = await getAllIndustries();
  return all.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = await getIndustry(slug);
  if (!i) return {};
  return {
    title: i.title,
    description: i.description,
    keywords: i.keyword,
    alternates: { canonical: `/industries/${i.slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/industries/${i.slug}`,
      title: i.title,
      description: i.description,
    },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = await getIndustry(slug);
  if (!i) notFound();

  const studies = (await Promise.all(i.case_study_slugs.map(s => getCaseStudy(s)))).filter(Boolean);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: i.title,
    description: i.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
    url: `${SITE_URL}/industries/${i.slug}`,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
      { "@type": "ListItem", position: 3, name: i.title, item: `${SITE_URL}/industries/${i.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumb]} />
      <article className="mx-auto max-w-[820px] px-8 py-24">
        <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">Industries</div>
        <h1 className="mt-4 text-4xl md:text-6xl">{i.h1}</h1>
        <p className="mt-6 text-xl text-[var(--color-muted)]">{i.description}</p>
        <div className="prose prose-invert prose-lg mt-12 max-w-none">
          <MDXRemote source={i.content} />
        </div>
      </article>
      {studies.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-8 py-16">
          <h2 className="text-3xl md:text-4xl mb-8">Related work</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {studies.map(s => s && <CaseStudyCard key={s.slug} study={s} />)}
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}
