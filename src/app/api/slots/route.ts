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

// Define the shape of the slot object returned by genDailySlots
interface DailySlot {
  start: Date;
  end: Date;
}

// Define the shape of the result from the Prisma query
interface AppointmentStart {
  start: Date;
}

/**
 * GET /api/slots?date=YYYY-MM-DD&doctorId=1
 */
// The 'req' parameter is typed by Next.js as 'Request'
export async function GET(req: Request) {
  // 'searchParams' is typed as URLSearchParams
  const { searchParams }: { searchParams: URLSearchParams } = new URL(req.url);

  // Explicitly type 'date' as string | null
  const date: string | null = searchParams.get("date");

  // Explicitly type 'doctorId' as number | null
  const doctorIdParam = searchParams.get("doctorId");
  const doctorId: number | undefined = doctorIdParam ? Number(doctorIdParam) : undefined;

  if (!date) {
    return NextResponse.json<SlotsResponse>({ slots: [] });
  }

  // 'day' is typed as Date
  const day: Date = new Date(date + "T00:00:00.000Z"); // ISO

  // Explicitly type 'all' based on the interface DailySlot
  const all: DailySlot[] = genDailySlots(day);

  // scoatem sloturile deja ocupate pentru doctorul ales
  // 'nextDay' is typed as Date
  const nextDay: Date = new Date(day.getTime() + 24 * 60 * 60 * 1000);

  // 'exists' is typed based on the AppointmentStart interface
  const exists: AppointmentStart[] = await db.appointment.findMany({
    where: {
      doctorId,
      start: { gte: day, lt: nextDay },
    },
    select: { start: true },
  });

  // 'taken' is typed as a Set of strings (ISO Date strings)
  interface AppointmentStart {
    start: Date;
  }

  // ... inside the GET function ...

  const taken: Set<string> = new Set(
    exists.map((e: AppointmentStart) => e.start.toISOString())
  );
  // Explicitly type 'free' based on the interface DailySlot
  const free: DailySlot[] = all.filter(
    (s: DailySlot) => !taken.has(s.start.toISOString())
  );

  return NextResponse.json<SlotsResponse>({
    // 's' is typed as DailySlot within the map function
    slots: free.map((s: DailySlot) => ({
      start: s.start.toISOString(),
      end: s.end.toISOString(),
    })),
  });
}