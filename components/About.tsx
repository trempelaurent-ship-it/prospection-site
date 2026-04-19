import { Prospect, SECTOR_THEMES } from "@/lib/types";

export default function About({ prospect }: { prospect: Prospect }) {
  const theme = SECTOR_THEMES[prospect.sector];
  return (
    <section className="bg-black px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <p
          className="mb-6 text-sm font-medium uppercase tracking-[0.3em]"
          style={{ color: theme.accentColor }}
        >
          À propos
        </p>
        <p className="text-2xl font-light leading-relaxed text-white md:text-3xl md:leading-[1.5]">
          {prospect.about}
        </p>
      </div>
    </section>
  );
}
