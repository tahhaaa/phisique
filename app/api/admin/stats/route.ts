import { NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/api-error";
import { requireAdminSession } from "@/lib/auth";
import { getDashboardStats } from "@/lib/db";

export async function GET() {
  await requireAdminSession();
  try {
    return NextResponse.json(await getDashboardStats());
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error, "Impossible de charger les statistiques.") }, { status: 500 });
  }
}
