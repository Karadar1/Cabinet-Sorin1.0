import { NextResponse } from "next/server";
import db from "@/lib/db";
import { genDailySlots } from "@/lib/slots";

interface Slot {
  start: string;
  end: string;
}

interface SlotsResponse {
  slots: Slot[];
}

/**
 * GET /api/slots?date=YYYY-MM-DD&doctorId=1
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const doctorId = Number(searchParams.get("doctorId") ?? 1);

  if (!date) {
    return NextResponse.json<SlotsResponse>({ slots: [] });
  }

  const day = new Date(date + "T00:00:00.000Z"); // ISO
  const all = genDailySlots(day);

  // scoatem sloturile deja ocupate pentru doctorul ales
  const nextDay = new Date(day.getTime() + 24 * 60 * 60 * 1000);

  const exists = await db.appointment.findMany({
    where: {
      doctorId,
      start: { gte: day, lt: nextDay },
    },
    select: { start: true },
  });

  const taken = new Set(exists.map((e) => e.start.toISOString()));

  const free = all.filter((s) => !taken.has(s.start.toISOString()));

  return NextResponse.json<SlotsResponse>({
    slots: free.map((s) => ({
      start: s.start.toISOString(),
      end: s.end.toISOString(),
    })),
  });
}
