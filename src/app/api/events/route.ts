import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sql = getDb();

    // Check if site exists and is approved
    if (body.site_id) {
      const sites = await sql`SELECT id, status FROM sites WHERE id = ${body.site_id}`;
      if (sites.length === 0) {
        // Auto-register the site as pending with domain from the URL
        let domain = 'unknown';
        try {
          domain = new URL(body.url || '').hostname;
        } catch {}
        const pixelKey = Math.random().toString(36).slice(2, 18);
        await sql`
          INSERT INTO sites (id, domain, name, pixel_key, status)
          VALUES (${body.site_id}, ${domain}, ${domain}, ${pixelKey}, 'pending')
          ON CONFLICT(id) DO NOTHING
        `;
      } else if (sites[0].status === 'denied') {
        return NextResponse.json({ ok: false, error: 'Site denied' }, { status: 403, headers: CORS_HEADERS });
      }
    }

    const country = request.headers.get('cf-ipcountry') ||
                    request.headers.get('x-vercel-ip-country') ||
                    'Unknown';
    const city = request.headers.get('x-vercel-ip-city') ||
                 request.headers.get('cf-ipcity') ||
                 'Unknown';

    await sql`
      INSERT INTO events (
        site_id, type, session_id, visitor_id, url, referrer,
        utm_source, utm_medium, utm_campaign, utm_term, utm_content,
        device_type, browser, os, screen_width, screen_height,
        country, city, scroll_depth, time_on_page,
        event_name, event_data, conversion_value, conversion_currency, order_id
      ) VALUES (
        ${body.site_id || ''}, ${body.type || 'pageview'}, ${body.session_id || ''}, ${body.visitor_id || ''},
        ${body.url || ''}, ${body.referrer || ''},
        ${body.utm_source || ''}, ${body.utm_medium || ''}, ${body.utm_campaign || ''}, ${body.utm_term || ''}, ${body.utm_content || ''},
        ${body.device_type || ''}, ${body.browser || ''}, ${body.os || ''},
        ${body.screen_width || 0}, ${body.screen_height || 0},
        ${country}, ${city},
        ${body.scroll_depth || null}, ${body.time_on_page || null},
        ${body.event_name || null}, ${body.event_data || null},
        ${body.conversion_value || null}, ${body.conversion_currency || null}, ${body.order_id || null}
      )
    `;

    if (body.session_id && body.site_id) {
      await sql`
        INSERT INTO sessions (site_id, visitor_id, session_id, page_count, is_bounce)
        VALUES (${body.site_id}, ${body.visitor_id || ''}, ${body.session_id}, 1, true)
        ON CONFLICT(session_id) DO UPDATE SET
          last_seen = NOW(),
          page_count = sessions.page_count + CASE WHEN ${body.type || 'pageview'} = 'pageview' THEN 1 ELSE 0 END,
          is_bounce = CASE WHEN sessions.page_count > 1 OR ${body.type || 'pageview'} != 'pageview' THEN false ELSE sessions.is_bounce END
      `;
    }

    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Event ingestion error:', error);
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500, headers: CORS_HEADERS });
  }
}
