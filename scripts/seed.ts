import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Database seed script initialized.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
