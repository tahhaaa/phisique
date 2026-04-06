import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getLatestReservation } from "@/lib/db";

export async function GET(request: Request) {
  await requireAdminSession();

  const { searchParams } = new URL(request.url);
  const knownId = Number(searchParams.get("knownId") ?? "0");
  const reservation = getLatestReservation();

  return NextResponse.json({
    reservation,
    isNew: !!reservation && reservation.id > knownId,
  });
}
