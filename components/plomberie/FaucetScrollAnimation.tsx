"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function FaucetScrollAnimation() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Master explode progress: 0 = assembled, 1 = exploded, back to 0
  const progress = useTransform(scrollYProgress, [0.1, 0.48, 0.88], [0, 1, 0]);

  // Per-part explosion vectors
  const headY        = useTransform(progress, [0, 1], [0, -110]);
  const upperY       = useTransform(progress, [0, 1], [0, -55]);
  const handleX      = useTransform(progress, [0, 1], [0, 120]);
  const handleY      = useTransform(progress, [0, 1], [0, -20]);
  const oringX       = useTransform(progress, [0, 1], [0, -100]);
  const lowerY       = useTransform(progress, [0, 1], [0,  65]);
  const nutY         = useTransform(progress, [0, 1], [0, 120]);
  const baseY        = useTransform(progress, [0, 1], [0, 175]);
  const supplyLX     = useTransform(progress, [0, 1], [0, -75]);
  const supplyLY     = useTransform(progress, [0, 1], [0, 210]);
  const supplyRX     = useTransform(progress, [0, 1], [0,  75]);
  const supplyRY     = useTransform(progress, [0, 1], [0, 210]);

  // UI fade values
  const labelOpacity = useTransform(progress, [0.12, 0.5],  [0, 1]);
  const axisOpacity  = useTransform(progress, [0.1,  0.5],  [0, 0.22]);
  const pageOpacity  = useTransform(scrollYProgress, [0, 0.07, 0.93, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#04060A]"
      style={{ minHeight: "290vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">

        {/* Title */}
        <motion.div
          style={{ opacity: pageOpacity }}
          className="absolute top-14 w-full text-center px-6 pointer-events-none"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.45em] text-sky-400/60">
            Technologie · Précision
          </p>
          <h2 className="text-4xl font-bold text-white md:text-6xl">
            Chaque détail.
            <br />
            <span className="text-sky-400">Maîtrisé.</span>
          </h2>
        </motion.div>

        {/* Faucet SVG */}
        <motion.svg
          viewBox="-110 20 620 560"
          className="h-[68vh] max-h-[580px] w-auto"
          style={{ opacity: pageOpacity }}
          suppressHydrationWarning
        >
          <defs>
            <linearGradient id="fct-chrome" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#475569" />
              <stop offset="35%"  stopColor="#E2E8F0" />
              <stop offset="65%"  stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="fct-dark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#1E293B" />
              <stop offset="50%"  stopColor="#64748B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="fct-vert" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#CBD5E1" />
              <stop offset="50%"  stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>

          {/* Center axis */}
          <motion.line
            x1="200" y1="28" x2="200" y2="545"
            stroke="#38BDF8" strokeWidth="0.4" strokeDasharray="8 4"
            style={{ opacity: axisOpacity }}
          />

          {/* ─────────── PART 1 : BEC WATERFALL ─────────── */}
          <motion.g style={{ y: headY }}>
            <rect x="148" y="48" width="104" height="40" rx="5"
              fill="url(#fct-chrome)" stroke="#38BDF8" strokeWidth="0.6" />
            <rect x="153" y="44" width="94" height="10" rx="3"
              fill="url(#fct-dark)" stroke="#38BDF8" strokeWidth="0.4" />
            {/* waterfall slot */}
            <rect x="160" y="84" width="80" height="8" rx="1"
              fill="#020408" stroke="#38BDF8" strokeWidth="0.3" />
            {/* shine */}
            <line x1="156" y1="59" x2="244" y2="59" stroke="white" strokeWidth="0.6" opacity="0.18" />

            {/* label */}
            <motion.g style={{ opacity: labelOpacity }}>
              <line x1="252" y1="70" x2="298" y2="56" stroke="#38BDF8" strokeWidth="0.4" strokeDasharray="2 2" />
              <rect x="300" y="49" width="87" height="16" rx="2" fill="#04060A" stroke="#38BDF8" strokeWidth="0.25" />
              <text x="304" y="60" fill="#94A3B8" fontSize="8" fontFamily="monospace" letterSpacing="0.8">BEC WATERFALL</text>
            </motion.g>
          </motion.g>

          {/* ─────────── PART 2 : CORPS SUPÉRIEUR ─────────── */}
          <motion.g style={{ y: upperY }}>
            <rect x="181" y="92" width="38" height="66" rx="3"
              fill="url(#fct-vert)" stroke="#38BDF8" strokeWidth="0.5" />
            <rect x="174" y="123" width="52" height="11" rx="2"
              fill="url(#fct-dark)" stroke="#38BDF8" strokeWidth="0.3" />
            <line x1="181" y1="107" x2="219" y2="107" stroke="white" strokeWidth="0.4" opacity="0.12" />

            <motion.g style={{ opacity: labelOpacity }}>
              <line x1="181" y1="123" x2="130" y2="107" stroke="#38BDF8" strokeWidth="0.4" strokeDasharray="2 2" />
              <rect x="-104" y="100" width="133" height="16" rx="2" fill="#04060A" stroke="#38BDF8" strokeWidth="0.25" />
              <text x="-101" y="111" fill="#94A3B8" fontSize="8" fontFamily="monospace" letterSpacing="0.8">CORPS SUPÉRIEUR</text>
            </motion.g>
          </motion.g>

          {/* ─────────── PART 3 : LEVIER ─────────── */}
          <motion.g style={{ x: handleX, y: handleY }}>
            <rect x="215" y="150" width="11" height="34" rx="3"
              fill="url(#fct-vert)" stroke="#38BDF8" strokeWidth="0.4" />
            <rect x="221" y="154" width="52" height="14" rx="4"
              fill="url(#fct-chrome)" stroke="#38BDF8" strokeWidth="0.4" />
            <rect x="268" y="157" width="12" height="8" rx="2"
              fill="url(#fct-dark)" stroke="#38BDF8" strokeWidth="0.3" />
            <line x1="223" y1="159" x2="270" y2="159" stroke="white" strokeWidth="0.4" opacity="0.2" />

            <motion.g style={{ opacity: labelOpacity }}>
              <line x1="280" y1="161" x2="310" y2="146" stroke="#38BDF8" strokeWidth="0.4" strokeDasharray="2 2" />
              <rect x="312" y="139" width="100" height="16" rx="2" fill="#04060A" stroke="#38BDF8" strokeWidth="0.25" />
              <text x="315" y="150" fill="#94A3B8" fontSize="8" fontFamily="monospace" letterSpacing="0.8">LEVIER MONOTROU</text>
            </motion.g>
          </motion.g>

          {/* ─────────── PART 4 : CARTOUCHE (pivot) ─────────── */}
          <g>
            <rect x="185" y="156" width="30" height="56" rx="2"
              fill="#080F1A" stroke="#38BDF8" strokeWidth="0.6" />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i}
                x="190" y={163 + i * 11} width="20" height="7" rx="1"
                fill="#38BDF8" fillOpacity="0.1" stroke="#38BDF8" strokeWidth="0.3"
              />
            ))}
            <circle cx="200" cy="184" r="4" fill="#38BDF8" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="0.5" />

            <motion.g style={{ opacity: labelOpacity }}>
              <line x1="215" y1="184" x2="264" y2="197" stroke="#38BDF8" strokeWidth="0.4" strokeDasharray="2 2" />
              <rect x="266" y="190" width="80" height="16" rx="2" fill="#04060A" stroke="#38BDF8" strokeWidth="0.25" />
              <text x="269" y="201" fill="#38BDF8" fontSize="8" fontFamily="monospace" letterSpacing="0.8">CARTOUCHE</text>
            </motion.g>
          </g>

          {/* ─────────── PART 5 : JOINT TORIQUE ─────────── */}
          <motion.g style={{ x: oringX }}>
            <ellipse cx="200" cy="215" rx="22" ry="6"
              fill="none" stroke="#38BDF8" strokeWidth="2.5" />
            <ellipse cx="200" cy="215" rx="15" ry="4"
              fill="none" stroke="#38BDF8" strokeWidth="0.4" opacity="0.4" />

            <motion.g style={{ opacity: labelOpacity }}>
              <line x1="178" y1="215" x2="136" y2="230" stroke="#38BDF8" strokeWidth="0.4" strokeDasharray="2 2" />
              <rect x="-104" y="223" width="139" height="16" rx="2" fill="#04060A" stroke="#38BDF8" strokeWidth="0.25" />
              <text x="-101" y="234" fill="#94A3B8" fontSize="8" fontFamily="monospace" letterSpacing="0.8">JOINT TORIQUE NBR</text>
            </motion.g>
          </motion.g>

          {/* ─────────── PART 6 : CORPS PRINCIPAL ─────────── */}
          <motion.g style={{ y: lowerY }}>
            <rect x="177" y="220" width="46" height="84" rx="4"
              fill="url(#fct-vert)" stroke="#38BDF8" strokeWidth="0.5" />
            {[0, 1, 2, 3].map((i) => (
              <line key={i}
                x1="177" y1={240 + i * 18} x2="223" y2={240 + i * 18}
                stroke="#38BDF8" strokeWidth="0.25" opacity="0.35"
              />
            ))}
            <line x1="186" y1="220" x2="186" y2="304" stroke="white" strokeWidth="0.5" opacity="0.1" />

            <motion.g style={{ opacity: labelOpacity }}>
              <line x1="223" y1="262" x2="268" y2="262" stroke="#38BDF8" strokeWidth="0.4" strokeDasharray="2 2" />
              <rect x="270" y="255" width="106" height="16" rx="2" fill="#04060A" stroke="#38BDF8" strokeWidth="0.25" />
              <text x="273" y="266" fill="#94A3B8" fontSize="8" fontFamily="monospace" letterSpacing="0.8">CORPS PRINCIPAL</text>
            </motion.g>
          </motion.g>

          {/* ─────────── PART 7 : ÉCROU HEXAGONAL ─────────── */}
          <motion.g style={{ y: nutY }}>
            <polygon
              points="200,300 217,310 217,329 200,339 183,329 183,310"
              fill="#0A1628" stroke="#38BDF8" strokeWidth="0.7"
            />
            <polygon
              points="200,305 213,313 213,326 200,334 187,326 187,313"
              fill="none" stroke="#38BDF8" strokeWidth="0.3" opacity="0.4"
            />
            <circle cx="200" cy="319" r="5.5" fill="none" stroke="#38BDF8" strokeWidth="0.5" />

            <motion.g style={{ opacity: labelOpacity }}>
              <line x1="183" y1="319" x2="136" y2="319" stroke="#38BDF8" strokeWidth="0.4" strokeDasharray="2 2" />
              <rect x="-104" y="312" width="139" height="16" rx="2" fill="#04060A" stroke="#38BDF8" strokeWidth="0.25" />
              <text x="-101" y="323" fill="#94A3B8" fontSize="8" fontFamily="monospace" letterSpacing="0.8">ÉCROU DE FIXATION</text>
            </motion.g>
          </motion.g>

          {/* ─────────── PART 8 : ROSACE / BASE ─────────── */}
          <motion.g style={{ y: baseY }}>
            <ellipse cx="200" cy="346" rx="60" ry="13"
              fill="url(#fct-dark)" stroke="#38BDF8" strokeWidth="0.5" />
            <ellipse cx="200" cy="341" rx="60" ry="12"
              fill="url(#fct-chrome)" stroke="#38BDF8" strokeWidth="0.6" />
            <ellipse cx="200" cy="341" rx="48" ry="9"
              fill="none" stroke="#38BDF8" strokeWidth="0.3" opacity="0.35" />
            <line x1="144" y1="341" x2="256" y2="341" stroke="white" strokeWidth="0.5" opacity="0.12" />

            <motion.g style={{ opacity: labelOpacity }}>
              <line x1="260" y1="346" x2="304" y2="358" stroke="#38BDF8" strokeWidth="0.4" strokeDasharray="2 2" />
              <rect x="306" y="351" width="90" height="16" rx="2" fill="#04060A" stroke="#38BDF8" strokeWidth="0.25" />
              <text x="309" y="362" fill="#94A3B8" fontSize="8" fontFamily="monospace" letterSpacing="0.8">ROSACE / BASE</text>
            </motion.g>
          </motion.g>

          {/* ─────────── PARTS 9-10 : FLEXIBLES ─────────── */}
          <motion.g style={{ x: supplyLX, y: supplyLY }}>
            <rect x="183" y="358" width="14" height="24" rx="3"
              fill="url(#fct-dark)" stroke="#38BDF8" strokeWidth="0.5" />
            <circle cx="190" cy="383" r="6" fill="#060C15" stroke="#38BDF8" strokeWidth="0.6" />
            <path d="M 190 389 C 180 405 174 422 177 438"
              stroke="#38BDF8" strokeWidth="1.5" fill="none" strokeDasharray="3 2" strokeLinecap="round" />

            <motion.g style={{ opacity: labelOpacity }}>
              <line x1="183" y1="400" x2="136" y2="420" stroke="#38BDF8" strokeWidth="0.4" strokeDasharray="2 2" />
              <rect x="-104" y="413" width="139" height="16" rx="2" fill="#04060A" stroke="#38BDF8" strokeWidth="0.25" />
              <text x="-101" y="424" fill="#94A3B8" fontSize="8" fontFamily="monospace" letterSpacing="0.8">FLEX. ALIMENTATION</text>
            </motion.g>
          </motion.g>

          <motion.g style={{ x: supplyRX, y: supplyRY }}>
            <rect x="203" y="358" width="14" height="24" rx="3"
              fill="url(#fct-dark)" stroke="#38BDF8" strokeWidth="0.5" />
            <circle cx="210" cy="383" r="6" fill="#060C15" stroke="#38BDF8" strokeWidth="0.6" />
            <path d="M 210 389 C 220 405 226 422 223 438"
              stroke="#38BDF8" strokeWidth="1.5" fill="none" strokeDasharray="3 2" strokeLinecap="round" />
          </motion.g>

        </motion.svg>

        {/* Scroll progress bar */}
        <motion.div
          style={{ opacity: pageOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <div className="h-px w-52 bg-white/[0.05] overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-sky-400 origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <p className="text-[10px] uppercase tracking-[0.42em] text-white/20">
            Défiler pour explorer
          </p>
        </motion.div>

      </div>
    </section>
  );
}
