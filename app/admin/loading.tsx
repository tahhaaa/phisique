export default function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-cyan-300/20 border-t-cyan-300" />
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Chargement du dashboard...</p>
      </div>
    </div>
  );
}
