import { createHmac, timingSafeEqual } from 'crypto'

function getSecret() {
  return process.env.ADMIN_PASSWORD || 'turbomandi-admin-fallback-key'
}

export function adminToken() {
  return createHmac('sha256', getSecret())
    .update('admin-session')
    .digest('hex')
}

export function isAdmin(token?: string) {
  if (!token) return false
  try {
    const a = Buffer.from(token)
    const b = Buffer.from(adminToken())
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}
