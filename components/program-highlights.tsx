import Link from "next/link";
import { BadgeCheck, ChartColumnIncreasing, MessageCircleHeart, TimerReset } from "lucide-react";
import { Reveal } from "@/components/reveal";

const features = [
  {
    icon: BadgeCheck,
    title: "Évaluation plus juste",
    description: "Chaque élève rejoint un groupe cohérent avec son niveau réel pour éviter les écarts qui ralentissent la progression.",
  },
  {
    icon: ChartColumnIncreasing,
    title: "Suivi de progression",
    description: "Le panneau admin permet un suivi simple des réservations confirmées, des groupes et des revenus réellement attendus.",
  },
  {
    icon: MessageCircleHeart,
    title: "Relance WhatsApp rapide",
    description: "Un message prêt à envoyer permet de relancer l’élève avec plus d’énergie et un ton plus engageant.",
  },
  {
    icon: TimerReset,
    title: "Expérience mobile améliorée",
    description: "Les formulaires, les cartes et les actions admin ont été optimisés pour rester lisibles sur téléphone.",
  },
];

export function ProgramHighlights() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Fonctionnalités</p>
        <h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">
          Une plateforme plus utile pour le professeur et plus claire pour les élèves
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Reveal
              key={feature.title}
              delay={index * 100}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{feature.description}</p>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10 flex justify-center">
        <Link
          href="/reservation"
          className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-4 font-semibold text-brand-950 transition hover:bg-cyan-300"
        >
          Réserver une place maintenant
        </Link>
      </Reveal>
    </section>
  );
}
