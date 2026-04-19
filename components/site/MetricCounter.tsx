"use client";
import { useEffect, useRef, useState } from "react";

export function MetricCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <div className={`num text-5xl md:text-6xl transition-opacity duration-700 ${shown ? "opacity-100" : "opacity-0"}`}>{value}</div>
      <div className="mt-2 text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">{label}</div>
    </div>
  );
}
