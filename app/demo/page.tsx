"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.85]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={ref} className="relative min-h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Ambient glow */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: glowOpacity,
            background: "radial-gradient(60% 60% at 50% 50%, rgba(217,119,38,0.25) 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Title behind */}
        <motion.h1
          style={{ y: titleY }}
          className="absolute left-1/2 top-[18%] -translate-x-1/2 text-center font-bold tracking-tighter text-white/[0.08]"
        >
          <span className="block text-[14vw] leading-none">ATELIER</span>
        </motion.h1>

        {/* Central 3D object */}
        <motion.div
          className="relative z-10"
          style={{
            rotateY,
            rotateX,
            scale,
            transformStyle: "preserve-3d",
            transformPerspective: 1400,
          }}
        >
          <div className="relative" style={{ transformStyle: "preserve-3d" }}>
            {/* Front face — wood plank */}
            <div
              className="h-[360px] w-[540px] rounded-2xl shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #3a2418 0%, #5c3a22 35%, #8b5a2b 60%, #c89465 100%)",
                boxShadow:
                  "0 40px 80px -20px rgba(217,119,38,0.4), inset 0 2px 0 rgba(255,220,180,0.15), inset 0 -30px 40px rgba(0,0,0,0.3)",
              }}
            >
              {/* Wood grain lines */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px w-full opacity-30"
                  style={{
                    top: `${(i + 1) * 12}%`,
                    background: `linear-gradient(90deg, transparent, rgba(${60 + i * 10},${30 + i * 5},${10},0.6), transparent)`,
                  }}
                />
              ))}
              <div className="relative flex h-full flex-col justify-between p-10">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-200/80" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-amber-100/70">
                    Chêne massif · série 2026
                  </span>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white drop-shadow-lg">
                    Pièce n°4817
                  </p>
                  <p className="mt-1 text-sm text-amber-100/80">
                    Rabotée à 0.2 mm · joint invisible
                  </p>
                </div>
              </div>
            </div>

            {/* Depth face */}
            <div
              className="absolute left-0 top-0 h-[360px] w-[540px] rounded-2xl"
              style={{
                transform: "translateZ(-40px)",
                background: "linear-gradient(135deg, #1a0f08 0%, #2d1a0d 100%)",
                filter: "blur(2px)",
                opacity: 0.6,
              }}
            />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          style={{ y: subtitleY }}
          className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-amber-500/80">
            ↓ Scroll pour inspecter
          </p>
        </motion.div>
      </div>

      {/* Scroll reveal sections */}
      <div className="relative z-20 mx-auto max-w-4xl px-6 pb-32">
        <RevealSection index={0}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-500/80">
            01 — La matière
          </p>
          <h2 className="mt-4 text-5xl font-bold text-white md:text-7xl">
            Le chêne blanc.<br />Raboté au millième.
          </h2>
        </RevealSection>

        <RevealSection index={1}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-500/80">
            02 — Le geste
          </p>
          <h2 className="mt-4 text-5xl font-bold text-white md:text-7xl">
            Joints à queue<br />d'aronde, à la main.
          </h2>
        </RevealSection>
      </div>
    </div>
  );
}

function RevealSection({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="py-32"
    >
      {children}
    </motion.div>
  );
}
