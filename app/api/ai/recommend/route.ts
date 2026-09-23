import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const lowerQuery = query.toLowerCase();
    
    const stopWords = ['hello', 'tell', 'me', 'about', 'what', 'do', 'you', 'have', 'for', 'a', 'an', 'the', 'show', 'is', 'are', 'can', 'please', 'details', 'info'];
    const keywords = lowerQuery
      .replace(/[^\w\s]/gi, '')
      .split(/\s+/)
      .filter((w: string) => w.length > 1 && !stopWords.includes(w));

    const searchTerms = keywords.length > 0 ? keywords : [lowerQuery];

    const partConditions = searchTerms.flatMap((term: string) => [
      { name: { contains: term } },
      { category: { contains: term } },
      { sku: { contains: term } }
    ]);

    const vehicleConditions = searchTerms.flatMap((term: string) => [
      { make: { contains: term } },
      { model: { contains: term } },
      { type: { contains: term } },
      { tag: { contains: term } }
    ]);

    const parts = await prisma.part.findMany({
      where: { OR: partConditions }
    });

    const vehicles = await prisma.vehicle.findMany({
      where: { OR: vehicleConditions }
    });

    let responseText = `Here are the matching vehicle specifications and available inventory for "${query}":`;
    if (parts.length === 0 && vehicles.length === 0) {
      responseText = `I couldn't find exact matches for "${query}". Try searching for specific models like "Civic", "Fortuner", "Sportage", or "Swift".`;
    }

    return NextResponse.json({
      response: responseText,
      parts,
      vehicles
    }, { status: 200 });

  } catch (error) {
    console.error('AI Recommendation Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
