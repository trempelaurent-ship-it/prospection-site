"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Prospect } from "@/lib/types";

const marqueeTerms = [
  "Plomberie", "Urgences 24/7", "Réparations", "Chauffe-eau", "Drains",
  "Robinetterie", "Qualité", "RBQ", "Confiance", "Installations", "Fuites",
];

function MarqueeRow({ terms, speed, direction }: { terms: string[]; speed: number; direction: "left" | "right" }) {
  const repeated = [...terms, ...terms, ...terms];
  return (
    <div className="flex gap-10 overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex gap-10 shrink-0"
        animate={{ x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((term, i) => (
          <span key={i} className="text-5xl font-bold text-white/[0.04] md:text-7xl shrink-0">
            {term}
            <span className="mx-4 text-sky-400/10">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function PlombAbout({ prospect }: { prospect: Prospect }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.45], ["30px", "0px"]);

  return (
    <section ref={ref} className="relative bg-[#080C10] py-32 overflow-hidden">
      {/* Marquee rows */}
      <div className="mb-24 flex flex-col gap-3 select-none">
        <MarqueeRow terms={marqueeTerms} speed={30} direction="left" />
        <MarqueeRow terms={[...marqueeTerms].reverse()} speed={25} direction="right" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-6">
        {/* Vertical accent line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/[0.04]">
          <motion.div
            className="w-full bg-sky-400/50 origin-top"
            style={{ scaleY: lineScale, height: "100%" }}
          />
        </div>

        <div className="grid gap-16 md:grid-cols-2 pl-10">
          {/* Left */}
          <motion.div style={{ opacity: textOpacity, y: textY }}>
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-sky-400">
              À propos
            </p>
            <h2 className="text-3xl font-bold text-white md:text-4xl leading-snug">
              Une réputation bâtie{" "}
              <span className="text-white/30">tuyau par tuyau.</span>
            </h2>

            {/* Small badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-sky-400/20 bg-sky-400/5 px-5 py-2"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs text-sky-400/80 uppercase tracking-widest">
                Certifié RBQ · Grand Montréal
              </span>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div style={{ opacity: textOpacity, y: textY }}>
            <p className="text-lg leading-relaxed text-white/40">
              {prospect.about}
            </p>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="text-xs uppercase tracking-widest text-white/20">
                {prospect.name}
              </span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
