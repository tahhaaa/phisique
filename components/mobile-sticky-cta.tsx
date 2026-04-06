import Link from "next/link";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-950/90 p-3 backdrop-blur md:hidden">
      <Link
        href="/reservation"
        className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-5 py-4 text-sm font-semibold text-brand-950 transition hover:bg-cyan-300"
      >
        Réserver le programme 2ème bac
      </Link>
    </div>
  );
}
