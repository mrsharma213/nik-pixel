'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/sites', label: 'Sites' },
];

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md bg-black/80">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-[15px] font-semibold tracking-tight text-white hover:text-[#fbbf24] transition-colors">
            sharmlytics.com
          </Link>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors"
                  style={{
                    background: isActive ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
                    color: isActive ? '#fbbf24' : '#a6a6a6',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.5px] px-2 py-1 rounded bg-[rgba(251,191,36,0.15)] text-[#fbbf24]">
            Admin
          </span>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-[13px] text-[#a6a6a6] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </nav>
  );
}
