import { NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/api-error";
import { requireAdminSession } from "@/lib/auth";
import { getReservations } from "@/lib/db";

export async function GET() {
  await requireAdminSession();
  try {
    return NextResponse.json(await getReservations());
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error, "Impossible de charger les réservations.") }, { status: 500 });
  }
}
