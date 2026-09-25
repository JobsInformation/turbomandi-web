"use server"
import { cookies } from 'next/headers'
import { adminToken } from '@/lib/adminAuth'

export async function loginAdmin(password: string) {
  const correctPassword = process.env.ADMIN_PASSWORD

  if (!correctPassword) {
    return { success: false, error: "Admin login is not configured." }
  }

  if (password === correctPassword) {
    const jar = await cookies()
    jar.set('admin_session', adminToken(), {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8,
    })
    return { success: true }
  }
  return { success: false, error: "Invalid password. Please try again." }
}

export async function logoutAdmin() {
  const jar = await cookies()
  jar.delete('admin_session')
  return { success: true }
}
