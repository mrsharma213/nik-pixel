'use client';

import { useState, useEffect, useCallback } from 'react';

interface Site {
  id: string;
  domain: string;
  name: string;
  status: string;
  pixel_key: string;
  created_at: string;
}

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDomain, setNewDomain] = useState('');
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchSites = useCallback(async () => {
    const res = await fetch('/api/sites');
    const data = await res.json();
    setSites(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain || !newName) return;
    setCreating(true);
    await fetch('/api/sites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain: newDomain, name: newName }),
    });
    setNewDomain('');
    setNewName('');
    setCreating(false);
    fetchSites();
  };

  const handleStatus = async (siteId: string, status: string) => {
    await fetch(`/api/sites/${siteId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchSites();
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, { bg: string; color: string }> = {
      pending: { bg: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' },
      approved: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
      denied: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
    };
    const s = styles[status] || styles.pending;
    return (
      <span
        className="text-[11px] font-medium uppercase tracking-[0.5px] px-2 py-1 rounded"
        style={{ background: s.bg, color: s.color }}
      >
        {status}
      </span>
    );
  };

  return (
    <div>
      <h1 className="text-[40px] font-semibold tracking-[-1.5px] text-white mb-8">Sites</h1>

      {/* Create Site Form */}
      <form onSubmit={handleCreate} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 mb-8">
        <h2 className="text-[15px] font-semibold text-white mb-4">Register New Site</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Site name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="px-4 py-3 bg-black border border-white/8 rounded text-[15px] text-white placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[rgba(251,191,36,0.3)] transition-colors"
          />
          <input
            type="text"
            placeholder="domain.com"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            className="px-4 py-3 bg-black border border-white/8 rounded text-[15px] text-white placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[rgba(251,191,36,0.3)] transition-colors"
          />
          <button
            type="submit"
            disabled={creating}
            className="px-5 py-3 bg-[#fbbf24] text-black font-medium text-[15px] rounded-full hover:bg-[#fcd34d] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {creating ? 'Creating...' : 'Add Site'}
          </button>
        </div>
      </form>

      {/* Sites List */}
      {loading ? (
        <p className="text-[15px] text-[#a6a6a6]">Loading...</p>
      ) : sites.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-8 text-center">
          <p className="text-[15px] text-[#a6a6a6]">No sites registered yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sites.map((site) => (
            <div key={site.id} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-[15px] font-medium text-white">{site.name}</p>
                    {statusBadge(site.status)}
                  </div>
                  <p className="text-[13px] text-[#a6a6a6]">{site.domain}</p>
                  <p className="text-[11px] font-mono text-[rgba(255,255,255,0.4)] mt-1">
                    ID: {site.id} · Key: {site.pixel_key}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {site.status !== 'approved' && (
                    <button
                      onClick={() => handleStatus(site.id, 'approved')}
                      className="px-4 py-2 text-[13px] font-medium rounded-full cursor-pointer transition-colors"
                      style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}
                    >
                      Approve
                    </button>
                  )}
                  {site.status !== 'denied' && (
                    <button
                      onClick={() => handleStatus(site.id, 'denied')}
                      className="px-4 py-2 text-[13px] font-medium rounded-full cursor-pointer transition-colors"
                      style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}
                    >
                      Deny
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
