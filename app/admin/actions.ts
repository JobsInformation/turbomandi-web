'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getNeonData() {
  try {
    const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []);
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []);
    const bookings = await prisma.serviceBooking.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []);

    return { vehicles, orders, bookings };
  } catch (error) {
    console.error('Failed to fetch from Neon:', error);
    return { vehicles: [], orders: [], bookings: [] };
  }
}

export async function createOrderInNeon(data: {
  customerName: string;
  phone?: string;
  city?: string;
  address?: string;
  total?: number;
  status: string;
  items: string;
  email?: string;
}) {
  try {
    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        phone: data.phone || '03001234567',
        city: data.city || 'Melbourne / Hyderabad',
        address: data.address || 'Showroom Pickup',
        total: data.total || 42990,
        status: data.status || 'Confirmed',
        items: data.items,
        email: data.email || 'customer@example.com',
      },
    });
    revalidatePath('/admin');
    return { success: true, order };
  } catch (error) {
    console.error('Neon order creation error:', error);
    return { success: false, error: 'Database error' };
  }
}

export async function updateOrderStatusInNeon(id: string, status: string) {
  try {
    await prisma.order.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Neon order update error:', error);
    return { success: false, error: 'Database error' };
  }
}

export async function deleteOrderFromNeon(id: string) {
  try {
    await prisma.order.delete({ where: { id } });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Neon order deletion error:', error);
    return { success: false, error: 'Database error' };
  }
}

export async function createVehicleInNeon(data: {
  title: string;
  price: number;
  year: number;
  mileage: string;
  transmission: string;
  fuel: string;
  status: string;
  image: string;
}) {
  try {
    await prisma.vehicle.create({
      data: {
        title: data.title,
        price: data.price,
        year: data.year,
        mileage: data.mileage,
        transmission: data.transmission,
        fuel: data.fuel,
        status: data.status || 'Available',
        image: data.image || 'https://images.unsplash.com/photo-1550355191-aa80b1574ffc?auto=format&fit=crop&w=800&q=80',
      },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Neon vehicle creation error:', error);
    return { success: false, error: 'Database error' };
  }
}

export async function deleteVehicleFromNeon(id: string) {
  try {
    await prisma.vehicle.delete({ where: { id } });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Neon vehicle deletion error:', error);
    return { success: false, error: 'Database error' };
  }
}
