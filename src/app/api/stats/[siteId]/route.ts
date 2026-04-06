import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { getSiteStats } from '@/lib/queries';

export async function GET(request: NextRequest, { params }: { params: Promise<{ siteId: string }> }) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { siteId } = await params;
    const sql = getDb();

    // Verify site exists
    const sites = await sql`SELECT id FROM sites WHERE id = ${siteId}`;
    if (sites.length === 0) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const stats = await getSiteStats(siteId);
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Site stats error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
