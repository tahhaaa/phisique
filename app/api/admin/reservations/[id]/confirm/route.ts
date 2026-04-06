import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { confirmReservation } from "@/lib/db";

export async function POST(_: Request, context: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await context.params;
  return NextResponse.json(confirmReservation(Number(id)));
}
