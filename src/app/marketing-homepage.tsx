import { CopyButton } from '@/components/CopyButton';

const SCRIPT_TAG = '<script src="https://pixel.sharmlytics.com/pixel.js" data-site="YOUR_SITE_ID"></script>';

export default function MarketingHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Sharmlytics',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            description: 'DTC-focused analytics platform for tracking customer journeys and optimizing conversion rates.',
            url: 'https://sharmlytics.com',
            author: {
              '@type': 'Person',
              name: 'Nik Sharma',
              jobTitle: 'Former Head of Growth at Athletic Greens'
            },
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />

      <nav className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md bg-black/80">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-[15px] font-semibold tracking-tight text-white">sharmlytics.com</span>
          <div className="flex items-center gap-6">
            <a href="#problem" className="text-[15px] text-[#a6a6a6] hover:text-white transition-colors">Why Sharmlytics</a>
            <a href="#solution" className="text-[15px] text-[#a6a6a6] hover:text-white transition-colors">How It Works</a>
            <a href="#founder" className="text-[15px] text-[#a6a6a6] hover:text-white transition-colors">About Nik</a>
            <a href="/dashboard" className="px-5 py-2 bg-[#fbbf24] text-black font-medium text-[13px] rounded-full hover:bg-[#fcd34d] transition-colors">
              Start Free Trial
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-6">
          <div className="max-w-[800px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.3)] rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#fbbf24] rounded-full animate-pulse"></span>
              <span className="text-[13px] font-medium text-[#fbbf24]">Used by 100+ DTC brands scaling past $10M</span>
            </div>
            
            <h1 className="text-[56px] md:text-[72px] font-bold leading-[0.9] tracking-[-3.5px] text-white mb-6">
              Stop Losing Money to<br />
              <span className="text-[#fbbf24]">Bad Attribution</span>
            </h1>
            
            <p className="text-[20px] text-[#a6a6a6] leading-relaxed max-w-[600px] mx-auto mb-8">
              iOS 14.5 killed Facebook attribution. Google is going cookieless. 
              <strong className="text-white"> DTC brands are flying blind.</strong>
            </p>

            <p className="text-[18px] text-white font-medium mb-10">
              Get back your edge with analytics that actually understand DTC operations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button className="px-8 py-4 bg-[#fbbf24] text-black font-semibold text-[16px] rounded-lg hover:bg-[#fcd34d] transition-colors">
                Start Free Trial
              </button>
              <a href="#case-study" className="px-8 py-4 border border-white/10 text-white font-medium text-[16px] rounded-lg hover:border-[#fbbf24] transition-colors">
                See Case Study
              </a>
            </div>

            <div className="flex items-center justify-center gap-8 text-[13px] text-[#a6a6a6]">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                5-minute setup
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                No developer required
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Works with any platform
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="py-20 px-6 bg-[#0a0a0a]">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[36px] md:text-[48px] font-bold text-white mb-6 leading-tight">
                Every DTC Brand is Fighting the<br />Same Attribution War
              </h2>
              <p className="text-[18px] text-[#a6a6a6] max-w-[600px] mx-auto">
                The old playbook is broken. Here's what's actually happening to your ad spend.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-black border border-white/5 rounded-xl p-8">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-[24px]">📉</span>
                </div>
                <h3 className="text-[20px] font-semibold text-white mb-3">iOS 14.5 Attribution Loss</h3>
                <p className="text-[15px] text-[#a6a6a6] leading-relaxed mb-4">
                  Facebook lost 50-80% attribution visibility overnight. You're optimizing ads with incomplete data.
                </p>
                <div className="text-[13px] text-red-400 font-medium">
                  Average Revenue Lost: 15-30%
                </div>
              </div>

              <div className="bg-black border border-white/5 rounded-xl p-8">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-[24px]">🎯</span>
                </div>
                <h3 className="text-[20px] font-semibold text-white mb-3">Google Analytics Confusion</h3>
                <p className="text-[15px] text-[#a6a6a6] leading-relaxed mb-4">
                  GA4 is built for content sites, not e-commerce. Critical DTC metrics are buried or missing.
                </p>
                <div className="text-[13px] text-orange-400 font-medium">
                  Hours Wasted Weekly: 10-15
                </div>
              </div>

              <div className="bg-black border border-white/5 rounded-xl p-8">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-[24px]">💸</span>
                </div>
                <h3 className="text-[20px] font-semibold text-white mb-3">Ad Spend Blindness</h3>
                <p className="text-[15px] text-[#a6a6a6] leading-relaxed mb-4">
                  You're scaling budgets without knowing which creatives, audiences, or campaigns actually drive LTV.
                </p>
                <div className="text-[13px] text-yellow-400 font-medium">
                  Wasted Ad Spend: 20-40%
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-[16px]">!</span>
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-white mb-2">The Real Cost</h3>
                  <p className="text-[15px] text-[#a6a6a6] leading-relaxed">
                    Brands scaling past $5M ARR are burning 30-50% more ad spend than necessary because they can't see 
                    the full customer journey. <strong className="text-white">That's $500K-$2M+ in wasted spend annually.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="py-20 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[36px] md:text-[48px] font-bold text-white mb-6">
                Finally, Analytics Built for<br />
                <span className="text-[#fbbf24]">DTC Operations</span>
              </h2>
              <p className="text-[18px] text-[#a6a6a6] max-w-[600px] mx-auto">
                One script. Complete attribution. The metrics that actually matter for scaling your brand.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#fbbf24] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-black text-[20px]">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-white mb-2">Smart Event Triggers</h3>
                    <p className="text-[15px] text-[#a6a6a6] leading-relaxed">
                      Automatically fire high-value events when customers hit $150+ cart values, complete quizzes, 
                      or submit contact info. No manual pixel management.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#fbbf24] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-black text-[20px]">📊</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-white mb-2">True Attribution</h3>
                    <p className="text-[15px] text-[#a6a6a6] leading-relaxed">
                      Server-side tracking + first-party data capture. See the complete customer journey 
                      even when iOS blocks traditional pixels.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#fbbf24] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-black text-[20px]">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-white mb-2">5-Minute Setup</h3>
                    <p className="text-[15px] text-[#a6a6a6] leading-relaxed">
                      One script tag replaces all your tracking pixels. Works with Shopify, custom checkouts, 
                      quizzes, and any platform. No developer needed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-8">
                <div className="mb-4">
                  <span className="text-[11px] font-medium uppercase tracking-[0.5px] text-[#a6a6a6]">
                    Complete Setup
                  </span>
                </div>
                <code className="block text-[14px] font-mono text-[#fbbf24] bg-black/50 rounded-lg p-4 mb-4">
                  {SCRIPT_TAG}
                </code>
                <p className="text-[13px] text-[#a6a6a6] mb-6">
                  That's it. One script automatically tracks cart values, quiz completions, email captures, 
                  and fires the right events to Meta, Google, and TikTok.
                </p>
                <div className="space-y-3">
                  {[
                    'Cart threshold events ($50, $100, $150+)',
                    'Quiz completion tracking',
                    'Lead capture detection',
                    'Product interest signals',
                    'Platform-specific event mapping'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-[#fbbf24] rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-black">
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="3"/>
                        </svg>
                      </div>
                      <span className="text-[13px] text-[#a6a6a6]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Authority Section */}
        <section id="founder" className="py-20 px-6 bg-[#0a0a0a]">
          <div className="max-w-[800px] mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-shrink-0">
                <img 
                  src="https://pbs.twimg.com/profile_images/1737179558843244544/Kw-Y4z7F_400x400.jpg" 
                  alt="Nik Sharma"
                  className="w-32 h-32 rounded-full border border-white/10"
                />
              </div>
              <div>
                <h2 className="text-[36px] font-bold text-white mb-6">
                  Built by Someone Who's<br />Actually Scaled Brands
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-[#fbbf24] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-black">
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="3"/>
                      </svg>
                    </div>
                    <p className="text-[16px] text-[#a6a6a6] leading-relaxed">
                      <strong className="text-white">Former Head of Growth at Athletic Greens (AG1)</strong> — 
                      scaled from $100M to $300M+ ARR in the post-iOS 14.5 world
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-[#fbbf24] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-black">
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="3"/>
                      </svg>
                    </div>
                    <p className="text-[16px] text-[#a6a6a6] leading-relaxed">
                      <strong className="text-white">Advised 100+ DTC brands</strong> on attribution, conversion optimization, 
                      and profitable scaling strategies
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-[#fbbf24] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-black">
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="3"/>
                      </svg>
                    </div>
                    <p className="text-[16px] text-[#a6a6a6] leading-relaxed">
                      Built Sharmlytics because <strong className="text-white">I got tired of seeing founders 
                      waste millions on broken attribution</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section id="case-study" className="py-20 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[36px] md:text-[48px] font-bold text-white mb-6">
                Real Results from Real Brands
              </h2>
              <p className="text-[18px] text-[#a6a6a6]">
                See how DTC operators are using Sharmlytics to optimize their funnels
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#fbbf24]/10 to-[#fcd34d]/5 border border-[#fbbf24]/20 rounded-xl p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-[24px] font-bold text-white mb-2">Supplement Brand Case Study</h3>
                    <p className="text-[15px] text-[#fbbf24] font-medium">$2.1M ARR → $3.8M ARR in 6 months</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-[16px] font-semibold text-white mb-1">The Problem</h4>
                      <p className="text-[14px] text-[#a6a6a6]">
                        Post-iOS 14.5, Facebook attribution dropped 70%. They were scaling ad spend blindly, 
                        burning $50K/month on audiences that looked good in Ads Manager but had terrible LTV.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-[16px] font-semibold text-white mb-1">The Solution</h4>
                      <p className="text-[14px] text-[#a6a6a6]">
                        Implemented Sharmlytics with quiz completion tracking and cart value triggers. 
                        Discovered their $200+ cart customers had 3x higher LTV than regular purchasers.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-[16px] font-semibold text-white mb-1">The Results</h4>
                      <p className="text-[14px] text-[#a6a6a6]">
                        Shifted ad spend to high-intent signals. Improved ROAS by 40%, reduced CAC by 25%, 
                        scaled from $175K to $315K monthly revenue.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[300px]">
                  <div className="bg-black/50 rounded-lg p-6">
                    <h4 className="text-[16px] font-semibold text-white mb-4">Key Metrics Improved</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[14px] text-[#a6a6a6]">ROAS</span>
                        <span className="text-[14px] text-green-400 font-semibold">+40%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[14px] text-[#a6a6a6]">CAC</span>
                        <span className="text-[14px] text-green-400 font-semibold">-25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[14px] text-[#a6a6a6]">Monthly Revenue</span>
                        <span className="text-[14px] text-green-400 font-semibold">+80%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[14px] text-[#a6a6a6]">Attribution Accuracy</span>
                        <span className="text-[14px] text-green-400 font-semibold">+60%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-black">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-[36px] md:text-[48px] font-bold text-white mb-6">
              Stop Wasting Ad Spend.<br />
              Start Tracking What Matters.
            </h2>
            <p className="text-[18px] text-[#a6a6a6] mb-10">
              Join 100+ DTC brands using Sharmlytics to optimize their funnels and scale profitably.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button className="px-8 py-4 bg-[#fbbf24] text-black font-semibold text-[16px] rounded-lg hover:bg-[#fcd34d] transition-colors">
                Start Free Trial
              </button>
              <a href="/dashboard" className="px-8 py-4 border border-white/20 text-white font-medium text-[16px] rounded-lg hover:border-[#fbbf24] transition-colors">
                View Demo Dashboard
              </a>
            </div>

            <p className="text-[13px] text-[#a6a6a6]">
              5-minute setup • No credit card required • Cancel anytime
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-white/5 text-center bg-black">
          <p className="text-[13px] text-[rgba(255,255,255,0.4)]">
            Built for DTC operators who actually want to scale profitably
          </p>
        </footer>
      </main>
    </>
  );
}