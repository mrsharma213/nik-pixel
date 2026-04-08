import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const sql = neon(process.env.DATABASE_URL!);

async function createCustomEventsTable() {
  try {
    // Create custom_events table
    await sql`
      CREATE TABLE IF NOT EXISTS custom_events (
        id SERIAL PRIMARY KEY,
        site_id VARCHAR(255) NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
        event_name VARCHAR(255) NOT NULL,
        event_type VARCHAR(100) NOT NULL, -- 'cart_value', 'quiz_completion', 'lead_capture', 'product_interest', 'custom'
        trigger_conditions JSONB NOT NULL, -- { "cart_threshold": 150, "currency": "USD" } or { "quiz_step": "final" }
        platform_mappings JSONB NOT NULL DEFAULT '{}', -- { "meta": "AddToCart_High", "google": "add_to_cart_premium", "tiktok": "AddToCart" }
        enabled BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        
        -- Ensure unique event names per site
        UNIQUE(site_id, event_name)
      );
    `;

    // Create index on site_id for fast queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_custom_events_site_id ON custom_events(site_id);
    `;

    // Create index on event_type for filtering
    await sql`
      CREATE INDEX IF NOT EXISTS idx_custom_events_type ON custom_events(event_type);
    `;

    console.log('✓ Custom events table created successfully');

    // Insert some example custom events for demo
    await sql`
      INSERT INTO custom_events (site_id, event_name, event_type, trigger_conditions, platform_mappings, enabled)
      SELECT 
        'calm-supplements',
        'high_value_cart',
        'cart_value',
        '{"cart_threshold": 150, "currency": "USD"}',
        '{"meta": "AddToCart_High", "google": "add_to_cart_premium", "tiktok": "AddToCart"}',
        true
      WHERE EXISTS (SELECT 1 FROM sites WHERE id = 'calm-supplements')
      ON CONFLICT (site_id, event_name) DO NOTHING;
    `;

    await sql`
      INSERT INTO custom_events (site_id, event_name, event_type, trigger_conditions, platform_mappings, enabled)
      SELECT 
        'calm-supplements',
        'quiz_complete',
        'quiz_completion',
        '{"quiz_step": "final", "quiz_id": "product-finder"}',
        '{"meta": "CompleteRegistration", "google": "generate_lead", "tiktok": "CompleteRegistration"}',
        true
      WHERE EXISTS (SELECT 1 FROM sites WHERE id = 'calm-supplements')
      ON CONFLICT (site_id, event_name) DO NOTHING;
    `;

    await sql`
      INSERT INTO custom_events (site_id, event_name, event_type, trigger_conditions, platform_mappings, enabled)
      SELECT 
        'calm-supplements',
        'phone_capture',
        'lead_capture',
        '{"field_type": "phone", "form_id": "checkout"}',
        '{"meta": "Lead", "google": "sign_up", "tiktok": "CompleteRegistration"}',
        true
      WHERE EXISTS (SELECT 1 FROM sites WHERE id = 'calm-supplements')
      ON CONFLICT (site_id, event_name) DO NOTHING;
    `;

    console.log('✓ Example custom events added');

  } catch (error) {
    console.error('Error creating custom events table:', error);
    throw error;
  }
}

// Run migration if called directly
if (require.main === module) {
  createCustomEventsTable()
    .then(() => {
      console.log('Migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export { createCustomEventsTable };