"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "motion/react";
import { Prospect } from "@/lib/types";

function MagneticButton({ children, href }: { children: React.ReactNode; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useSpring(0, { stiffness: 200, damping: 18 });
  const y = useSpring(0, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-sky-400 px-12 py-5 text-lg font-semibold text-black"
    >
      {/* Shimmer sweep on hover */}
      <motion.span
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={hovered ? { x: "200%" } : { x: "-100%" }}
        transition={{ duration: 0.5 }}
      />

      <motion.span animate={{ x: hovered ? 2 : 0 }} transition={{ duration: 0.2 }}>
        {children}
      </motion.span>

      <motion.span
        animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
        className="font-light"
      >
        →
      </motion.span>
    </motion.a>
  );
}

export default function PlombContact({ prospect }: { prospect: Prospect }) {
  const subject = encodeURIComponent(
    `Intéressé par un site web — ${prospect.name}`
  );
  const mailto = prospect.email
    ? `mailto:${prospect.email}?subject=${subject}`
    : undefined;

  return (
    <section
      id="contact"
      className="relative bg-[#04060A] px-6 py-40 overflow-hidden"
    >
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-[900px] w-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 65%)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          suppressHydrationWarning
        />
      </div>

      {/* Top horizontal line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-xs uppercase tracking-[0.45em] text-sky-400"
        >
          Passez à l'action
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
        >
          Ce site peut être
          <br />
          <span className="text-sky-400">le vôtre.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mb-16 text-lg text-white/30 leading-relaxed"
        >
          Template livré, hébergé, personnalisé à votre nom et à votre métier.
          <br />
          En moins d&apos;une semaine.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <MagneticButton href={mailto}>{prospect.cta_text}</MagneticButton>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-xs text-white/15 uppercase tracking-widest"
          >
            Aucun engagement · Soumission gratuite
          </motion.p>
        </motion.div>

        {/* Bottom signature */}
        {prospect.city && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="mt-20 flex items-center justify-center gap-4"
          >
            <div className="h-px w-16 bg-white/[0.06]" />
            <p className="text-xs text-white/15">
              Préparé pour {prospect.name} · {prospect.city}
            </p>
            <div className="h-px w-16 bg-white/[0.06]" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
