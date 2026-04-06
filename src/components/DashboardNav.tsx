'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/sites', label: 'Sites' },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md bg-black/80">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-[15px] font-semibold tracking-tight text-white">
            pixel.nik.co
          </Link>
          <div className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-[13px] font-medium rounded-full transition-colors"
                  style={{
                    background: isActive ? 'rgba(251, 191, 36, 0.1)' : 'transparent',
                    color: isActive ? '#fbbf24' : '#a6a6a6',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        <span className="text-[11px] font-medium uppercase tracking-[0.5px] text-[rgba(255,255,255,0.4)]">
          Admin
        </span>
      </div>
    </nav>
  );
}
