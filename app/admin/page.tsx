import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";
import { getDashboardStats, getReservations, getSiteSettings } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard admin",
  description: "Gestion sécurisée des réservations et des bénéfices.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  await requireAdminSession();

  return (
    <main className="min-h-screen px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminDashboard
          initialReservations={getReservations()}
          initialStats={getDashboardStats()}
          initialSettings={getSiteSettings()}
        />
      </div>
    </main>
  );
}
