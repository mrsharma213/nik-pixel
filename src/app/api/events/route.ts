import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const VALID_EVENT_TYPES = ['pageview', 'scroll', 'heartbeat', 'click', 'custom', 'conversion', 'leave'] as const;
const MAX_STRING_LENGTH = 2048;
const MAX_EVENT_DATA_LENGTH = 4096;

function clampString(val: unknown, maxLen: number = MAX_STRING_LENGTH): string {
  if (typeof val !== 'string') return '';
  return val.slice(0, maxLen);
}

function clampInt(val: unknown, min: number = 0, max: number = 100000): number {
  const n = Number(val);
  if (isNaN(n)) return 0;
  return Math.max(min, Math.min(max, Math.round(n)));
}

function clampFloat(val: unknown, min: number = 0, max: number = 999999.99): number | null {
  if (val === null || val === undefined) return null;
  const n = Number(val);
  if (isNaN(n)) return null;
  return Math.max(min, Math.min(max, Math.round(n * 100) / 100));
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400, headers: CORS_HEADERS });
    }

    // Validate site_id is present
    const siteId = clampString(body.site_id, 64);
    if (!siteId) {
      return NextResponse.json({ ok: false, error: 'site_id required' }, { status: 400, headers: CORS_HEADERS });
    }

    // Validate event type
    const eventType = clampString(body.type, 32) || 'pageview';
    if (!VALID_EVENT_TYPES.includes(eventType as typeof VALID_EVENT_TYPES[number])) {
      return NextResponse.json({ ok: false, error: 'Invalid event type' }, { status: 400, headers: CORS_HEADERS });
    }

    const sql = getDb();

    // Check if site exists and is not denied (no auto-registration)
    const sites = await sql`SELECT id, status FROM sites WHERE id = ${siteId}`;
    if (sites.length === 0) {
      return NextResponse.json({ ok: false, error: 'Unknown site' }, { status: 404, headers: CORS_HEADERS });
    }
    if (sites[0].status === 'denied') {
      return NextResponse.json({ ok: false, error: 'Site denied' }, { status: 403, headers: CORS_HEADERS });
    }

    // Geo enrichment from edge headers
    const country = request.headers.get('cf-ipcountry') ||
                    request.headers.get('x-vercel-ip-country') ||
                    'Unknown';
    const city = request.headers.get('x-vercel-ip-city') ||
                 request.headers.get('cf-ipcity') ||
                 'Unknown';

    // Sanitize all inputs
    const sessionId = clampString(body.session_id, 64);
    const visitorId = clampString(body.visitor_id, 64);
    const url = clampString(body.url);
    const pageTitle = clampString(body.page_title, 512);
    const referrer = clampString(body.referrer);
    const utmSource = clampString(body.utm_source, 256);
    const utmMedium = clampString(body.utm_medium, 256);
    const utmCampaign = clampString(body.utm_campaign, 256);
    const utmTerm = clampString(body.utm_term, 256);
    const utmContent = clampString(body.utm_content, 256);
    const deviceType = clampString(body.device_type, 32);
    const browser = clampString(body.browser, 64);
    const os = clampString(body.os, 64);
    const screenWidth = clampInt(body.screen_width, 0, 10000);
    const screenHeight = clampInt(body.screen_height, 0, 10000);
    const scrollDepth = body.scroll_depth !== undefined && body.scroll_depth !== null ? clampInt(body.scroll_depth, 0, 100) : null;
    const timeOnPage = body.time_on_page !== undefined && body.time_on_page !== null ? clampInt(body.time_on_page, 0, 86400) : null;
    const eventName = clampString(body.event_name, 256) || null;
    const eventData = clampString(body.event_data, MAX_EVENT_DATA_LENGTH) || null;
    const conversionValue = clampFloat(body.conversion_value);
    const conversionCurrency = clampString(body.conversion_currency, 8) || null;
    const orderId = clampString(body.order_id, 256) || null;

    await sql`
      INSERT INTO events (
        site_id, type, session_id, visitor_id, url, page_title, referrer,
        utm_source, utm_medium, utm_campaign, utm_term, utm_content,
        device_type, browser, os, screen_width, screen_height,
        country, city, scroll_depth, time_on_page,
        event_name, event_data, conversion_value, conversion_currency, order_id
      ) VALUES (
        ${siteId}, ${eventType}, ${sessionId}, ${visitorId},
        ${url}, ${pageTitle}, ${referrer},
        ${utmSource}, ${utmMedium}, ${utmCampaign}, ${utmTerm}, ${utmContent},
        ${deviceType}, ${browser}, ${os},
        ${screenWidth}, ${screenHeight},
        ${country}, ${city},
        ${scrollDepth}, ${timeOnPage},
        ${eventName}, ${eventData},
        ${conversionValue}, ${conversionCurrency}, ${orderId}
      )
    `;

    // Upsert session tracking
    if (sessionId && siteId) {
      // Determine engagement: leave events carry the engaged flag
      const isEngaged = eventType === 'leave' ? (body.engaged === 1 || body.engaged === true) : false;
      const isNonBounceEvent = eventType !== 'pageview' && eventType !== 'leave';

      await sql`
        INSERT INTO sessions (site_id, visitor_id, session_id, page_count, is_bounce)
        VALUES (${siteId}, ${visitorId}, ${sessionId}, 1, true)
        ON CONFLICT(session_id) DO UPDATE SET
          last_seen = NOW(),
          page_count = sessions.page_count + CASE WHEN ${eventType} = 'pageview' THEN 1 ELSE 0 END,
          is_bounce = CASE
            WHEN ${isEngaged} THEN false
            WHEN ${isNonBounceEvent} THEN false
            WHEN sessions.page_count > 1 THEN false
            ELSE sessions.is_bounce
          END
      `;
    }

    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Event ingestion error:', error);
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500, headers: CORS_HEADERS });
  }
}
