import type { Metadata } from "next";
import { CtaStrip } from "@/components/cta-strip";
import { HeroSection } from "@/components/hero-section";
import { LevelsSection } from "@/components/levels-section";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { PresentationSection } from "@/components/presentation-section";
import { ProgramHighlights } from "@/components/program-highlights";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Accueil",
  description: "βeta Physique, centre premium de physique pour la 2ème bac avec réservation de groupes spécialisés.",
};

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <PresentationSection />
      <LevelsSection />
      <ProgramHighlights />
      <CtaStrip />
      <SiteFooter />
      <MobileStickyCta />
    </main>
  );
}
