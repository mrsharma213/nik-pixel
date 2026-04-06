import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const sql = getDb();
  const sites = await sql`SELECT * FROM sites ORDER BY created_at DESC`;
  return NextResponse.json(sites);
}

export async function POST(request: NextRequest) {
  try {
    const { domain, name } = await request.json();
    if (!domain || !name) {
      return NextResponse.json({ error: 'domain and name are required' }, { status: 400 });
    }
    const sql = getDb();
    const id = uuidv4();
    const pixelKey = uuidv4().replace(/-/g, '').slice(0, 16);

    await sql`INSERT INTO sites (id, domain, name, pixel_key) VALUES (${id}, ${domain}, ${name}, ${pixelKey})`;

    return NextResponse.json({ id, domain, name, pixel_key: pixelKey, status: 'pending' });
  } catch (error) {
    console.error('Create site error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
