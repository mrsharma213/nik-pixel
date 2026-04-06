import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const sql = neon(process.env.DATABASE_URL!);

// ─── Helpers ────────────────────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedPick<T>(items: { value: T; weight: number }[]): T {
  const total = items.reduce((s, i) => s + i.weight, 0);
  let r = Math.random() * total;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item.value;
  }
  return items[items.length - 1].value;
}

function randBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hoursAgoTimestamp(hours: number): string {
  return `NOW() - INTERVAL '${hours} hours'`;
}

// ─── Demo Brand Config ──────────────────────────────────────────────────────

const BRAND = {
  id: uuidv4(),
  domain: 'shopcalm.co',
  name: 'Calm Supplements',
  pixelKey: uuidv4().replace(/-/g, '').slice(0, 16),
};

// Realistic DTC supplement brand pages
const PAGES = [
  { value: { url: 'https://shopcalm.co/', title: 'Calm Supplements - Premium Mood Support' }, weight: 30 },
  { value: { url: 'https://shopcalm.co/products/daily-calm', title: 'Daily Calm - Mood Support Capsules' }, weight: 25 },
  { value: { url: 'https://shopcalm.co/products/sleep-stack', title: 'Sleep Stack - Deep Rest Formula' }, weight: 15 },
  { value: { url: 'https://shopcalm.co/products/focus-blend', title: 'Focus Blend - Cognitive Support' }, weight: 10 },
  { value: { url: 'https://shopcalm.co/collections/bundles', title: 'Bundles & Save - Calm Supplements' }, weight: 8 },
  { value: { url: 'https://shopcalm.co/pages/about', title: 'Our Story - Calm Supplements' }, weight: 3 },
  { value: { url: 'https://shopcalm.co/pages/reviews', title: 'Customer Reviews - Calm Supplements' }, weight: 5 },
  { value: { url: 'https://shopcalm.co/cart', title: 'Your Cart - Calm Supplements' }, weight: 4 },
];

// Traffic sources weighted like a real DTC media mix
const TRAFFIC_SOURCES = [
  { value: { referrer: '', utmSource: '', utmMedium: '', utmCampaign: '' }, weight: 20 }, // Direct
  { value: { referrer: 'https://www.google.com/', utmSource: '', utmMedium: '', utmCampaign: '' }, weight: 15 }, // Organic
  { value: { referrer: '', utmSource: 'facebook', utmMedium: 'paid', utmCampaign: 'spring_launch_broad' }, weight: 18 },
  { value: { referrer: '', utmSource: 'facebook', utmMedium: 'paid', utmCampaign: 'retargeting_atc' }, weight: 8 },
  { value: { referrer: '', utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'brand_search' }, weight: 10 },
  { value: { referrer: '', utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'non_brand_mood' }, weight: 5 },
  { value: { referrer: '', utmSource: 'tiktok', utmMedium: 'paid', utmCampaign: 'ugc_hooks_v2' }, weight: 7 },
  { value: { referrer: '', utmSource: 'klaviyo', utmMedium: 'email', utmCampaign: 'welcome_flow' }, weight: 6 },
  { value: { referrer: '', utmSource: 'klaviyo', utmMedium: 'email', utmCampaign: 'abandoned_cart' }, weight: 4 },
  { value: { referrer: '', utmSource: 'klaviyo', utmMedium: 'sms', utmCampaign: 'flash_sale_20off' }, weight: 2 },
  { value: { referrer: 'https://www.instagram.com/', utmSource: '', utmMedium: '', utmCampaign: '' }, weight: 3 },
  { value: { referrer: 'https://www.youtube.com/', utmSource: '', utmMedium: '', utmCampaign: '' }, weight: 2 },
];

// Device distribution (mobile-heavy like a real DTC brand)
const DEVICES = [
  { value: { type: 'mobile', browser: 'Safari', os: 'iOS', sw: 390, sh: 844 }, weight: 45 },
  { value: { type: 'mobile', browser: 'Chrome', os: 'Android', sw: 412, sh: 915 }, weight: 15 },
  { value: { type: 'desktop', browser: 'Chrome', os: 'macOS', sw: 1440, sh: 900 }, weight: 20 },
  { value: { type: 'desktop', browser: 'Chrome', os: 'Windows', sw: 1920, sh: 1080 }, weight: 10 },
  { value: { type: 'desktop', browser: 'Safari', os: 'macOS', sw: 1440, sh: 900 }, weight: 5 },
  { value: { type: 'tablet', browser: 'Safari', os: 'iOS', sw: 1024, sh: 1366 }, weight: 5 },
];

