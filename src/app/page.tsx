import { CopyButton } from '@/components/CopyButton';

const SCRIPT_TAG = '<script src="https://pixel.nik.co/pixel.js" data-site="YOUR_SITE_ID"></script>';

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Nik Sharma Analytics Pixel',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            description: 'Lightweight analytics pixel for tracking page views, conversions, and user behavior.',
            url: 'https://pixel.nik.co',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            featureList: [
              'Page view tracking', 'Session tracking', 'UTM parameter capture',
              'Scroll depth tracking', 'Click tracking', 'Conversion tracking',
              'Custom events API', 'Engagement detection', 'Return visitor detection',
            ],
          }),
        }}
      />

      <nav className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md bg-black/80">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-[15px] font-semibold tracking-tight text-white">pixel.nik.co</span>
          <div className="flex items-center gap-6">
            <a href="#install" className="text-[15px] text-[#a6a6a6] hover:text-white transition-colors">Install</a>
            <a href="#features" className="text-[15px] text-[#a6a6a6] hover:text-white transition-colors">Features</a>
            <a href="#api" className="text-[15px] text-[#a6a6a6] hover:text-white transition-colors">API</a>
            <a href="/dashboard" className="px-5 py-2 bg-[#fbbf24] text-black font-medium text-[13px] rounded-full hover:bg-[#fcd34d] transition-colors">
              Dashboard
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-[720px] mx-auto px-6">
        {/* Hero */}
        <section className="pt-24 pb-16">
          <h1 className="text-[56px] md:text-[72px] font-bold leading-[0.9] tracking-[-3.5px] text-white mb-6">
            Analytics Pixel<br />for Growth Teams
          </h1>
          <p className="text-[18px] text-[#a6a6a6] leading-relaxed max-w-[540px] tracking-[-0.01px]">
            Lightweight, privacy-conscious analytics for any website. Track page views,
            conversions, scroll depth, and user behavior with a single script tag.
            Under 3KB. Zero dependencies.
          </p>
        </section>

        {/* Install */}
        <section id="install" className="py-16 border-t border-white/5">
          <h2 className="text-[32px] font-semibold tracking-[-1px] text-white mb-8">Installation</h2>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.5px] text-[#a6a6a6]">
                Step 1 — Add the script tag
              </span>
              <CopyButton text={SCRIPT_TAG} />
            </div>
            <code className="block text-[14px] font-mono text-[#fbbf24] bg-black/50 rounded-lg p-4 overflow-x-auto whitespace-pre">
              {SCRIPT_TAG}
            </code>
            <p className="mt-4 text-[15px] text-[#a6a6a6] leading-relaxed">
              Place this tag just before the closing <code className="text-white font-mono text-[13px]">&lt;/body&gt;</code> tag on every page you want to track.
              Replace <code className="text-[#fbbf24] font-mono text-[13px]">YOUR_SITE_ID</code> with the ID shown in your dashboard after site approval.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 mt-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.5px] text-[#a6a6a6] block mb-4">
              Step 2 — Track custom events (optional)
            </span>
            <code className="block text-[14px] font-mono text-white bg-black/50 rounded-lg p-4 overflow-x-auto whitespace-pre">
{`// Track a custom event
window.nk('event', 'signup_click', { plan: 'pro' });

// Track a conversion
window.nk('conversion', {
  value: 49.99,
  currency: 'USD',
  order_id: '12345'
});`}
            </code>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 mt-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.5px] text-[#a6a6a6] block mb-4">
              Step 3 — Track CTA clicks (optional)
            </span>
            <code className="block text-[14px] font-mono text-white bg-black/50 rounded-lg p-4 overflow-x-auto whitespace-pre">
{`<!-- Add data-nk-track to any element -->
<button data-nk-track="buy_now">Buy Now</button>
<a href="/pricing" data-nk-track="pricing_link">View Pricing</a>`}
            </code>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16 border-t border-white/5">
          <h2 className="text-[32px] font-semibold tracking-[-1px] text-white mb-8">What it tracks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Page Views', desc: 'URL, referrer, page title captured on every visit' },
              { title: 'Sessions', desc: 'Anonymous visitor IDs with 30-min timeout rotation' },
              { title: 'UTM Parameters', desc: 'Source, medium, campaign, term, content' },
              { title: 'Scroll Depth', desc: '25%, 50%, 75%, 100% thresholds tracked' },
              { title: 'Time on Page', desc: 'Heartbeat every 5 seconds for accuracy' },
              { title: 'Click Tracking', desc: 'Outbound links and data-nk-track CTAs' },
              { title: 'Conversions', desc: 'Revenue, currency, order ID for attribution' },
              { title: 'Device Info', desc: 'Type, browser, OS, screen resolution' },
              { title: 'Engagement Detection', desc: 'Server-side session analysis for bounce rate' },
              { title: 'Return Visitors', desc: 'New vs returning, automatically detected' },
            ].map((f) => (
              <div key={f.title} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5">
                <h3 className="text-[15px] font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-[13px] text-[#a6a6a6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* API */}
        <section id="api" className="py-16 border-t border-white/5">
          <h2 className="text-[32px] font-semibold tracking-[-1px] text-white mb-8">API Endpoints</h2>
          <div className="space-y-4">
            {[
              { method: 'GET', path: '/pixel.js', desc: 'Serves the tracking script' },
              { method: 'POST', path: '/api/events', desc: 'Receives tracking events (pixel key validated)' },
              { method: 'GET', path: '/api/install-guide', desc: 'Machine-readable install instructions (JSON)' },
            ].map((ep) => (
              <div key={ep.path} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5 flex items-center gap-4">
                <span className={`text-[11px] font-mono font-bold uppercase px-2 py-1 rounded ${
                  ep.method === 'GET' ? 'bg-[rgba(34,197,94,0.15)] text-[#22c55e]' : 'bg-[rgba(251,191,36,0.15)] text-[#fbbf24]'
                }`}>
                  {ep.method}
                </span>
                <code className="text-[14px] font-mono text-white">{ep.path}</code>
                <span className="text-[13px] text-[#a6a6a6] ml-auto hidden sm:block">{ep.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-white/5 text-center">
          <p className="text-[13px] text-[rgba(255,255,255,0.4)]">
            Built for nik.co &middot; Under 3KB &middot; Zero dependencies &middot; Privacy-first
          </p>
        </footer>
      </main>
    </>
  );
}
