import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

// GET /api/custom-events/[siteId] - Get custom events configuration for a specific site (used by pixel script)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;

  if (!siteId) {
    return NextResponse.json({ error: 'Site ID is required' }, { status: 400 });
  }

  try {
    // Fetch enabled custom events for the site
    const sql = getDb();
    const eventsResult = await sql`
      SELECT 
        event_name,
        event_type,
        trigger_conditions,
        platform_mappings,
        enabled
      FROM custom_events 
      WHERE site_id = ${siteId} AND enabled = true
      ORDER BY created_at ASC
    `;

    // Return events in format expected by pixel script
    const events = eventsResult.map(row => ({
      event_name: row.event_name,
      event_type: row.event_type,
      trigger_conditions: typeof row.trigger_conditions === 'string' 
        ? JSON.parse(row.trigger_conditions) 
        : row.trigger_conditions,
      platform_mappings: typeof row.platform_mappings === 'string'
        ? JSON.parse(row.platform_mappings)
        : row.platform_mappings,
      enabled: row.enabled
    }));

    return NextResponse.json({ 
      events,
      site_id: siteId,
      last_updated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching site custom events:', error);
    
    // Return empty events array on error (don't break pixel script)
    return NextResponse.json({ 
      events: [],
      site_id: siteId,
      error: 'Failed to load custom events'
    });
  }
}