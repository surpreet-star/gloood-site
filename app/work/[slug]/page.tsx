import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getCaseStudy, getCaseStudies } from "@/lib/content";
import { CTASection } from "@/components/site/CTASection";

export async function generateStaticParams() {
  const all = await getCaseStudies();
  return all.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getCaseStudy(slug);
  return s ? { title: s.title, description: s.excerpt } : {};
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getCaseStudy(slug);
  if (!s) notFound();
  return (
    <>
      <article className="mx-auto max-w-[900px] px-8 py-24">
        <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">{s.client} · {s.year}</div>
        <h1 className="mt-4 text-5xl md:text-7xl">{s.title}</h1>
        <p className="mt-6 text-xl text-[var(--color-muted)]">{s.excerpt}</p>
        <div className="mt-12 grid grid-cols-3 gap-8 py-10 border-y border-[var(--color-border-subtle)]">
          {s.metrics.map(m => (
            <div key={m.label}>
              <div className="num text-4xl md:text-5xl text-[var(--color-accent-2)]">{m.value}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="prose prose-invert prose-lg mt-12 max-w-none">
          <MDXRemote source={s.content} />
        </div>
      </article>
      <CTASection />
    </>
  );
}
