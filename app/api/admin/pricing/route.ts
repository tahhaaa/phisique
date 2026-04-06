import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getPricing, updatePricing } from "@/lib/db";
import { pricingSchema } from "@/lib/validation";

export async function GET() {
  await requireAdminSession();
  return NextResponse.json(getPricing());
}

export async function PUT(request: Request) {
  await requireAdminSession();
  const body = await request.json();
  const parsed = pricingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Tarifs invalides." }, { status: 400 });
  }

  return NextResponse.json(updatePricing(parsed.data));
}
