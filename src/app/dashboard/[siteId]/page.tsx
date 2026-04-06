import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import { SiteDetailCharts } from '@/components/SiteDetailCharts';

interface Site {
  id: string;
  domain: string;
  name: string;
  status: string;
}

export const dynamic = 'force-dynamic';

export default async function SiteDetailPage({ params }: { params: Promise<{ siteId: string }> }) {
  const { siteId } = await params;
  const sql = getDb();

  const sites = await sql`SELECT * FROM sites WHERE id = ${siteId}`;
  if (sites.length === 0) notFound();
  const site = sites[0] as unknown as Site;

  const [realtimeRow] = await sql`
    SELECT COUNT(DISTINCT visitor_id) as count FROM events
    WHERE site_id = ${siteId} AND created_at >= NOW() - INTERVAL '5 minutes'
  `;
  const realtimeVisitors = Number(realtimeRow.count);

  const pageviewsOverTimeRaw = await sql`
    SELECT TO_CHAR(DATE_TRUNC('hour', created_at), 'YYYY-MM-DD HH24:00') as hour, COUNT(*) as count
    FROM events WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
    GROUP BY hour ORDER BY hour
  `;
  const pageviewsOverTime = pageviewsOverTimeRaw.map(r => ({ hour: String(r.hour), count: Number(r.count) }));

  const topPagesRaw = await sql`
    SELECT url, COUNT(*) as count FROM events
    WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
    GROUP BY url ORDER BY count DESC LIMIT 10
  `;
  const topPages = topPagesRaw.map(r => ({ url: String(r.url), count: Number(r.count) }));

  const trafficSourcesRaw = await sql`
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
  const trafficSources = trafficSourcesRaw.map(r => ({ source: String(r.source), count: Number(r.count) }));

  const deviceBreakdownRaw = await sql`
    SELECT device_type as name, COUNT(*) as value FROM events
    WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
    GROUP BY device_type
  `;
  const deviceBreakdown = deviceBreakdownRaw.map(r => ({ name: String(r.name), value: Number(r.value) }));

  const [avgTimeRow] = await sql`
    SELECT COALESCE(AVG(time_on_page), 0) as avg FROM events
    WHERE site_id = ${siteId} AND type = 'heartbeat' AND time_on_page > 0 AND created_at >= CURRENT_DATE - INTERVAL '7 days'
  `;

  const scrollDepthRaw = await sql`
    SELECT scroll_depth as depth, COUNT(*) as count FROM events
    WHERE site_id = ${siteId} AND type = 'scroll' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
    GROUP BY scroll_depth ORDER BY scroll_depth
  `;
  const scrollDepth = scrollDepthRaw.map(r => ({ depth: Number(r.depth), count: Number(r.count) }));

  const [conversionsRow] = await sql`
    SELECT COUNT(*) as count, COALESCE(SUM(conversion_value), 0) as revenue
    FROM events WHERE site_id = ${siteId} AND type = 'conversion' AND created_at >= CURRENT_DATE - INTERVAL '30 days'
  `;

  const [totalPvRow] = await sql`
    SELECT COUNT(*) as count FROM events
    WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '30 days'
  `;

  const [sessionStatsRow] = await sql`
    SELECT COUNT(*) as total, COALESCE(SUM(CASE WHEN is_bounce = true THEN 1 ELSE 0 END), 0) as bounced
    FROM sessions WHERE site_id = ${siteId} AND first_seen >= CURRENT_DATE - INTERVAL '7 days'
  `;

  const [uniqueVisRow] = await sql`
    SELECT COUNT(DISTINCT visitor_id) as count FROM events
    WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '7 days'
  `;

  const [retVisRow] = await sql`
    SELECT COUNT(DISTINCT e.visitor_id) as count FROM events e
    WHERE e.site_id = ${siteId} AND e.type = 'pageview' AND e.created_at >= CURRENT_DATE - INTERVAL '7 days'
    AND (SELECT COUNT(DISTINCT DATE(e2.created_at)) FROM events e2 WHERE e2.visitor_id = e.visitor_id AND e2.site_id = ${siteId}) > 1
  `;

  const pvCount = Number(totalPvRow.count) || 0;
  const convCount = Number(conversionsRow.count) || 0;
  const convRevenue = Number(conversionsRow.revenue) || 0;
  const sessTotal = Number(sessionStatsRow.total) || 0;
  const sessBounced = Number(sessionStatsRow.bounced) || 0;
  const uv = Number(uniqueVisRow.count) || 0;
  const rv = Number(retVisRow.count) || 0;

  const conversionRate = pvCount > 0 ? (convCount / pvCount * 100) : 0;
  const avgOrderValue = convCount > 0 ? (convRevenue / convCount) : 0;
  const bounceRate = sessTotal > 0 ? (sessBounced / sessTotal * 100) : 0;

  const stats = {
    realtimeVisitors,
    pageviewsOverTime,
    topPages,
    trafficSources,
    deviceBreakdown,
    avgTimeOnPage: Math.round(Number(avgTimeRow.avg)),
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
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <div>
          <h1 className="text-[40px] font-semibold tracking-[-1.5px] text-white">{site.name}</h1>
          <p className="text-[15px] text-[#a6a6a6]">{site.domain}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-[15px] font-medium text-white">{realtimeVisitors} live</span>
        </div>
      </div>

      <SiteDetailCharts stats={stats} />
    </div>
  );
}
