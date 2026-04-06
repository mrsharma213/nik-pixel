import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const sql = neon(process.env.DATABASE_URL!);

async function seed() {
  console.log('Creating tables...');

  await sql`
    CREATE TABLE IF NOT EXISTS sites (
      id TEXT PRIMARY KEY,
      domain TEXT NOT NULL,
      name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'denied')),
      pixel_key TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      site_id TEXT NOT NULL REFERENCES sites(id),
      type TEXT NOT NULL DEFAULT 'pageview',
      session_id TEXT,
      visitor_id TEXT,
      url TEXT,
      referrer TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_term TEXT,
      utm_content TEXT,
      device_type TEXT,
      browser TEXT,
      os TEXT,
      screen_width INTEGER,
      screen_height INTEGER,
      country TEXT,
      city TEXT,
      scroll_depth INTEGER,
      time_on_page INTEGER,
      event_name TEXT,
      event_data TEXT,
      conversion_value REAL,
      conversion_currency TEXT,
      order_id TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      site_id TEXT NOT NULL REFERENCES sites(id),
      visitor_id TEXT NOT NULL,
      session_id TEXT NOT NULL UNIQUE,
      first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      page_count INTEGER NOT NULL DEFAULT 1,
      is_bounce BOOLEAN NOT NULL DEFAULT true
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_events_site_id ON events(site_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_events_type ON events(type)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_events_visitor_id ON events(visitor_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_sessions_site_id ON sessions(site_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_sessions_visitor_id ON sessions(visitor_id)`;

  console.log('Tables created.');

  // Seed a demo site
  const siteId = uuidv4();
  const pixelKey = uuidv4().replace(/-/g, '').slice(0, 16);

  await sql`INSERT INTO sites (id, domain, name, status, pixel_key) VALUES (${siteId}, 'demo.nik.co', 'Demo Site', 'approved', ${pixelKey})`;

  console.log(`Demo site created: ${siteId}`);

  // Seed demo events
  const types = ['pageview', 'pageview', 'pageview', 'scroll', 'heartbeat', 'click', 'conversion'];
  const urls = ['/', '/products', '/about', '/pricing', '/blog', '/contact'];
  const referrers = ['https://google.com', 'https://twitter.com', 'https://instagram.com', '', '', ''];
  const devices = ['desktop', 'mobile', 'tablet'];
  const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge'];
  const oses = ['macOS', 'Windows', 'iOS', 'Android'];

  const sessionsCreated = new Set<string>();

  for (let i = 0; i < 200; i++) {
    const visitorId = `v${Math.floor(Math.random() * 50)}`;
    const sessionId = `s${Math.floor(Math.random() * 100)}`;
    const type = types[Math.floor(Math.random() * types.length)];
    const url = urls[Math.floor(Math.random() * urls.length)];
    const ref = referrers[Math.floor(Math.random() * referrers.length)];
    const device = devices[Math.floor(Math.random() * devices.length)];
    const browser = browsers[Math.floor(Math.random() * browsers.length)];
    const os = oses[Math.floor(Math.random() * oses.length)];
    const hoursAgo = Math.floor(Math.random() * 168);
    const scrollDepthVal = type === 'scroll' ? [25, 50, 75, 100][Math.floor(Math.random() * 4)] : null;
    const timeOnPage = type === 'heartbeat' ? Math.floor(Math.random() * 300) + 5 : null;
    const convValue = type === 'conversion' ? Math.round(Math.random() * 200 * 100) / 100 : null;
    const convCurrency = type === 'conversion' ? 'USD' : null;
    const utmSource = Math.random() > 0.7 ? ['google', 'facebook', 'email'][Math.floor(Math.random() * 3)] : '';
    const sw = device === 'desktop' ? 1920 : device === 'tablet' ? 1024 : 390;
    const sh = device === 'desktop' ? 1080 : device === 'tablet' ? 768 : 844;

    await sql`
      INSERT INTO events (
        site_id, type, session_id, visitor_id, url, referrer,
        utm_source, utm_medium, utm_campaign,
        device_type, browser, os, screen_width, screen_height,
        country, city, scroll_depth, time_on_page,
        conversion_value, conversion_currency,
        created_at
      ) VALUES (
        ${siteId}, ${type}, ${sessionId}, ${visitorId}, ${url}, ${ref},
        ${utmSource}, ${utmSource ? 'cpc' : ''}, ${utmSource ? 'spring24' : ''},
        ${device}, ${browser}, ${os}, ${sw}, ${sh},
        'US', 'New York', ${scrollDepthVal}, ${timeOnPage},
        ${convValue}, ${convCurrency},
        NOW() - ${hoursAgo + ' hours'}::INTERVAL
      )
    `;

    if (!sessionsCreated.has(sessionId)) {
      sessionsCreated.add(sessionId);
      const pageCount = Math.floor(Math.random() * 10) + 1;
      const isBounce = Math.random() > 0.6;
      await sql`
        INSERT INTO sessions (site_id, visitor_id, session_id, page_count, is_bounce)
        VALUES (${siteId}, ${visitorId}, ${sessionId}, ${pageCount}, ${isBounce})
        ON CONFLICT(session_id) DO NOTHING
      `;
    }
  }

  console.log(`✅ Database seeded!`);
  console.log(`   Demo site ID: ${siteId}`);
  console.log(`   Demo pixel key: ${pixelKey}`);
  console.log(`   200 demo events created`);
}

seed().catch(console.error);
