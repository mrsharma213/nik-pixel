import { neon } from '@neondatabase/serverless';

export function getDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return sql;
}

export async function initTables() {
  const sql = getDb();
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
}
