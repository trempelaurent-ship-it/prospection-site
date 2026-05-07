"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

interface FaucetSectionProps {
  animationSrc?: string; // Lottie / video / iframe from Fiverr — null = placeholder
}

export default function FaucetSection({ animationSrc }: FaucetSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#04060A] flex flex-col items-center justify-center overflow-hidden px-6 py-32"
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        suppressHydrationWarning
      />

      {/* Horizontal line accents */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent"
        style={{ top: "15%" }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/10 to-transparent"
        style={{ bottom: "15%" }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
      />

      {/* Title */}
      <motion.div style={{ y: titleY }} className="mb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-xs uppercase tracking-[0.45em] text-sky-400/60"
        >
          Technologie · Précision
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl font-bold text-white md:text-7xl"
        >
          Chaque détail.
          <br />
          <span className="text-sky-400">Maîtrisé.</span>
        </motion.h2>
      </motion.div>

      {/* Animation container */}
      <div ref={ref} className="relative w-full max-w-4xl">
        {animationSrc ? (
          /* Drop in the real animation here once received from Fiverr */
          <iframe
            src={animationSrc}
            className="h-[500px] w-full rounded-2xl border-0"
            title="Exploded faucet animation"
          />
        ) : (
          /* Placeholder */
          <div className="relative aspect-video w-full flex items-center justify-center rounded-2xl overflow-hidden">
            {/* Animated SVG border */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 900 506"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.rect
                x="2" y="2" width="896" height="502" rx="18"
                stroke="#38BDF8"
                strokeWidth="1"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Corner accents */}
            {[
              "top-0 left-0",
              "top-0 right-0 rotate-90",
              "bottom-0 right-0 rotate-180",
              "bottom-0 left-0 -rotate-90",
            ].map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos} w-6 h-6`}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.5 + i * 0.1 }}
              >
                <div className="absolute top-0 left-0 h-px w-6 bg-sky-400/70" />
                <div className="absolute top-0 left-0 w-px h-6 bg-sky-400/70" />
              </motion.div>
            ))}

            {/* Inner content */}
            <motion.div
              className="flex flex-col items-center gap-6 text-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {/* Spinning rings */}
              <div className="relative w-24 h-24">
                <motion.div
                  className="absolute inset-0 rounded-full border border-sky-400/20 border-t-sky-400/70"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-3 rounded-full border border-sky-400/10 border-t-sky-400/40"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-6 rounded-full border border-sky-400/15 border-t-sky-400/50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-sky-400"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-white/40 uppercase tracking-[0.3em]">
                  Animation robinet · En cours
                </p>
                <p className="mt-2 text-xs text-white/20 max-w-xs">
                  Séquence d&apos;éclatement 3D d&apos;un robinet de luxe —<br />intégration Fiverr en cours de livraison
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom caption */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-12 text-xs text-white/20 uppercase tracking-widest text-center"
      >
        Robinetterie haut de gamme · Matériaux premium · Pose garantie
      </motion.p>
    </section>
  );
}
