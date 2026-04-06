import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getSiteSettings, updateSiteSettings } from "@/lib/db";
import { siteSettingsSchema } from "@/lib/validation";

export async function GET() {
  await requireAdminSession();
  return NextResponse.json(getSiteSettings());
}

export async function PUT(request: Request) {
  await requireAdminSession();
  const body = await request.json();
  const parsed = siteSettingsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Paramètres invalides." }, { status: 400 });
  }

  return NextResponse.json(updateSiteSettings(parsed.data));
}
