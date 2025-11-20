import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // creează un medic dacă nu există
  const exists = await prisma.doctor.findFirst({ where: { id: 1 } });
  if (!exists) {
    await prisma.doctor.create({ data: { id: 1, name: "Dr. Popescu" } });
  }
}
main().finally(() => prisma.$disconnect());
