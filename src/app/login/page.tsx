'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      setError('Invalid admin key');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <h1 className="text-[40px] font-semibold tracking-[-1.5px] text-white mb-2">Dashboard</h1>
        <p className="text-[15px] text-[#a6a6a6] mb-8">Enter your admin key to continue.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key"
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/8 rounded text-[15px] text-white placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[rgba(251,191,36,0.3)] transition-colors"
            autoFocus
          />
          {error && (
            <p className="mt-2 text-[13px] text-[#ef4444]">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 px-5 py-3 bg-[#fbbf24] text-black font-medium text-[15px] rounded-full hover:bg-[#fcd34d] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}
