import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

const levels = [
  {
    title: "Groupe Bon niveau",
    subtitle: "Rythme avancé",
    description: "Pour les élèves déjà à l’aise, avec un travail plus intense, plus rapide et plus orienté performance au bac.",
  },
  {
    title: "Groupe Niveau à renforcer",
    subtitle: "Remise à niveau stratégique",
    description: "Pour les élèves qui ont besoin de reprendre les bases, corriger les blocages et progresser sans pression inutile.",
  },
];

export function LevelsSection() {
  return (
    <section id="niveaux" className="relative overflow-hidden border-y border-white/10 bg-white/5 py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Groupes disponibles</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">Deux groupes séparés pour mieux faire progresser les élèves de 2ème bac</h2>
          </div>
          <Link
            href="/reservation"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
          >
            Réserver maintenant
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {levels.map((level, index) => (
            <Reveal
              key={level.title}
              delay={index * 120}
              className="group rounded-[2rem] border border-white/10 bg-brand-950/70 p-8 shadow-xl transition hover:-translate-y-1 hover:border-cyan-300/40"
            >
              <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100">
                {level.subtitle}
              </span>
              <h3 className="mt-6 font-heading text-3xl font-semibold text-white">{level.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{level.description}</p>
              <Link
                href="/reservation"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition group-hover:translate-x-1"
              >
                Rejoindre ce groupe
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
