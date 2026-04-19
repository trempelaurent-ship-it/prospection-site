import { Prospect, SECTOR_THEMES } from "@/lib/types";

export default function Hero({ prospect }: { prospect: Prospect }) {
  const theme = SECTOR_THEMES[prospect.sector];
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-60"
          poster="/hero-poster.jpg"
        >
          <source src={theme.videoSrc} type="video/mp4" />
        </video>
      </div>
      <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient} opacity-70`} />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p
          className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/70"
          style={{ color: theme.accentColor }}
        >
          {prospect.sectorLabel}
        </p>
        <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight text-white md:text-7xl">
          {prospect.name}
        </h1>
        <p className="mb-8 max-w-2xl text-xl text-white/90 md:text-2xl">
          {prospect.tagline}
        </p>
        <p className="max-w-3xl text-base text-white/60 md:text-lg">
          {prospect.hero_subtitle}
        </p>
        <a
          href="#contact"
          className="mt-12 rounded-full px-8 py-4 text-base font-semibold text-black transition hover:scale-105"
          style={{ backgroundColor: theme.accentColor }}
        >
          {prospect.cta_text}
        </a>
      </div>
    </section>
  );
}
