import { NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/api-error";
import { requireAdminSession } from "@/lib/auth";
import { confirmReservation } from "@/lib/db";

export async function POST(_: Request, context: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await context.params;
  try {
    return NextResponse.json(await confirmReservation(Number(id)));
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error, "Confirmation impossible.") }, { status: 500 });
  }
}
