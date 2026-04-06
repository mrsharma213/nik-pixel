import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'Nik Sharma Analytics Pixel',
    version: '1.0.0',
    description: 'Lightweight analytics pixel for tracking page views, conversions, and user behavior.',
    installation: {
      method: 'script_tag',
      steps: [
        {
          step: 1,
          description: 'Add the following script tag to your HTML, just before the closing </body> tag.',
          code: '<script src="https://pixel.nik.co/pixel.js" data-site="YOUR_SITE_ID"></script>',
          notes: 'Replace YOUR_SITE_ID with the site ID provided after approval.',
        },
        {
          step: 2,
          description: 'Optionally track custom events using the window.nk() API.',
          code: "window.nk('event', 'button_click', { button: 'signup' })",
        },
        {
          step: 3,
          description: 'Track conversions with the conversion API.',
          code: "window.nk('conversion', { value: 49.99, currency: 'USD', order_id: '12345' })",
        },
      ],
    },
    features: [
      'Page views', 'Session tracking', 'UTM parameters', 'Referral source parsing',
      'Device info', 'Geo approximation', 'Time on page', 'Scroll depth',
      'Click tracking', 'Bounce detection', 'Return visitor detection',
      'Custom events', 'Conversion tracking',
    ],
    tracking_attributes: {
      cta_tracking: 'Add data-nk-track="button_name" to any element to track clicks.',
    },
    api: {
      events_endpoint: 'POST /api/events',
      pixel_endpoint: 'GET /api/pixel.js',
      install_guide_endpoint: 'GET /api/install-guide',
    },
  });
}
