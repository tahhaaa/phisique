import { NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/api-error";
import { createReservation } from "@/lib/db";
import { reservationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = reservationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Veuillez corriger les champs du formulaire.",
        errors: Object.fromEntries(
          Object.entries(parsed.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0] ?? "Champ invalide"]),
        ),
      },
      { status: 400 },
    );
  }

  try {
    const reservation = await createReservation(parsed.data);
    return NextResponse.json(
      {
        message: "Réservation enregistrée avec succès.",
        reservation,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error, "Impossible d'enregistrer la réservation.") }, { status: 500 });
  }
}
