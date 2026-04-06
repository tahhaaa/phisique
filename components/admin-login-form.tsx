"use client";

import { useState, useTransition } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AdminLoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { errors?: Record<string, string>; message?: string };

      if (!response.ok) {
        setErrors(payload.errors ?? {});
        toast.error(payload.message ?? "Connexion impossible.");
        return;
      }

      toast.success("Connexion réussie.");
      router.push("/admin");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
        <LockKeyhole className="h-7 w-7" />
      </div>

      <div>
        <h1 className="font-heading text-3xl font-semibold text-white">Connexion admin</h1>
        <p className="mt-2 text-slate-300">Accédez au tableau de bord sécurisé pour gérer les réservations.</p>
      </div>

      <Field
        label="Nom d'utilisateur"
        value={form.username}
        error={errors.username}
        onChange={(value) => setForm((current) => ({ ...current, username: value }))}
      />
      <Field
        label="Mot de passe"
        type="password"
        value={form.password}
        error={errors.password}
        onChange={(value) => setForm((current) => ({ ...current, password: value }))}
      />

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-4 font-semibold text-brand-950 transition hover:bg-cyan-300 disabled:opacity-70"
      >
        {isPending ? <LoaderCircle className="h-5 w-5 animate-spin" /> : null}
        Se connecter
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  error,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-brand-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
      />
      {error ? <span className="mt-2 block text-sm text-rose-300">{error}</span> : null}
    </label>
  );
}
