import { BarChart3, GraduationCap, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";

const items = [
  {
    icon: GraduationCap,
    title: "Spécialisation 2ème bac",
    description:
      "Le site et l’offre sont pensés pour la 2ème bac uniquement, avec un contenu, un rythme et des objectifs alignés sur cette année décisive.",
  },
  {
    icon: BarChart3,
    title: "Séparation en deux groupes",
    description:
      "Les élèves sont orientés vers un groupe bon niveau ou un groupe niveau à renforcer, pour garder un rythme juste et des progrès plus rapides.",
  },
  {
    icon: Sparkles,
    title: "Méthode claire et énergique",
    description:
      "Des explications simples, un entraînement intensif, des corrections utiles et une ambiance de travail qui motive jusqu’au jour de l’examen.",
  },
];

export function PresentationSection() {
  return (
    <section id="presentation" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Présentation</p>
        <h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">Une offre plus précise, plus lisible, plus efficace</h2>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          L’objectif est de proposer une expérience 2ème bac beaucoup plus ciblée que les sites généralistes.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal
              key={item.title}
              delay={index * 120}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/30"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{item.description}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
