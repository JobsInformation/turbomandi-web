import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Switch from JSON to FormData to handle file uploads
    const formData = await req.formData();
    
    const make = formData.get("make") as string;
    const model = formData.get("model") as string;
    const year = formData.get("year") as string;
    const price = formData.get("price") as string;
    const file = formData.get("image") as File | null;

    let imageUrl = null;

    // If an image was uploaded, send it to Vercel Blob
    if (file && file.size > 0) {
      const blob = await put(file.name, file, { access: "public" });
      imageUrl = blob.url;
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        make,
        model,
        year: parseInt(year),
        price: parseFloat(price),
        status: "Available",
        imageUrl,
      },
    });
    
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to add vehicle" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    
    await prisma.vehicle.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete vehicle" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) return NextResponse.json({ error: "Missing data" }, { status: 400 });

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(vehicle);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
