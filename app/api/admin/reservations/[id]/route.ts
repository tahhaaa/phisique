import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { deleteReservation, updateReservation } from "@/lib/db";
import { reservationUpdateSchema } from "@/lib/validation";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await context.params;
  const body = await request.json();
  const parsed = reservationUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Réservation invalide." }, { status: 400 });
  }

  const reservation = updateReservation(Number(id), {
    ...parsed.data,
    city: "",
  });
  return NextResponse.json(reservation);
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await context.params;
  deleteReservation(Number(id));
  return NextResponse.json({ success: true });
}
