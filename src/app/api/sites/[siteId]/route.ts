import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ siteId: string }> }) {
  try {
    const { siteId } = await params;
    const { status } = await request.json();
    if (!['pending', 'approved', 'denied'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const sql = getDb();
    await sql`UPDATE sites SET status = ${status} WHERE id = ${siteId}`;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Update site error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
