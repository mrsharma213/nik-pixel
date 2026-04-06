import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();

    const [totalEventsToday] = await sql`
      SELECT COUNT(*) as count FROM events WHERE created_at >= CURRENT_DATE
    `;

    const [activeVisitors] = await sql`
      SELECT COUNT(DISTINCT visitor_id) as count FROM events WHERE created_at >= NOW() - INTERVAL '5 minutes'
    `;

    const topReferrers = await sql`
      SELECT referrer, COUNT(*) as count FROM events
      WHERE referrer != '' AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY referrer ORDER BY count DESC LIMIT 10
    `;

    const [conversionRevenue] = await sql`
      SELECT COALESCE(SUM(conversion_value), 0) as total FROM events
      WHERE type = 'conversion' AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    `;

    const approvedSites = await sql`
      SELECT * FROM sites WHERE status = 'approved' ORDER BY created_at DESC
    `;

    return NextResponse.json({
      totalEventsToday: totalEventsToday.count,
      activeVisitors: activeVisitors.count,
      topReferrers,
      conversionRevenue: conversionRevenue.total,
      approvedSites,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
