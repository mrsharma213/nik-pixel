'use client';

import { useRouter } from 'next/navigation';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';

interface Stats {
  realtimeVisitors: number;
  pageviewsOverTime: { hour: string; count: number }[];
  topPages: { url: string; count: number }[];
  trafficSources: { source: string; count: number }[];
  deviceBreakdown: { name: string; value: number }[];
  avgTimeOnPage: number;
  scrollDepth: { depth: number; count: number }[];
  conversions: {
    total: number;
    revenue: number;
    conversionRate: number;
    avgOrderValue: number;
  };
  bounceRate: number;
  visitors: {
    total: number;
    returning: number;
    new: number;
  };
}

const DEVICE_COLORS = ['#fbbf24', '#ffffff', '#a6a6a6'];
const DATE_RANGES = [
  { label: '24h', days: 1 },
  { label: '7d', days: 7 },
  { label: '14d', days: 14 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
];

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export function SiteDetailCharts({ stats, siteId, currentDays }: { stats: Stats; siteId: string; currentDays: number }) {
  const router = useRouter();

  const handleDateChange = (days: number) => {
    router.push(`/dashboard/${siteId}?days=${days}`);
  };

  return (
    <div className="space-y-8">
      {/* Date Range Picker */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium uppercase tracking-[0.5px] text-[#a6a6a6] mr-2">Period</span>
        {DATE_RANGES.map((r) => (
          <button
            key={r.days}
            onClick={() => handleDateChange(r.days)}
            className="px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors cursor-pointer"
            style={{
              background: currentDays === r.days ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              color: currentDays === r.days ? '#fbbf24' : '#a6a6a6',
              border: currentDays === r.days ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid transparent',
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <MiniStat label="Bounce Rate" value={`${stats.bounceRate}%`} />
        <MiniStat label="Avg Time" value={formatTime(stats.avgTimeOnPage)} />
        <MiniStat label="Revenue" value={`$${stats.conversions.revenue.toFixed(2)}`} accent />
        <MiniStat label="Conv. Rate" value={`${stats.conversions.conversionRate}%`} />
        <MiniStat label="Avg Order" value={`$${stats.conversions.avgOrderValue.toFixed(2)}`} />
        <MiniStat label="Conversions" value={stats.conversions.total.toLocaleString()} />
      </div>

      {/* Visitors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MiniStat label="Total Visitors" value={stats.visitors.total.toLocaleString()} />
        <MiniStat label="New Visitors" value={stats.visitors.new.toLocaleString()} />
        <MiniStat label="Returning" value={stats.visitors.returning.toLocaleString()} accent />
      </div>

      {/* Page Views Chart */}
      <Card title={`Page Views (${currentDays}d)`}>
        {stats.pageviewsOverTime.length === 0 ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats.pageviewsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="hour"
                tick={{ fill: '#a6a6a6', fontSize: 11 }}
                tickFormatter={(v: string) => {
                  const d = new Date(v);
                  return `${(d.getMonth()+1)}/${d.getDate()}`;
                }}
                axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
              />
              <YAxis tick={{ fill: '#a6a6a6', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.05)' }} />
              <Tooltip
                contentStyle={{
                  background: '#0a0a0a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: 13,
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#fbbf24"
                fill="rgba(251,191,36,0.15)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Two column: Top Pages + Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Top Pages">
          {stats.topPages.length === 0 ? <EmptyState /> : (
            <div>
              {stats.topPages.map((p, i) => (
                <div
                  key={p.url}
                  className="flex items-center justify-between px-0 py-2.5"
                  style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                >
                  <span className="text-[14px] text-white truncate max-w-[300px]">{p.url}</span>
                  <span className="text-[14px] font-semibold text-white ml-4">{p.count}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card title="Traffic Sources">
          {stats.trafficSources.length === 0 ? <EmptyState /> : (
            <div>
              {stats.trafficSources.map((s, i) => (
                <div
                  key={s.source}
                  className="flex items-center justify-between px-0 py-2.5"
                  style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                >
                  <span className="text-[14px] text-white truncate max-w-[300px]">{s.source}</span>
                  <span className="text-[14px] font-semibold text-white ml-4">{s.count}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Device Breakdown + Scroll Depth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Device Breakdown">
          {stats.deviceBreakdown.length === 0 ? <EmptyState /> : (
            <div className="flex items-center gap-8">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={stats.deviceBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={40}
                    strokeWidth={0}
                  >
                    {stats.deviceBreakdown.map((_, i) => (
                      <Cell key={i} fill={DEVICE_COLORS[i % DEVICE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {stats.deviceBreakdown.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: DEVICE_COLORS[i % DEVICE_COLORS.length] }}
                    />
                    <span className="text-[14px] text-white capitalize">{d.name || 'Unknown'}</span>
                    <span className="text-[14px] text-[#a6a6a6] ml-auto">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        <Card title="Scroll Depth">
          {stats.scrollDepth.length === 0 ? <EmptyState /> : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.scrollDepth}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="depth"
                  tick={{ fill: '#a6a6a6', fontSize: 11 }}
                  tickFormatter={(v: number) => `${v}%`}
                  axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
                />
                <YAxis tick={{ fill: '#a6a6a6', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.05)' }} />
                <Tooltip
                  contentStyle={{
                    background: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="count" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </div>
  );
}

function MiniStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="bg-[#0a0a0a] rounded-xl p-4"
      style={{
        border: accent ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: accent ? 'rgba(251, 191, 36, 0.15) 0px 0px 0px 1px' : 'none',
      }}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.5px] text-[#a6a6a6] mb-1">{label}</p>
      <p className="text-[24px] font-bold text-white leading-tight">{value}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
      <h3 className="text-[15px] font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-8 text-center">
      <p className="text-[14px] text-[#a6a6a6]">No data yet</p>
    </div>
  );
}
