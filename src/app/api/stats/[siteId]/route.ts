import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ siteId: string }> }) {
  try {
    const { siteId } = await params;
    const sql = getDb();

    const [realtime] = await sql`
      SELECT COUNT(DISTINCT visitor_id) as count FROM events
      WHERE site_id = ${siteId} AND created_at >= NOW() - INTERVAL '5 minutes'
    `;

    const pageviewsOverTime = await sql`
      SELECT TO_CHAR(DATE_TRUNC('hour', created_at), 'YYYY-MM-DD HH24:00') as hour, COUNT(*) as count
      FROM events WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY hour ORDER BY hour
    `;

    const topPages = await sql`
      SELECT url, COUNT(*) as count FROM events
      WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY url ORDER BY count DESC LIMIT 10
    `;

    const trafficSources = await sql`
      SELECT
        CASE
          WHEN utm_source != '' THEN utm_source
          WHEN referrer != '' THEN referrer
          ELSE 'Direct'
        END as source,
        COUNT(*) as count
      FROM events WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY source ORDER BY count DESC LIMIT 10
    `;

    const deviceBreakdown = await sql`
      SELECT device_type as name, COUNT(*) as value FROM events
      WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY device_type
    `;

    const [avgTimeResult] = await sql`
      SELECT COALESCE(AVG(time_on_page), 0) as avg FROM events
      WHERE site_id = ${siteId} AND type = 'heartbeat' AND time_on_page > 0 AND created_at >= CURRENT_DATE - INTERVAL '7 days'
    `;

    const scrollDepth = await sql`
      SELECT scroll_depth as depth, COUNT(*) as count FROM events
      WHERE site_id = ${siteId} AND type = 'scroll' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY scroll_depth ORDER BY scroll_depth
    `;

    const [conversions] = await sql`
      SELECT COUNT(*) as count, COALESCE(SUM(conversion_value), 0) as revenue
      FROM events WHERE site_id = ${siteId} AND type = 'conversion' AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    `;

    const [totalPageviews] = await sql`
      SELECT COUNT(*) as count FROM events
      WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    `;

    const [sessionStats] = await sql`
      SELECT COUNT(*) as total, SUM(CASE WHEN is_bounce = true THEN 1 ELSE 0 END) as bounced
      FROM sessions WHERE site_id = ${siteId} AND first_seen >= CURRENT_DATE - INTERVAL '7 days'
    `;

    const [uniqueVisitors] = await sql`
      SELECT COUNT(DISTINCT visitor_id) as count FROM events
      WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
    `;

    const [returningVisitors] = await sql`
      SELECT COUNT(DISTINCT e.visitor_id) as count FROM events e
      WHERE e.site_id = ${siteId} AND e.type = 'pageview' AND e.created_at >= CURRENT_DATE - INTERVAL '7 days'
      AND (SELECT COUNT(DISTINCT DATE(e2.created_at)) FROM events e2 WHERE e2.visitor_id = e.visitor_id AND e2.site_id = ${siteId}) > 1
    `;

    const pvCount = Number(totalPageviews.count) || 0;
    const convCount = Number(conversions.count) || 0;
    const convRevenue = Number(conversions.revenue) || 0;
    const sessTotal = Number(sessionStats.total) || 0;
    const sessBounced = Number(sessionStats.bounced) || 0;
    const uv = Number(uniqueVisitors.count) || 0;
    const rv = Number(returningVisitors.count) || 0;

    const conversionRate = pvCount > 0 ? (convCount / pvCount * 100) : 0;
    const avgOrderValue = convCount > 0 ? (convRevenue / convCount) : 0;
    const bounceRate = sessTotal > 0 ? (sessBounced / sessTotal * 100) : 0;

    return NextResponse.json({
      realtimeVisitors: Number(realtime.count),
      pageviewsOverTime,
      topPages,
      trafficSources,
      deviceBreakdown,
      avgTimeOnPage: Math.round(Number(avgTimeResult.avg)),
      scrollDepth,
      conversions: {
        total: convCount,
        revenue: convRevenue,
        conversionRate: Math.round(conversionRate * 100) / 100,
        avgOrderValue: Math.round(avgOrderValue * 100) / 100,
      },
      bounceRate: Math.round(bounceRate * 100) / 100,
      visitors: {
        total: uv,
        returning: rv,
        new: uv - rv,
      },
    });
  } catch (error) {
    console.error('Site stats error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
