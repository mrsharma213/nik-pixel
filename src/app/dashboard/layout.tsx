import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DashboardNav } from '@/components/DashboardNav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardNav />
      <main className="max-w-[1200px] mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
