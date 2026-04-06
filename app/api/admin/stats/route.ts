import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getDashboardStats } from "@/lib/db";

export async function GET() {
  await requireAdminSession();
  return NextResponse.json(getDashboardStats());
}
