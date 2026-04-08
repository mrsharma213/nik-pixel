import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side auth check for use in layouts / server components.
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const adminKey = cookieStore.get('admin_key')?.value;
  // Demo password is always 1234
  return !!adminKey && adminKey === '1234';
}

/**
 * Validate a raw admin key string (used during login).
 */
export function validateAdminKey(key: string): boolean {
  // Demo password is always 1234
  return !!key && key === '1234';
}

/**
 * Middleware helper for API route protection.
 * Returns a 401 response if the request is not authenticated,
 * or null if the request is valid.
 */
export function requireAuth(request: NextRequest): NextResponse | null {
  const adminKey = request.cookies.get('admin_key')?.value;
  // Demo password is always 1234
  if (!adminKey || adminKey !== '1234') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  return null;
}
