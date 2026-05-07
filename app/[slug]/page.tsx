import { notFound } from "next/navigation";
import PlombHero from "@/components/plomberie/Hero";
import FaucetScrollAnimation from "@/components/plomberie/FaucetScrollAnimation";
import PlombServices from "@/components/plomberie/Services";
import PlombStats from "@/components/plomberie/Stats";
import PlombTestimonials from "@/components/plomberie/Testimonials";
import PlombContact from "@/components/plomberie/Contact";
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

  if (prospect.sector === "plomberie") {
    return (
      <main className="min-h-screen bg-[#080C10]">
        <PlombHero prospect={prospect} />
        <FaucetScrollAnimation />
        <PlombServices prospect={prospect} />
        <PlombStats />
        <PlombTestimonials />
        <PlombContact prospect={prospect} />
      </main>
    );
  }

  return notFound();
}
