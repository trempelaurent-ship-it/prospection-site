export type Sector = "menuiserie" | "usinage_soudure" | "couvreurs";

export type Prospect = {
  slug: string;
  name: string;
  sector: Sector;
  sectorLabel: string;
  city: string | null;
  region: string | null;
  email: string | null;
  originalSite: string | null;

  // Copy généré par Opus
  tagline: string;
  hero_subtitle: string;
  about: string;
  services: { title: string; description: string }[];
  cta_text: string;

  // Ton commercial personnalisé (pitch email)
  outreach_pitch?: string;
};

export type SectorTheme = {
  videoSrc: string;
  accentColor: string;
  bgGradient: string;
};

export const SECTOR_THEMES: Record<Sector, SectorTheme> = {
  menuiserie: {
    videoSrc: "/videos/menuiserie.mp4",
    accentColor: "#c4753c",
    bgGradient: "from-amber-950 via-stone-900 to-black",
  },
  usinage_soudure: {
    videoSrc: "/videos/usinage.mp4",
    accentColor: "#3b82f6",
    bgGradient: "from-slate-950 via-zinc-900 to-black",
  },
  couvreurs: {
    videoSrc: "/videos/toiture.mp4",
    accentColor: "#64748b",
    bgGradient: "from-slate-900 via-gray-900 to-black",
  },
};
