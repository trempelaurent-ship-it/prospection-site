import Link from "next/link";
import { getAllProspects } from "@/lib/prospects";
import { SECTOR_THEMES } from "@/lib/types";

export default function Home() {
  const prospects = getAllProspects();

  return (
    <main className="min-h-screen bg-black px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/50">
          Propositions de sites
        </p>
        <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
          Un aperçu pour chaque entreprise.
        </h1>
        <p className="mb-16 max-w-2xl text-lg text-white/70">
          Chaque page est une proposition sur mesure — livrée et hébergée pour la PME dont elle porte le nom.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {prospects.map((p) => {
            const theme = SECTOR_THEMES[p.sector];
            return (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition hover:border-white/30 hover:bg-white/[0.05]"
              >
                <p
                  className="mb-3 text-xs font-medium uppercase tracking-[0.25em]"
                  style={{ color: theme.accentColor }}
                >
                  {p.sectorLabel}
                </p>
                <h2 className="mb-2 text-2xl font-semibold text-white">
                  {p.name}
                </h2>
                <p className="mb-6 text-sm text-white/60">
                  {[p.city, p.region].filter(Boolean).join(", ") || "Québec"}
                </p>
                <p className="text-sm text-white/80">{p.tagline}</p>
                <p
                  className="mt-6 text-sm font-medium transition group-hover:translate-x-1"
                  style={{ color: theme.accentColor }}
                >
                  Voir l'aperçu →
                </p>
              </Link>
            );
          })}
        </div>

        {prospects.length === 0 && (
          <p className="text-white/60">Aucune proposition chargée.</p>
        )}
      </div>
    </main>
  );
}
