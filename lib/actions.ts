// @ts-nocheck
'use server';

import { prisma, checkDatabaseConnection } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getNeonData() {
  const dbCheck = await checkDatabaseConnection();
  if (!dbCheck.connected) {
    return { dbConfigured: false, message: dbCheck.message, vehicles: [], orders: [], bookings: [], parts: [] };
  }

  try {
    const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: 'desc' } });
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
    const bookings = await prisma.serviceBooking.findMany({ orderBy: { createdAt: 'desc' } });
    const parts = await prisma.part.findMany({ orderBy: { createdAt: 'desc' } });

    return { dbConfigured: true, vehicles, orders, bookings, parts };
  } catch (error) {
    return { dbConfigured: false, message: 'Database query error.', vehicles: [], orders: [], bookings: [], parts: [] };
  }
}

export async function createVehicleInNeon(data: any) {
  try {
    await prisma.vehicle.create({
      data: {
        title: String(data.title || ''),
        brand: String(data.brand || ''),
        model: String(data.model || ''),
        year: Number(data.year) || 2026,
        price: Number(data.price) || 0,
        mileage: Number(data.mileage) || 0,
        condition: String(data.condition || 'Used'),
        fuelType: String(data.fuelType || 'Petrol'),
        transmission: String(data.transmission || 'Automatic'),
        image: String(data.image || ''),
        description: String(data.description || ''),
      },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function deleteVehicleFromNeon(id: any) {
  try {
    const parsedId = isNaN(Number(id)) ? String(id) : Number(id);
    await prisma.vehicle.delete({ where: { id: parsedId } });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete vehicle.' };
  }
}

export async function createPartInNeon(data: any) {
  try {
    await prisma.part.create({
      data: {
        name: String(data.name || ''),
        category: String(data.category || ''),
        price: Number(data.price) || 0,
        stock: Number(data.stock) || 0,
        image: String(data.image || ''),
      },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create part.' };
  }
}

export async function deletePartFromNeon(id: any) {
  try {
    const parsedId = isNaN(Number(id)) ? String(id) : Number(id);
    await prisma.part.delete({ where: { id: parsedId } });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete part.' };
  }
}

export async function createOrderInNeon(data: any) {
  try {
    const order = await prisma.order.create({
      data: {
        customerName: String(data.customerName || ''),
        customerPhone: String(data.customerPhone || data.phone || ''),
        customerEmail: String(data.customerEmail || data.email || ''),
        itemTitle: String(data.itemTitle || ''),
        itemType: String(data.itemType || 'VEHICLE'),
        totalAmount: Number(data.totalAmount) || 0,
        status: String(data.status || 'PENDING'),
      },
    });
    revalidatePath('/admin');
    return { success: true, order };
  } catch (error) {
    return { success: false, error: 'Failed to create order.' };
  }
}

export async function updateOrderStatusInNeon(id: any, status: string) {
  try {
    const parsedId = isNaN(Number(id)) ? String(id) : Number(id);
    await prisma.order.update({ where: { id: parsedId }, data: { status: String(status) } });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update order.' };
  }
}

export async function deleteOrderFromNeon(id: any) {
  try {
    const parsedId = isNaN(Number(id)) ? String(id) : Number(id);
    await prisma.order.delete({ where: { id: parsedId } });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete order.' };
  }
}

export async function updateBookingStatusInNeon(id: any, status: string) {  
  try {
    const parsedId = isNaN(Number(id)) ? String(id) : Number(id);
    await prisma.serviceBooking.update({ where: { id: parsedId }, data: { status: String(status) } });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update booking.' };
  }
}

export async function deleteBookingFromNeon(id: any) {
  try {
    const parsedId = isNaN(Number(id)) ? String(id) : Number(id);
    await prisma.serviceBooking.delete({ where: { id: parsedId } });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete booking.' };
  }
}
