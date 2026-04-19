import clients from "@/content/clients.json";

export function Marquee() {
  const doubled = [...clients, ...clients];
  return (
    <div className="overflow-hidden py-16 border-y border-[var(--color-border-subtle)]">
      <div className="flex gap-16 animate-[marquee_40s_linear_infinite] whitespace-nowrap">
        {doubled.map((c, i) => (
          <div key={i} className="shrink-0 text-[var(--color-muted)] font-display font-medium text-xl opacity-60 hover:opacity-100 transition-opacity">
            {c.name}
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
