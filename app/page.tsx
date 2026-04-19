import { Hero } from "@/components/site/Hero";
import { MetricCounter } from "@/components/site/MetricCounter";
import { BundleCards } from "@/components/site/BundleCards";
import { Marquee } from "@/components/site/Marquee";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";
import { ProcessStrip } from "@/components/site/ProcessStrip";
import { TestimonialPull } from "@/components/site/TestimonialPull";
import { CTASection } from "@/components/site/CTASection";
import { getCaseStudies } from "@/lib/content";

export default async function Home() {
  const studies = (await getCaseStudies()).filter(s => s.featured).slice(0, 3);
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-[1200px] px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-[var(--color-border-subtle)]">
        <MetricCounter value="4.2×" label="Avg. ROAS lift" />
        <MetricCounter value="62%" label="CPA reduction" />
        <MetricCounter value="120+" label="Sites shipped" />
      </section>
      <BundleCards />
      {studies.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-8 py-24">
          <h2 className="text-4xl md:text-5xl mb-12">Featured work</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {studies.map(s => <CaseStudyCard key={s.slug} study={s} />)}
          </div>
        </section>
      )}
      <Marquee />
      <TestimonialPull />
      <ProcessStrip />
      <CTASection />
    </>
  );
}
