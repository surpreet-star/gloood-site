const SITE_URL = "https://gloood.in";

export function webPageSchema(opts: {
  url: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    url: `${SITE_URL}${opts.url}`,
    name: opts.title,
    description: opts.description,
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "gloood" },
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.href.startsWith("http") ? t.href : `${SITE_URL}${t.href}`,
    })),
  };
}
