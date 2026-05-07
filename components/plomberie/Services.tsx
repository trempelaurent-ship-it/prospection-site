"use client";

import { motion } from "motion/react";
import { Prospect } from "@/lib/types";
import dynamic from "next/dynamic";
import { GlowCard } from "@/components/ui/spotlight-card";

const ShaderBackground = dynamic(
  () => import("@/components/ui/shader-background").then((m) => m.ShaderBackground),
  { ssr: false }
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 70, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const serviceIcons = ["◈", "◉", "◎"];

export default function PlombServices({ prospect }: { prospect: Prospect }) {
  return (
    <section className="relative bg-[#080C10] px-6 py-32 md:py-40 overflow-hidden">
      {/* WebGL shader background */}
      <div className="pointer-events-none absolute inset-0">
        <ShaderBackground opacity={0.6} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C10] via-transparent to-[#080C10]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C10]/60 via-transparent to-[#080C10]/60" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.45em] text-sky-400">
              Services
            </p>
            <h2 className="text-4xl font-bold text-white md:text-6xl leading-tight">
              Ce que vous faites.
              <br />
              <span className="text-white/25">Mis en valeur.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-xs text-sm leading-relaxed text-white/40 md:text-right"
          >
            Trois services. Présentés avec le respect qu&apos;ils méritent.
          </motion.p>
        </div>

        {/* Spotlight cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-3"
          style={{ perspective: "1200px" }}
        >
          {prospect.services.map((service, i) => (
            <motion.div key={i} variants={cardVariants}>
              <GlowCard
                glowColor="blue"
                customSize
                className="w-full h-full min-h-[320px] flex flex-col p-8 cursor-default"
              >
                {/* Number watermark */}
                <span className="mb-4 block text-7xl font-bold text-white/[0.04] leading-none select-none">
                  0{i + 1}
                </span>

                {/* Icon */}
                <motion.span
                  className="mb-4 block text-2xl text-sky-400/70"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
                >
                  {serviceIcons[i]}
                </motion.span>

                {/* Accent bar */}
                <div className="mb-5 h-px w-8 bg-gradient-to-r from-sky-400 to-transparent" />

                <h3 className="mb-4 text-xl font-semibold text-white leading-snug">
                  {service.title}
                </h3>

                <p className="mt-auto text-sm leading-relaxed text-white/40">
                  {service.description}
                </p>

                {/* Bottom label */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="h-px flex-1 bg-sky-400/10" />
                  <span className="text-[10px] uppercase tracking-widest text-sky-400/30">
                    En savoir plus
                  </span>
                  <span className="text-[10px] text-sky-400/30">→</span>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
