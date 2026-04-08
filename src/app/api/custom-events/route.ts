import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getDb } from '@/lib/db';

// GET /api/custom-events - List all configured custom events
export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) {
    return authError;
  }

  try {
    const sql = getDb();
    const events = await sql`
      SELECT 
        id,
        site_id,
        event_name,
        event_type,
        trigger_conditions,
        platform_mappings,
        enabled,
        created_at,
        updated_at
      FROM custom_events 
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching custom events:', error);
    return NextResponse.json({ error: 'Failed to fetch custom events' }, { status: 500 });
  }
}

// POST /api/custom-events - Create a new custom event
export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) {
    return authError;
  }

  try {
    const body = await request.json();
    const {
      site_id,
      event_name,
      event_type,
      trigger_conditions,
      platform_mappings,
      enabled = true
    } = body;

    // Validate required fields
    if (!site_id || !event_name || !event_type || !trigger_conditions) {
      return NextResponse.json({ 
        error: 'Missing required fields: site_id, event_name, event_type, trigger_conditions' 
      }, { status: 400 });
    }

    // Insert new custom event
    const sql = getDb();
    const result = await sql`
      INSERT INTO custom_events (
        site_id,
        event_name,
        event_type,
        trigger_conditions,
        platform_mappings,
        enabled,
        created_at,
        updated_at
      ) VALUES (
        ${site_id},
        ${event_name},
        ${event_type},
        ${JSON.stringify(trigger_conditions)},
        ${JSON.stringify(platform_mappings)},
        ${enabled},
        NOW(),
        NOW()
      )
      RETURNING *
    `;

    return NextResponse.json({ 
      success: true, 
      event: result[0] 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating custom event:', error);
    return NextResponse.json({ error: 'Failed to create custom event' }, { status: 500 });
  }
}