import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const sql = getDb();
    const sites = await sql`SELECT * FROM sites ORDER BY created_at DESC`;
    return NextResponse.json(sites);
  } catch (error) {
    console.error('Sites list error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { domain, name } = await request.json();

    if (!domain || typeof domain !== 'string' || domain.trim().length === 0) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Normalize domain (strip protocol, trailing slashes)
    const cleanDomain = domain.trim().replace(/^https?:\/\//, '').replace(/\/+$/, '').toLowerCase();

    const sql = getDb();
    const id = uuidv4();
    const pixelKey = uuidv4().replace(/-/g, '').slice(0, 16);

    await sql`INSERT INTO sites (id, domain, name, pixel_key) VALUES (${id}, ${cleanDomain}, ${name.trim()}, ${pixelKey})`;

    return NextResponse.json({ id, domain: cleanDomain, name: name.trim(), pixel_key: pixelKey, status: 'pending' }, { status: 201 });
  } catch (error) {
    console.error('Create site error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
