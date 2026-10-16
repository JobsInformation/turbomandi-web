import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { connected: true, message: 'Successfully connected to Neon PostgreSQL' };
  } catch (error) {
    console.error('Database connection failed:', error);
    return { connected: false, message: 'Could not connect to the database. Check your DATABASE_URL.' };
  }
}
