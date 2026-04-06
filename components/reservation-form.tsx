"use client";

import { useState, useTransition } from "react";
import { LoaderCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { SCHOOL_LEVELS } from "@/lib/constants";
import type { SiteSettings } from "@/lib/types";

type ReservationFormProps = {
  courseFormats: SiteSettings["courseFormats"];
};

const baseInitialForm = {
  studentName: "",
  school: "",
  level: SCHOOL_LEVELS[0],
  courseFormat: "Cours collectif mini groupe",
  whatsapp: "",
};

export function ReservationForm({ courseFormats }: ReservationFormProps) {
  const availableFormats = courseFormats.length ? courseFormats : [];
  const [form, setForm] = useState({
    ...baseInitialForm,
    courseFormat: availableFormats[0]?.id ?? baseInitialForm.courseFormat,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  function setField(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { errors?: Record<string, string>; message?: string };

      if (!response.ok) {
        setErrors(payload.errors ?? {});
        toast.error(payload.message ?? "Impossible d’envoyer la réservation.");
        return;
      }

      setForm({
        ...baseInitialForm,
        courseFormat: availableFormats[0]?.id ?? baseInitialForm.courseFormat,
      });
      setErrors({});
      toast.success("Votre réservation a bien été envoyée.");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-7">
      <div className="rounded-[1.5rem] border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm text-cyan-100">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
          <p>
            Ce formulaire est réservé aux élèves de <strong>2ème bac</strong>. Choisissez simplement le groupe qui
            correspond le mieux au niveau actuel de l’élève.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Nom élève"
          value={form.studentName}
          error={errors.studentName}
          onChange={(value) => setField("studentName", value)}
        />
        <Field label="École / Lycée" value={form.school} error={errors.school} onChange={(value) => setField("school", value)} />
        <SelectField
          label="Groupe souhaité"
          value={form.level}
          onChange={(value) => setField("level", value)}
          items={SCHOOL_LEVELS.map((level) => ({ value: level, label: level }))}
        />
        <SelectField
          label="Type de cours"
          value={form.courseFormat}
          onChange={(value) => setField("courseFormat", value)}
          items={availableFormats.map((format) => ({ value: format.id, label: format.label }))}
        />
        <Field
          label="Numéro WhatsApp"
          value={form.whatsapp}
          error={errors.whatsapp}
          onChange={(value) => setField("whatsapp", value)}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-4 font-semibold text-brand-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? <LoaderCircle className="h-5 w-5 animate-spin" /> : null}
        Réserver ma place en 2ème bac
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  error,
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-brand-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60"
      />
      {error ? <span className="mt-2 block text-sm text-rose-300">{error}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  value,
  items,
  onChange,
}: {
  label: string;
  value: string;
  items: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-brand-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
