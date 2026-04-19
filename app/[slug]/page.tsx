import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { getAllProspects, getProspectBySlug } from "@/lib/prospects";

export async function generateStaticParams() {
  return getAllProspects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prospect = getProspectBySlug(slug);
  if (!prospect) return {};
  return {
    title: `${prospect.name} — Proposition de site web`,
    description: prospect.tagline,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prospect = getProspectBySlug(slug);
  if (!prospect) notFound();

  return (
    <main className="min-h-screen bg-black">
      <Hero prospect={prospect} />
      <About prospect={prospect} />
      <Services prospect={prospect} />
      <Contact prospect={prospect} />
    </main>
  );
}
