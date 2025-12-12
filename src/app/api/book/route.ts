import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const BookSchema = z.object({
  doctorId: z.coerce.number().optional(),
  startISO: z.string().datetime(),
  endISO: z.string().datetime(),
  name: z.string().min(2),
  phone: z.string().min(6),
  species: z.string().min(2),
  reason: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Body lipsă sau JSON invalid. Pune Content-Type: application/json.",
        },
        { status: 400 }
      );
    }

    const parsed = BookSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Date invalide", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    // verifică existența doctorului (doar dacă e specificat)
    if (data.doctorId) {
      const doctor = await prisma.doctor.findUnique({
        where: { id: data.doctorId },
      });
      if (!doctor) {
        return NextResponse.json(
          { ok: false, error: `Doctorul #${data.doctorId} nu există.` },
          { status: 400 }
        );
      }
    }

    const appt = await prisma.appointment.create({
      data: {
        doctorId: data.doctorId,
        start: new Date(data.startISO),
        end: new Date(data.endISO),
        name: data.name,
        phone: data.phone,
        species: data.species,
        reason: data.reason,
      },
    });

    return NextResponse.json({ ok: true, id: appt.id });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json(
        { ok: false, error: "Slotul tocmai a fost ocupat. Alege altă oră." },
        { status: 409 }
      );
    }
    if (e.code === "P2003") {
      return NextResponse.json(
        { ok: false, error: "Doctor inexistent (FK). Verifică seed-ul/ID-ul." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "Eroare server la programare." },
      { status: 500 }
    );
  }
}
