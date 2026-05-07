"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Prospect } from "@/lib/types";

const wordVariants = {
  hidden: { y: 100, opacity: 0, rotateX: -40 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { duration: 1, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function PlombHero({ prospect }: { prospect: Prospect }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-8%"]);

  const words = prospect.name.split(" ");

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-[#080C10]">
      {/* Parallax video */}
      <motion.div
        className="absolute inset-0"
        style={{ y: videoY, scale: videoScale }}
      >
        <video
          autoPlay muted loop playsInline
          className="h-full w-full object-cover opacity-60"
          poster="/images/plomberie-poster.jpg"
        >
          <source src="/videos/plomberie.mp4" type="video/mp4" />
          <source src="/videos/toiture.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C10]/30 via-[#080C10]/40 to-[#080C10]" />
      </motion.div>

      {/* Grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />

      {/* Top badge */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <div className="h-px w-10 bg-sky-400/60" />
        <span className="text-sm uppercase tracking-[0.4em] text-sky-400/90 font-medium">
          {prospect.sectorLabel}
        </span>
        <div className="h-px w-10 bg-sky-400/60" />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        {/* City */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 text-base uppercase tracking-[0.35em] text-white/70 font-medium"
        >
          {prospect.city} · {prospect.region}
        </motion.p>

        {/* Name — word by word reveal */}
        <div className="mb-6 flex flex-wrap justify-center gap-x-6 [filter:drop-shadow(0_0_40px_rgba(56,189,248,0.25))]"
          style={{ perspective: "800px" }}>
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`block text-6xl font-bold leading-none tracking-tight md:text-8xl lg:text-[7rem] ${
                  i === words.length - 1 ? "text-sky-400" : "text-white"
                }`}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-4 max-w-xl text-2xl text-white/90 md:text-3xl italic"
        >
          « {prospect.tagline} »
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mb-12 max-w-lg text-base text-white/65 leading-relaxed"
        >
          {prospect.hero_subtitle}
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-sky-400 px-10 py-4 text-base font-semibold text-black"
        >
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
          {prospect.cta_text}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity: contentOpacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <div className="h-14 w-px bg-gradient-to-b from-transparent to-sky-400" />
        <span className="text-xs uppercase tracking-[0.4em] text-sky-400/80 font-medium">Défiler</span>
      </motion.div>
    </section>
  );
}
