import { NextRequest, NextResponse } from 'next/server';
import { validateAdminKey } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { key } = await request.json();
  if (validateAdminKey(key)) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set('admin_key', key, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return response;
  }
  return NextResponse.json({ error: 'Invalid key' }, { status: 401 });
}
