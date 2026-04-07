import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/api-error";
import { createCookieValue, verifyPassword } from "@/lib/auth";
import { getAdminByUsername } from "@/lib/db";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { loginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Identifiants invalides.",
        errors: Object.fromEntries(
          Object.entries(parsed.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0] ?? "Champ invalide"]),
        ),
      },
      { status: 400 },
    );
  }

  try {
    const admin = await getAdminByUsername(parsed.data.username);
    if (!admin || !verifyPassword(parsed.data.password, admin.password_hash)) {
      return NextResponse.json({ message: "Nom d'utilisateur ou mot de passe incorrect." }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, createCookieValue(admin.username), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error, "Connexion admin impossible.") }, { status: 500 });
  }
}
