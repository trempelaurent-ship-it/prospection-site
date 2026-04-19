import { Prospect, SECTOR_THEMES } from "@/lib/types";

export default function Services({ prospect }: { prospect: Prospect }) {
  const theme = SECTOR_THEMES[prospect.sector];
  return (
    <section className="bg-stone-950 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          Ce que vous faites. <br />
          <span style={{ color: theme.accentColor }}>Mis en valeur.</span>
        </h2>
        <p className="mb-16 max-w-2xl text-lg text-white/60">
          Trois services tirés de votre métier, présentés avec le respect qu'ils méritent.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {prospect.services.map((service, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition hover:border-white/30"
            >
              <div
                className="mb-6 h-1 w-12 transition group-hover:w-24"
                style={{ backgroundColor: theme.accentColor }}
              />
              <h3 className="mb-4 text-2xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="text-base leading-relaxed text-white/70">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