// Geo distribution
const GEOS = [
  { value: { country: 'US', city: 'New York' }, weight: 18 },
  { value: { country: 'US', city: 'Los Angeles' }, weight: 14 },
  { value: { country: 'US', city: 'Miami' }, weight: 8 },
  { value: { country: 'US', city: 'Chicago' }, weight: 7 },
  { value: { country: 'US', city: 'Austin' }, weight: 6 },
  { value: { country: 'US', city: 'San Francisco' }, weight: 5 },
  { value: { country: 'US', city: 'Nashville' }, weight: 4 },
  { value: { country: 'US', city: 'Denver' }, weight: 3 },
  { value: { country: 'CA', city: 'Toronto' }, weight: 4 },
  { value: { country: 'GB', city: 'London' }, weight: 3 },
];

// Conversion products with realistic AOVs
const PRODUCTS = [
  { value: { name: 'Daily Calm', price: 39.99 }, weight: 40 },
  { value: { name: 'Sleep Stack', price: 44.99 }, weight: 25 },
  { value: { name: 'Focus Blend', price: 34.99 }, weight: 15 },
  { value: { name: 'Calm + Sleep Bundle', price: 74.99 }, weight: 12 },
  { value: { name: 'Full Stack Bundle', price: 99.99 }, weight: 8 },
];

