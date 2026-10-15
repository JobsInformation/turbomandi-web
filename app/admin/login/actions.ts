'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'RoyalAuto#2026!';
  return password === adminPassword;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('royal_admin_auth');
  redirect('/admin/login');
}
