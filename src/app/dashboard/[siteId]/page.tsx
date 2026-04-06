import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import { SiteDetailCharts } from '@/components/SiteDetailCharts';
import { getSiteStats } from '@/lib/queries';

interface Site {
  id: string;
  domain: string;
  name: string;
  status: string;
  pixel_key: string;
}

export const dynamic = 'force-dynamic';

export default async function SiteDetailPage({ params, searchParams }: { params: Promise<{ siteId: string }>; searchParams: Promise<{ days?: string }> }) {
  const { siteId } = await params;
  const sp = await searchParams;
  const days = Math.min(Math.max(Number(sp.days) || 7, 1), 90);

  const sql = getDb();
  const sites = await sql`SELECT * FROM sites WHERE id = ${siteId}`;
  if (sites.length === 0) notFound();
  const site = sites[0] as unknown as Site;

  const stats = await getSiteStats(siteId, days);

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <div>
          <h1 className="text-[40px] font-semibold tracking-[-1.5px] text-white">{site.name}</h1>
          <p className="text-[15px] text-[#a6a6a6]">{site.domain}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-[15px] font-medium text-white">{stats.realtimeVisitors} live</span>
        </div>
      </div>

      {/* Embed snippet */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.5px] text-[#a6a6a6]">Your Pixel Snippet</span>
          <span className="text-[11px] font-mono text-[rgba(255,255,255,0.4)]">Key: {site.pixel_key}</span>
        </div>
        <code className="block text-[13px] font-mono text-[#fbbf24] bg-black/50 rounded-lg p-3 overflow-x-auto whitespace-pre">
          {`<script src="https://pixel.nik.co/pixel.js" data-site="${site.id}"></script>`}
        </code>
      </div>

      <SiteDetailCharts stats={stats} siteId={siteId} currentDays={days} />
    </div>
  );
}
