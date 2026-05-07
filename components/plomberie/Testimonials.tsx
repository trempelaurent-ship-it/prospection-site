"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { TestimonialCard, Testimonial } from "@/components/ui/testimonial-cards";

const testimonials: Testimonial[] = [
  {
    id: 12,
    testimonial:
      "Fuite d'eau un dimanche soir — ils étaient là en moins d'une heure. Travail propre, prix honnête. Je ne ferai plus appel à personne d'autre.",
    author: "Marie-Claude Bélanger",
    role: "Propriétaire · Laval",
  },
  {
    id: 27,
    testimonial:
      "Remplacement complet du chauffe-eau fait en une demi-journée. Équipe professionnelle, aucune mauvaise surprise sur la facture. Vraiment impressionné.",
    author: "Jonathan Tremblay",
    role: "Client résidentiel · Montréal",
  },
  {
    id: 48,
    testimonial:
      "Je recommande les yeux fermés. Drain bouché réglé en 30 minutes, ils ont même vérifié tout le reste pendant qu'ils y étaient. Service au-delà des attentes.",
    author: "Sophie Archambault",
    role: "Locataire · Longueuil",
  },
  {
    id: 63,
    testimonial:
      "Appel le matin, intervention l'après-midi. Le plombier a expliqué chaque étape clairement. On se sent en confiance du début à la fin.",
    author: "René Gauthier",
    role: "Propriétaire · Brossard",
  },
  {
    id: 7,
    testimonial:
      "Ils ont détecté une fuite derrière le mur sans tout démolir. Vraiment impressionnant — j'aurais perdu des milliers de dollars sans leur expertise.",
    author: "Isabelle Côté",
    role: "Propriétaire · Saint-Lambert",
  },
  {
    id: 33,
    testimonial:
      "Deuxième fois que je fais appel à eux. Toujours aussi professionnels, toujours ponctuels. C'est rare dans ce métier.",
    author: "Martin Lévesque",
    role: "Gestionnaire d'immeubles · Montréal",
  },
];

const TOTAL = testimonials.length;

export default function PlombTestimonials() {
  // positions[i] = rank of card i (0 = front)
  const [positions, setPositions] = useState<number[]>(
    testimonials.map((_, i) => i)
  );

  const deckRef = useRef<HTMLDivElement>(null);
  const wheelAccum = useRef(0);
  const isHovered = useRef(false);

  const handleShuffle = useCallback(() => {
    setPositions((prev) =>
      prev.map((pos) => (pos === 0 ? TOTAL - 1 : pos - 1))
    );
  }, []);

  // Wheel listener attached directly to the deck — passive:false so we can preventDefault
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (!isHovered.current) return;
      e.preventDefault(); // block page scroll
      e.stopPropagation();

      wheelAccum.current += e.deltaY;
      if (Math.abs(wheelAccum.current) >= 180) {
        handleShuffle();
        wheelAccum.current = 0;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [handleShuffle]);

  return (
    <section className="relative bg-[#080C10] py-32 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.45em] text-sky-400">
              Témoignages
            </p>
            <h2 className="text-4xl font-bold text-white md:text-6xl leading-tight">
              Ce que les clients
              <br />
              <span className="text-white/25">disent.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-xs text-sm leading-relaxed text-white/40 md:text-right"
          >
            Survolez les cartes et faites défiler<br className="hidden md:block" /> pour parcourir les avis.
          </motion.p>
        </div>

        {/* Card deck — extra wide container to accommodate the stacked offset */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex justify-center"
        >
          {/* Hover zone — wide enough to cover the full 5-card spread */}
          <div
            ref={deckRef}
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; wheelAccum.current = 0; }}
            className="relative h-[500px] w-[740px]"
          >
            {testimonials.map((t, index) => (
              <TestimonialCard
                key={t.id}
                {...t}
                handleShuffle={handleShuffle}
                position={positions[index]}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
    </section>
  );
}
