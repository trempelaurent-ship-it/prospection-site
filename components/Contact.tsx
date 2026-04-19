import { Prospect, SECTOR_THEMES } from "@/lib/types";

export default function Contact({ prospect }: { prospect: Prospect }) {
  const theme = SECTOR_THEMES[prospect.sector];
  const subject = encodeURIComponent(
    `Intéressé par un site comme celui-ci — ${prospect.name}`,
  );
  const mailto = prospect.email
    ? `mailto:${prospect.email}?subject=${subject}`
    : undefined;

  return (
    <section id="contact" className={`bg-gradient-to-b ${theme.bgGradient} px-6 py-24 md:py-32`}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-6 text-4xl font-bold text-white md:text-6xl">
          Ce site peut être le vôtre.
        </h2>
        <p className="mb-12 text-xl text-white/80">
          Template déjà fait, personnalisé à votre nom et à votre métier. Livré et
          hébergé en moins d'une semaine.
        </p>
        {mailto ? (
          <a
            href={mailto}
            className="inline-block rounded-full px-10 py-5 text-lg font-semibold text-black transition hover:scale-105"
            style={{ backgroundColor: theme.accentColor }}
          >
            {prospect.cta_text}
          </a>
        ) : (
          <p className="text-lg text-white/60">Contactez-nous pour en discuter.</p>
        )}
        {prospect.city && (
          <p className="mt-8 text-sm text-white/40">
            Livré pour {prospect.name} · {prospect.city}
            {prospect.region ? `, ${prospect.region}` : ""}
          </p>
        )}
      </div>
    </section>
  );
}
