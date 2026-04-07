import { NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/api-error";
import { requireAdminSession } from "@/lib/auth";
import { getLatestReservation } from "@/lib/db";

export async function GET(request: Request) {
  await requireAdminSession();

  const { searchParams } = new URL(request.url);
  const knownId = Number(searchParams.get("knownId") ?? "0");
  try {
    const reservation = await getLatestReservation();

    return NextResponse.json({
      reservation,
      isNew: !!reservation && reservation.id > knownId,
    });
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error, "Impossible de vérifier les nouvelles réservations.") }, { status: 500 });
  }
}
