import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { getServerSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Connexion admin",
  description: "Accès sécurisé au panneau d'administration.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg">
        <AdminLoginForm />
      </div>
    </main>
  );
}
