import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

// One shared Prisma client (avoids opening a new connection on every request)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Never cache the vehicle list at build time
export const dynamic = "force-dynamic";

// Vercel functions reject request bodies over ~4.5 MB
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

function text(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function toPrice(value: unknown): number {
  return Number.parseFloat(String(value ?? "").replace(/[^0-9.]/g, ""));
}

function validYear(year: number): boolean {
  return Number.isInteger(year) && year >= 1950 && year <= new Date().getFullYear() + 1;
}

function isNotFound(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025";
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const make = text(formData.get("make"));
    const model = text(formData.get("model"));
    const year = Number.parseInt(text(formData.get("year")) ?? "", 10);
    const price = toPrice(formData.get("price"));

    if (!make || !model || !validYear(year) || !Number.isFinite(price)) {
      return NextResponse.json(
        { error: "Make, model, a valid year and a valid price are required" },
        { status: 400 }
      );
    }

    // Optional image -> Vercel Blob
    let imageUrl: string | null = null;
    const file = formData.get("image");
    if (file instanceof File && file.size > 0) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "The file must be an image" }, { status: 400 });
      }
      if (file.size > MAX_IMAGE_BYTES) {
        return NextResponse.json({ error: "Image must be smaller than 4 MB" }, { status: 400 });
      }
      const blob = await put(`vehicles/${file.name}`, file, {
        access: "public",
        addRandomSuffix: true,
      });
      imageUrl = blob.url;
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        make,
        model,
        year,
        price,
        status: "Available",
        imageUrl,
        odometer: text(formData.get("odometer")),
        body: text(formData.get("body")),
        trans: text(formData.get("trans")),
        fuel: text(formData.get("fuel")),
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error("Create vehicle error:", error);
    return NextResponse.json({ error: "Failed to add vehicle" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error("Fetch vehicles error:", error);
    return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const payload = await req.json();
    const id = typeof payload?.id === "string" ? payload.id : "";
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const data: Prisma.VehicleUpdateInput = {};

    if (typeof payload.status === "string" && payload.status.trim()) {
      data.status = payload.status.trim();
    }
    if (typeof payload.make === "string" && payload.make.trim()) {
      data.make = payload.make.trim();
    }
    if (typeof payload.model === "string" && payload.model.trim()) {
      data.model = payload.model.trim();
    }
    if (payload.year !== undefined) {
      const year = Number.parseInt(String(payload.year), 10);
      if (!validYear(year)) return NextResponse.json({ error: "Invalid year" }, { status: 400 });
      data.year = year;
    }
    if (payload.price !== undefined) {
      const price = toPrice(payload.price);
      if (!Number.isFinite(price)) return NextResponse.json({ error: "Invalid price" }, { status: 400 });
      data.price = price;
    }
    for (const key of ["odometer", "body", "trans", "fuel"] as const) {
      if (key in payload) {
        const value = payload[key];
        data[key] = typeof value === "string" && value.trim() ? value.trim() : null;
      }
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const vehicle = await prisma.vehicle.update({ where: { id }, data });
    return NextResponse.json(vehicle);
  } catch (error) {
    if (isNotFound(error)) return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    console.error("Update vehicle error:", error);
    return NextResponse.json({ error: "Failed to update vehicle" }, { status: 500 });
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
    if (isNotFound(error)) return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    console.error("Delete vehicle error:", error);
    return NextResponse.json({ error: "Failed to delete vehicle" }, { status: 500 });
  }
}
