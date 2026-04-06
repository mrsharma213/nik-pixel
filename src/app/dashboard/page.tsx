import Link from 'next/link';
import { getOverviewStats } from '@/lib/queries';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function DashboardOverview() {
  const overview = await getOverviewStats();
  const sql = getDb();
  const [siteCount] = await sql`SELECT COUNT(*) as count FROM sites`;

  const totalEventsToday = overview.totalEventsToday;
  const activeVisitors = overview.activeVisitors;
  const conversionRevenue = overview.conversionRevenue;
  const totalSites = Number(siteCount.count);
  const approvedSites = overview.approvedSites;
  const topReferrers = overview.topReferrers;

  return (
    <div>
      <h1 className="text-[40px] font-semibold tracking-[-1.5px] text-white mb-8">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StatCard label="Events Today" value={totalEventsToday.toLocaleString()} />
        <StatCard label="Active Visitors" value={activeVisitors.toLocaleString()} accent />
        <StatCard label="30d Revenue" value={`$${conversionRevenue.toFixed(2)}`} />
        <StatCard label="Total Sites" value={totalSites.toLocaleString()} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-[24px] font-semibold tracking-[-0.5px] text-white mb-4">Approved Sites</h2>
          {approvedSites.length === 0 ? (
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 text-center">
              <p className="text-[15px] text-[#a6a6a6]">No approved sites yet.</p>
              <Link href="/dashboard/sites" className="text-[#fbbf24] text-[13px] mt-2 inline-block hover:text-[#fcd34d]">
                Manage sites →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {approvedSites.map((site) => (
                <Link
                  key={site.id}
                  href={`/dashboard/${site.id}`}
                  className="block bg-[#0a0a0a] border border-white/5 rounded-xl p-5 hover:border-[rgba(251,191,36,0.3)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[15px] font-medium text-white">{site.name}</p>
                      <p className="text-[13px] text-[#a6a6a6]">{site.domain}</p>
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.5px] px-2 py-1 rounded bg-[rgba(34,197,94,0.15)] text-[#22c55e]">
                      Active
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-[24px] font-semibold tracking-[-0.5px] text-white mb-4">Top Referrers</h2>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
            {topReferrers.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-[15px] text-[#a6a6a6]">No referrer data yet.</p>
              </div>
            ) : (
              <div>
                {topReferrers.map((r, i) => (
                  <div
                    key={r.referrer}
                    className="flex items-center justify-between px-5 py-3"
                    style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                  >
                    <span className="text-[14px] text-white truncate max-w-[300px]">{r.referrer}</span>
                    <span className="text-[14px] font-semibold text-white">{r.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="bg-[#0a0a0a] rounded-xl p-5"
      style={{
        border: accent ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: accent ? 'rgba(251, 191, 36, 0.15) 0px 0px 0px 1px' : 'none',
      }}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.5px] text-[#a6a6a6] mb-2">{label}</p>
      <p className="text-[28px] font-bold text-white">{value}</p>
    </div>
  );
}
