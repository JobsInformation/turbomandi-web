import React from 'react';
import { prisma } from '@/lib/prisma';
import PartsDisplay from './PartsDisplay';

export const revalidate = 0; // Disable caching to always show real-time stock numbers

export default async function PartsPage() {
  const parts = await prisma.part.findMany({
    orderBy: { id: 'asc' },
  });

  return <PartsDisplay initialParts={parts} />;
}
