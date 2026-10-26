import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const vehicle = await prisma.vehicle.create({
      data: {
        make: body.make,
        model: body.model,
        year: parseInt(body.year),
        price: parseFloat(body.price),
        status: "Available",
      },
    });
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add vehicle" }, { status: 500 });
  }
}
