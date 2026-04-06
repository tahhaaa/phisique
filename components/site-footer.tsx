import Image from "next/image";
import Link from "next/link";
import { BRAND_FULL_NAME } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo Beta Physique" width={36} height={36} className="h-9 w-9 rounded-xl object-contain" />
          <p>{BRAND_FULL_NAME}, identité scientifique premium pour la 2ème bac.</p>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/reservation" className="transition hover:text-cyan-300">
            Réservation
          </Link>
          <Link href="/admin" className="transition hover:text-cyan-300">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
