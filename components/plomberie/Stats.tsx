"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  { value: 2, suffix: "h", label: "Délai d'intervention", description: "Urgences 24/7 — nuit et week-end inclus" },
  { value: 100, suffix: "%", label: "Satisfaction client", description: "Garantie main-d'œuvre sur toutes nos poses" },
  { value: 15, suffix: "+", label: "Années d'expérience", description: "Maîtres plombiers certifiés RBQ" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    const intervalMs = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function PlombStats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#04060A] px-6 py-24 overflow-hidden border-y border-white/[0.04]"
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(to right, #38BDF8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        suppressHydrationWarning
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              {/* Big number */}
              <div className="relative mb-4">
                <span className="text-7xl font-bold leading-none text-white md:text-8xl tabular-nums">
                  <CountUp target={stat.value} suffix={stat.suffix} active={inView} />
                </span>
                {/* Underline accent */}
                <motion.div
                  className="absolute -bottom-2 left-0 h-px bg-sky-400"
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/50">
                {stat.label}
              </p>
              <p className="text-xs leading-relaxed text-white/25">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
