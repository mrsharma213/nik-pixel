import { cookies } from 'next/headers';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const adminKey = cookieStore.get('admin_key')?.value;
  return adminKey === process.env.ADMIN_KEY;
}

export function validateAdminKey(key: string): boolean {
  return key === process.env.ADMIN_KEY;
}
