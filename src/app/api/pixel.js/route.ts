import { NextRequest, NextResponse } from 'next/server';
import { generatePixelScript } from '@/lib/pixel-script';

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin') || '*';
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  const host = request.headers.get('host') || 'pixel.nik.co';
  const baseUrl = `${proto}://${host}`;

  const script = generatePixelScript(baseUrl);

  return new NextResponse(script, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
