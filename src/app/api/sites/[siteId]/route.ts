import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

const VALID_STATUSES = ['pending', 'approved', 'denied'] as const;

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ siteId: string }> }) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { siteId } = await params;
    const { status } = await request.json();

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    const sql = getDb();

    // Verify site exists
    const sites = await sql`SELECT id FROM sites WHERE id = ${siteId}`;
    if (sites.length === 0) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    await sql`UPDATE sites SET status = ${status} WHERE id = ${siteId}`;

    return NextResponse.json({ ok: true, siteId, status });
  } catch (error) {
    console.error('Site status update error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
