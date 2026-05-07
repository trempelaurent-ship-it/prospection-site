"use client";

import * as React from "react";
import { motion } from "motion/react";

export interface Testimonial {
  id: number;
  testimonial: string;
  author: string;
  role?: string;
}

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  /** Numeric position: 0 = front, 1 = middle, 2 = back, 3+ = hidden behind back */
  position: number;
  id: number;
  author: string;
  role?: string;
}

function positionStyles(pos: number): {
  rotate: string;
  x: string;
  zIndex: number;
  opacity: number;
  scale: number;
} {
  if (pos === 0) return { rotate: "-10deg", x:   "0%", zIndex: 5, opacity: 1.00, scale: 1.00 };
  if (pos === 1) return { rotate:  "-5deg", x:  "22%", zIndex: 4, opacity: 1.00, scale: 0.97 };
  if (pos === 2) return { rotate:   "0deg", x:  "44%", zIndex: 3, opacity: 0.85, scale: 0.94 };
  if (pos === 3) return { rotate:   "5deg", x:  "66%", zIndex: 2, opacity: 0.60, scale: 0.91 };
  if (pos === 4) return { rotate:  "10deg", x:  "88%", zIndex: 1, opacity: 0.35, scale: 0.88 };
  // 5+ hidden behind
  return          { rotate:  "12deg", x:  "92%", zIndex: 0, opacity: 0.00, scale: 0.85 };
}

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  id,
  author,
  role,
}: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === 0;
  const { rotate, x, zIndex, opacity, scale } = positionStyles(position);

  return (
    <motion.div
      style={{ zIndex }}
      animate={{ rotate, x, opacity, scale }}
      drag={isFront}
      dragElastic={0.35}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e: PointerEvent) => {
        dragRef.current = e.clientX;
      }}
      onDragEnd={(e: PointerEvent) => {
        if (dragRef.current - e.clientX > 150) handleShuffle();
        dragRef.current = 0;
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute left-0 top-0 flex h-[480px] w-[360px] select-none flex-col items-center justify-center gap-5 rounded-2xl border border-sky-400/20 bg-[#080C10]/70 p-8 shadow-2xl shadow-black/60 backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
    >
      {/* Avatar */}
      <img
        src={`https://i.pravatar.cc/128?img=${id}`}
        alt={`Avatar de ${author}`}
        className="h-24 w-24 rounded-full border-2 border-sky-400/30 object-cover"
      />

      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="h-4 w-4 fill-sky-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-center text-base italic leading-relaxed text-white/60">
        &ldquo;{testimonial}&rdquo;
      </p>

      {/* Author */}
      <div className="text-center">
        <p className="text-sm font-semibold text-white">{author}</p>
        {role && (
          <p className="mt-1 text-xs uppercase tracking-widest text-sky-400/60">
            {role}
          </p>
        )}
      </div>

      {isFront && (
        <p className="text-[10px] uppercase tracking-widest text-white/20">
          ← glissez · ou roulette souris
        </p>
      )}
    </motion.div>
  );
}
