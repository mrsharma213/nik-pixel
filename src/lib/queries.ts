import { getDb } from '@/lib/db';

export interface SiteStats {
  realtimeVisitors: number;
  pageviewsOverTime: { hour: string; count: number }[];
  topPages: { url: string; count: number }[];
  trafficSources: { source: string; count: number }[];
  deviceBreakdown: { name: string; value: number }[];
  avgTimeOnPage: number;
  scrollDepth: { depth: number; count: number }[];
  conversions: {
    total: number;
    revenue: number;
    conversionRate: number;
    avgOrderValue: number;
  };
  bounceRate: number;
  visitors: {
    total: number;
    returning: number;
    new: number;
  };
}

export interface OverviewStats {
  totalEventsToday: number;
  activeVisitors: number;
  topReferrers: { referrer: string; count: number }[];
  conversionRevenue: number;
  approvedSites: Array<{
    id: string;
    domain: string;
    name: string;
    status: string;
    pixel_key: string;
    created_at: string;
  }>;
}

/**
 * Get detailed stats for a specific site.
 * Single source of truth — used by both the API route and the dashboard page.
 */
export async function getSiteStats(siteId: string, days: number = 7): Promise<SiteStats> {
  const sql = getDb();

  const [realtime] = await sql`
    SELECT COUNT(DISTINCT visitor_id) as count FROM events
    WHERE site_id = ${siteId} AND created_at >= NOW() - INTERVAL '5 minutes'
  `;

  const pageviewsOverTimeRaw = await sql`
    SELECT TO_CHAR(DATE_TRUNC('hour', created_at), 'YYYY-MM-DD HH24:00') as hour, COUNT(*) as count
    FROM events WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - make_interval(days => ${days})
    GROUP BY hour ORDER BY hour
  `;
  const pageviewsOverTime = pageviewsOverTimeRaw.map(r => ({ hour: String(r.hour), count: Number(r.count) }));

  const topPagesRaw = await sql`
    SELECT url, COUNT(*) as count FROM events
    WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - make_interval(days => ${days})
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
    FROM events WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - make_interval(days => ${days})
    GROUP BY source ORDER BY count DESC LIMIT 10
  `;
  const trafficSources = trafficSourcesRaw.map(r => ({ source: String(r.source), count: Number(r.count) }));

  const deviceBreakdownRaw = await sql`
    SELECT device_type as name, COUNT(*) as value FROM events
    WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - make_interval(days => ${days})
    GROUP BY device_type
  `;
  const deviceBreakdown = deviceBreakdownRaw.map(r => ({ name: String(r.name), value: Number(r.value) }));

  const [avgTimeResult] = await sql`
    SELECT COALESCE(AVG(time_on_page), 0) as avg FROM events
    WHERE site_id = ${siteId} AND type IN ('heartbeat', 'leave') AND time_on_page > 0 AND created_at >= CURRENT_DATE - make_interval(days => ${days})
  `;

  const scrollDepthRaw = await sql`
    SELECT scroll_depth as depth, COUNT(*) as count FROM events
    WHERE site_id = ${siteId} AND type = 'scroll' AND created_at >= CURRENT_DATE - make_interval(days => ${days})
    GROUP BY scroll_depth ORDER BY scroll_depth
  `;
  const scrollDepth = scrollDepthRaw.map(r => ({ depth: Number(r.depth), count: Number(r.count) }));

  const [conversions] = await sql`
    SELECT COUNT(*) as count, COALESCE(SUM(conversion_value), 0) as revenue
    FROM events WHERE site_id = ${siteId} AND type = 'conversion' AND created_at >= CURRENT_DATE - INTERVAL '30 days'
  `;

  const [totalPageviews] = await sql`
    SELECT COUNT(*) as count FROM events
    WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - INTERVAL '30 days'
  `;

  // Bounce rate: sessions where the user never engaged (no heartbeat, no scroll, no click)
  const [sessionStats] = await sql`
    SELECT COUNT(*) as total, SUM(CASE WHEN is_bounce = true THEN 1 ELSE 0 END) as bounced
    FROM sessions WHERE site_id = ${siteId} AND first_seen >= CURRENT_DATE - make_interval(days => ${days})
  `;

  const [uniqueVisitors] = await sql`
    SELECT COUNT(DISTINCT visitor_id) as count FROM events
    WHERE site_id = ${siteId} AND type = 'pageview' AND created_at >= CURRENT_DATE - make_interval(days => ${days})
  `;

  const [returningVisitors] = await sql`
    SELECT COUNT(DISTINCT e.visitor_id) as count FROM events e
    WHERE e.site_id = ${siteId} AND e.type = 'pageview' AND e.created_at >= CURRENT_DATE - make_interval(days => ${days})
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

  return {
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
  };
}

/**
 * Get overview stats for the main dashboard.
 * Single source of truth — used by both the API route and the dashboard page.
 */
export async function getOverviewStats(): Promise<OverviewStats> {
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

  return {
    totalEventsToday: Number(totalEventsToday.count),
    activeVisitors: Number(activeVisitors.count),
    topReferrers: topReferrers.map(r => ({ referrer: String(r.referrer), count: Number(r.count) })),
    conversionRevenue: Number(conversionRevenue.total),
    approvedSites: approvedSites as unknown as OverviewStats['approvedSites'],
  };
}