// ─── Seed Function ──────────────────────────────────────────────────────────

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
      page_title TEXT,
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

  // Clean existing demo data
  console.log('Cleaning existing data...');
  await sql`DELETE FROM events`;
  await sql`DELETE FROM sessions`;
  await sql`DELETE FROM sites`;

  // Create the demo site
  await sql`
    INSERT INTO sites (id, domain, name, status, pixel_key)
    VALUES (${BRAND.id}, ${BRAND.domain}, ${BRAND.name}, 'approved', ${BRAND.pixelKey})
  `;
  console.log(`Demo site created: ${BRAND.name} (${BRAND.domain})`);

  // ─── Generate 14 days of realistic visitor sessions ───────────────────────

  const TOTAL_HOURS = 14 * 24; // 14 days
  let totalEvents = 0;
  let totalSessions = 0;
  let totalConversions = 0;
  let totalRevenue = 0;

  // Generate ~80-150 sessions per day, with weekday/weekend variation
  for (let hoursAgo = TOTAL_HOURS; hoursAgo >= 0; hoursAgo--) {
    const date = new Date(Date.now() - hoursAgo * 3600000);
    const hour = date.getHours();
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Traffic curve: peak at 10am-2pm and 7pm-10pm, low at 2am-6am
    let hourlyMultiplier = 0.3;
    if (hour >= 7 && hour <= 9) hourlyMultiplier = 0.7;
    else if (hour >= 10 && hour <= 14) hourlyMultiplier = 1.0;
    else if (hour >= 15 && hour <= 18) hourlyMultiplier = 0.6;
    else if (hour >= 19 && hour <= 22) hourlyMultiplier = 0.9;
    else if (hour >= 23 || hour <= 2) hourlyMultiplier = 0.4;
    else hourlyMultiplier = 0.15;

    // Weekend gets ~70% of weekday traffic
    if (isWeekend) hourlyMultiplier *= 0.7;

    const sessionsThisHour = Math.round(randBetween(3, 8) * hourlyMultiplier);

    for (let s = 0; s < sessionsThisHour; s++) {
      const visitorId = `v_${uuidv4().slice(0, 8)}`;
      const sessionId = `s_${uuidv4().slice(0, 12)}`;
      const isReturning = Math.random() < 0.35; // 35% returning visitor rate
      const actualVisitorId = isReturning ? `v_ret_${Math.floor(Math.random() * 40)}` : visitorId;

      const traffic = weightedPick(TRAFFIC_SOURCES) as { referrer: string; utmSource: string; utmMedium: string; utmCampaign: string };
      const device = weightedPick(DEVICES) as { type: string; browser: string; os: string; sw: number; sh: number };
      const geo = weightedPick(GEOS) as { country: string; city: string };

      // Session depth: how many pages this visitor views
      const sessionDepth = weightedPick([
        { value: 1, weight: 35 }, // Single page (potential bounce)
        { value: 2, weight: 25 },
        { value: 3, weight: 20 },
        { value: 4, weight: 10 },
        { value: 5, weight: 7 },
        { value: 6, weight: 3 },
      ]);

      const isEngaged = sessionDepth > 1 || Math.random() < 0.3; // Some single-page visitors still engage
      const isBounce = sessionDepth === 1 && !isEngaged;

      // Conversion probability based on traffic source and session depth
      let conversionProb = 0.02; // Base 2% CVR
      if (traffic.utmCampaign === 'retargeting_atc') conversionProb = 0.08;
      else if (traffic.utmCampaign === 'abandoned_cart') conversionProb = 0.12;
      else if (traffic.utmCampaign === 'brand_search') conversionProb = 0.06;
      else if (traffic.utmMedium === 'email') conversionProb = 0.05;
      else if (traffic.utmMedium === 'sms') conversionProb = 0.07;
      if (sessionDepth >= 3) conversionProb *= 1.5;
      if (sessionDepth >= 5) conversionProb *= 2;

      const willConvert = Math.random() < conversionProb;

      // Minute offset within the hour for this session
      const minuteOffset = Math.floor(Math.random() * 60);
      const sessionHoursAgo = hoursAgo + (minuteOffset / 60);

      // Generate events for this session
      for (let p = 0; p < sessionDepth; p++) {
        const page = weightedPick(PAGES) as { url: string; title: string };
        const timeIntoSession = p * randBetween(15, 90); // seconds between pages

        // Pageview
        await sql`
          INSERT INTO events (
            site_id, type, session_id, visitor_id, url, page_title, referrer,
            utm_source, utm_medium, utm_campaign,
            device_type, browser, os, screen_width, screen_height,
            country, city, created_at
          ) VALUES (
            ${BRAND.id}, 'pageview', ${sessionId}, ${actualVisitorId},
            ${page.url}, ${page.title},
            ${p === 0 ? traffic.referrer : ''},
            ${p === 0 ? traffic.utmSource : ''},
            ${p === 0 ? traffic.utmMedium : ''},
            ${p === 0 ? traffic.utmCampaign : ''},
            ${device.type}, ${device.browser}, ${device.os}, ${device.sw}, ${device.sh},
            ${geo.country}, ${geo.city},
            NOW() - ${sessionHoursAgo + ' hours'}::INTERVAL + ${timeIntoSession + ' seconds'}::INTERVAL
          )
        `;
        totalEvents++;

        // Scroll events (most engaged visitors scroll)
        if (isEngaged && Math.random() < 0.7) {
          const maxScroll = weightedPick([
            { value: 25, weight: 20 },
            { value: 50, weight: 35 },
            { value: 75, weight: 30 },
            { value: 100, weight: 15 },
          ]);
          const scrollThresholds = [25, 50, 75, 100].filter(t => t <= maxScroll);
          for (const depth of scrollThresholds) {
            await sql`
              INSERT INTO events (
                site_id, type, session_id, visitor_id, url, page_title,
                device_type, browser, os, screen_width, screen_height,
                country, city, scroll_depth,
                created_at
              ) VALUES (
                ${BRAND.id}, 'scroll', ${sessionId}, ${actualVisitorId},
                ${page.url}, ${page.title},
                ${device.type}, ${device.browser}, ${device.os}, ${device.sw}, ${device.sh},
                ${geo.country}, ${geo.city}, ${depth},
                NOW() - ${sessionHoursAgo + ' hours'}::INTERVAL + ${timeIntoSession + randBetween(3, 20) + ' seconds'}::INTERVAL
              )
            `;
            totalEvents++;
          }
        }

        // Heartbeats (time on page)
        if (isEngaged) {
          const timeOnPage = randBetween(10, 180);
          const heartbeats = Math.floor(timeOnPage / 5);
          // Just insert the final heartbeat to keep data volume reasonable
          await sql`
            INSERT INTO events (
              site_id, type, session_id, visitor_id, url, page_title,
              device_type, browser, os, screen_width, screen_height,
              country, city, time_on_page,
              created_at
            ) VALUES (
              ${BRAND.id}, 'heartbeat', ${sessionId}, ${actualVisitorId},
              ${page.url}, ${page.title},
              ${device.type}, ${device.browser}, ${device.os}, ${device.sw}, ${device.sh},
              ${geo.country}, ${geo.city}, ${heartbeats * 5},
              NOW() - ${sessionHoursAgo + ' hours'}::INTERVAL + ${timeIntoSession + timeOnPage + ' seconds'}::INTERVAL
            )
          `;
          totalEvents++;
        }

        // Click events (CTA clicks on product pages)
        if (isEngaged && page.url.includes('/products/') && Math.random() < 0.4) {
          const ctaName = pick(['add_to_cart', 'subscribe_save', 'buy_now']);
          await sql`
            INSERT INTO events (
              site_id, type, session_id, visitor_id, url, page_title,
              device_type, browser, os, screen_width, screen_height,
              country, city, event_name, event_data,
              created_at
            ) VALUES (
              ${BRAND.id}, 'click', ${sessionId}, ${actualVisitorId},
              ${page.url}, ${page.title},
              ${device.type}, ${device.browser}, ${device.os}, ${device.sw}, ${device.sh},
              ${geo.country}, ${geo.city}, ${ctaName}, ${JSON.stringify({ text: ctaName.replace(/_/g, ' ') })},
              NOW() - ${sessionHoursAgo + ' hours'}::INTERVAL + ${timeIntoSession + randBetween(5, 30) + ' seconds'}::INTERVAL
            )
          `;
          totalEvents++;
        }
      }

      // Conversion event
      if (willConvert) {
        const product = weightedPick(PRODUCTS) as { name: string; price: number };
        const orderId = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
        // Some orders have multiple items
        const quantity = Math.random() < 0.2 ? 2 : 1;
        const orderValue = Math.round(product.price * quantity * 100) / 100;

        await sql`
          INSERT INTO events (
            site_id, type, session_id, visitor_id, url, page_title,
            device_type, browser, os, screen_width, screen_height,
            country, city, conversion_value, conversion_currency, order_id,
            event_name, event_data,
            created_at
          ) VALUES (
            ${BRAND.id}, 'conversion', ${sessionId}, ${actualVisitorId},
            'https://shopcalm.co/checkout/thank-you', 'Order Confirmed - Calm Supplements',
            ${device.type}, ${device.browser}, ${device.os}, ${device.sw}, ${device.sh},
            ${geo.country}, ${geo.city}, ${orderValue}, 'USD', ${orderId},
            'purchase', ${JSON.stringify({ product: product.name, quantity, value: orderValue })},
            NOW() - ${sessionHoursAgo + ' hours'}::INTERVAL + ${sessionDepth * 60 + randBetween(10, 60) + ' seconds'}::INTERVAL
          )
        `;
        totalEvents++;
        totalConversions++;
        totalRevenue += orderValue;
      }

      // Leave event
      const finalTimeOnPage = randBetween(5, 300);
      await sql`
        INSERT INTO events (
          site_id, type, session_id, visitor_id,
          device_type, browser, os, screen_width, screen_height,
          country, city, time_on_page,
          created_at
        ) VALUES (
          ${BRAND.id}, 'leave', ${sessionId}, ${actualVisitorId},
          ${device.type}, ${device.browser}, ${device.os}, ${device.sw}, ${device.sh},
          ${geo.country}, ${geo.city}, ${finalTimeOnPage},
          NOW() - ${sessionHoursAgo + ' hours'}::INTERVAL + ${sessionDepth * 90 + finalTimeOnPage + ' seconds'}::INTERVAL
        )
      `;
      totalEvents++;

      // Session record
      await sql`
        INSERT INTO sessions (site_id, visitor_id, session_id, page_count, is_bounce, first_seen, last_seen)
        VALUES (
          ${BRAND.id}, ${actualVisitorId}, ${sessionId}, ${sessionDepth}, ${isBounce},
          NOW() - ${sessionHoursAgo + ' hours'}::INTERVAL,
          NOW() - ${sessionHoursAgo + ' hours'}::INTERVAL + ${sessionDepth * 90 + finalTimeOnPage + ' seconds'}::INTERVAL
        )
      `;
      totalSessions++;
    }
  }

  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log('  Database seeded successfully');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  Brand:        ${BRAND.name}`);
  console.log(`  Domain:       ${BRAND.domain}`);
  console.log(`  Site ID:      ${BRAND.id}`);
  console.log(`  Pixel Key:    ${BRAND.pixelKey}`);
  console.log('───────────────────────────────────────────────────');
  console.log(`  Sessions:     ${totalSessions.toLocaleString()}`);
  console.log(`  Events:       ${totalEvents.toLocaleString()}`);
  console.log(`  Conversions:  ${totalConversions.toLocaleString()}`);
  console.log(`  Revenue:      $${totalRevenue.toFixed(2)}`);
  console.log('═══════════════════════════════════════════════════');
}

seed().catch(console.error);
