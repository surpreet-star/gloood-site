import Image from "next/image";
import clients from "@/content/clients.json";

export function Marquee() {
  const doubled = [...clients, ...clients];
  return (
    <div className="overflow-hidden py-16 border-y border-[var(--color-border-subtle)]">
      <div className="flex items-center gap-20 animate-[marquee_40s_linear_infinite] whitespace-nowrap">
        {doubled.map((c, i) => (
          <div key={i} className="shrink-0 h-10 w-32 relative opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
            <Image
              src={c.logo}
              alt={`${c.name} logo`}
              fill
              sizes="128px"
              className="object-contain brightness-0 invert"
              unoptimized
            />
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
