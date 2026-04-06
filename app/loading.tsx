export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-950">
      <div className="space-y-5 text-center">
        <div className="mx-auto h-16 w-16 animate-pulse rounded-full bg-cyan-400/20" />
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Chargement...</p>
      </div>
    </div>
  );
}
