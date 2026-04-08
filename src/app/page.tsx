'use client';

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">Sharmlytics</h2>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Case Studies</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            </div>
            <a href="/dashboard" className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Start Free Trial
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="https://pbs.twimg.com/profile_images/1737179558843244544/Kw-Y4z7F_400x400.jpg" 
              alt="Nik Sharma" 
              className="w-24 h-24 rounded-full border-3 border-gray-600 mx-auto"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Analytics Platform<br />
            <span className="text-yellow-400">DTC Brands Actually Need</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Stop flying blind with broken Facebook attribution and confusing GA4 reports. 
            Get the customer insights that actually help you scale profitably.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="/dashboard" className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors">
              Start Free Trial → No Credit Card Required
            </a>
            <a href="#case-study" className="border-2 border-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:border-yellow-400 transition-colors">
              See $2.1M → $3.8M Case Study
            </a>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <span>✓ 5-minute setup</span>
            <span>✓ Works with any platform</span>
            <span>✓ 100+ brands scaling</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The iOS 14.5 Attribution Crisis<br />
              <span className="text-red-400">Is Killing DTC Brands</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Facebook lost 50-80% attribution visibility overnight. Google Analytics doesn't understand e-commerce. 
              DTC founders are burning millions on bad data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">📉</div>
              <h3 className="text-xl font-semibold mb-4 text-red-400">Facebook Attribution Lost</h3>
              <p className="text-gray-300 mb-4">50-80% of conversion tracking disappeared with iOS 14.5. You're optimizing ads with incomplete data.</p>
              <div className="text-2xl font-bold text-red-400">$500K-2M+</div>
              <div className="text-sm text-gray-400">wasted ad spend annually</div>
            </div>

            <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">🤯</div>
              <h3 className="text-xl font-semibold mb-4 text-orange-400">GA4 Confusion</h3>
              <p className="text-gray-300 mb-4">Built for content sites, not e-commerce. Critical DTC metrics are buried or missing entirely.</p>
              <div className="text-2xl font-bold text-orange-400">10-15 hrs</div>
              <div className="text-sm text-gray-400">wasted weekly on reports</div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Blind Ad Scaling</h3>
              <p className="text-gray-300 mb-4">Scaling budgets without knowing which audiences, creatives, or campaigns drive real LTV.</p>
              <div className="text-2xl font-bold text-yellow-400">20-40%</div>
              <div className="text-sm text-gray-400">of ad spend wasted</div>
            </div>
          </div>

          <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">The Real Cost for $5M+ ARR Brands</h3>
            <p className="text-lg text-gray-300">
              Brands scaling past $5M ARR are burning 30-50% more ad spend than necessary because they can't see 
              the full customer journey. <span className="text-white font-semibold">That's $500K-$2M+ in wasted spend annually.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Finally, Analytics Built for<br />
              <span className="text-yellow-400">DTC Operations</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              One script. Complete attribution. The metrics that actually matter for scaling your brand profitably.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold mb-8">Smart Event Orchestration</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 text-black rounded-full p-2 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Cart Value Triggers</h4>
                    <p className="text-gray-300">Automatically fire high-value events when customers hit $50, $100, $150+ cart thresholds. No manual pixel management.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 text-black rounded-full p-2 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Quiz & Lead Intelligence</h4>
                    <p className="text-gray-300">Track quiz completions, email captures, phone submissions. See which lead magnets actually convert to sales.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 text-black rounded-full p-2 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Platform Event Mapping</h4>
                    <p className="text-gray-300">One event automatically triggers the right Meta, Google, and TikTok events. Perfect for iOS 14.5+ attribution.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <h4 className="text-yellow-400 font-semibold mb-4 text-center">Complete Setup</h4>
              <div className="bg-black rounded p-4 mb-4">
                <code className="text-yellow-400 text-sm font-mono">
                  {'<script src="https://sharmlytics.com/pixel.js" data-site="YOUR_ID"></script>'}
                </code>
              </div>
              <p className="text-gray-400 text-sm text-center mb-6">
                That's it. One script manages all your pixel events automatically.
              </p>
              
              <div className="space-y-3">
                {[
                  'Auto-detects cart values from any platform',
                  'Monitors quiz completion steps',
                  'Tracks email/phone form submissions',
                  'Fires platform-specific events instantly',
                  'Works with Shopify, WooCommerce, custom sites'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section id="testimonials" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Real Results from Real Brands</h2>
            <p className="text-xl text-gray-300">See how DTC operators use Sharmlytics to optimize funnels and scale profitably</p>
          </div>

          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-lg p-8 mb-12">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Supplement Brand Success Story</h3>
                  <p className="text-yellow-400 font-semibold text-lg">$2.1M ARR → $3.8M ARR in 6 months</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">❌ The Problem</h4>
                    <p className="text-gray-300">Post-iOS 14.5, Facebook attribution dropped 70%. They were scaling $50K/month in ad spend blindly on audiences that looked good in Ads Manager but had terrible LTV.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">💡 The Solution</h4>
                    <p className="text-gray-300">Implemented Sharmlytics with quiz completion tracking and cart value triggers. Discovered $200+ cart customers had 3x higher LTV than regular purchasers.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">📈 The Results</h4>
                    <p className="text-gray-300">Shifted ad spend to high-intent signals. Improved ROAS by 40%, reduced CAC by 25%, scaled from $175K to $315K monthly revenue.</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-black/50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Metrics Improved</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">ROAS</span>
                      <span className="text-green-400 font-bold text-lg">+40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Customer Acquisition Cost</span>
                      <span className="text-green-400 font-bold text-lg">-25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Monthly Revenue</span>
                      <span className="text-green-400 font-bold text-lg">+80%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Attribution Accuracy</span>
                      <span className="text-green-400 font-bold text-lg">+60%</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-400/10 rounded border border-yellow-400/20">
                    <p className="text-yellow-400 font-semibold text-sm">"Finally, analytics that actually help us make profitable scaling decisions."</p>
                    <p className="text-gray-400 text-xs mt-1">— Growth Lead</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-white">Skincare Brand</h4>
                  <p className="text-gray-400 text-sm">$800K → $1.4M ARR</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Sharmlytics helped us identify that customers who completed our skin quiz had 2.5x higher LTV. We shifted all our ad spend to quiz completion events and scaled profitably."</p>
              <div className="text-green-400 font-semibold">+75% ROAS improvement</div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  F
                </div>
                <div>
                  <h4 className="font-semibold text-white">Fitness Brand</h4>
                  <p className="text-gray-400 text-sm">$1.2M → $2.8M ARR</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">"The cart value triggers changed everything. We discovered $150+ orders had 4x better retention. Now we optimize for high-value customers, not just volume."</p>
              <div className="text-green-400 font-semibold">+133% revenue growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <img 
              src="https://pbs.twimg.com/profile_images/1737179558843244544/Kw-Y4z7F_400x400.jpg" 
              alt="Nik Sharma" 
              className="w-32 h-32 rounded-full border-4 border-gray-600 mx-auto mb-6"
            />
          </div>
          
          <h2 className="text-4xl font-bold mb-6">
            Built by Someone Who's Actually<br />
            <span className="text-yellow-400">Scaled DTC Brands</span>
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-8 text-left max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-6 text-white">Nik Sharma</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-400 text-black rounded-full p-2 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <p className="text-gray-300 text-lg">
                  <strong className="text-white">Former Head of Growth at Athletic Greens (AG1)</strong> — scaled the brand from $100M to $300M+ ARR in the post-iOS 14.5 world
                </p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-400 text-black rounded-full p-2 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <p className="text-gray-300 text-lg">
                  <strong className="text-white">Advised 100+ DTC brands</strong> on attribution, conversion optimization, and profitable scaling strategies when traditional tracking broke
                </p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-400 text-black rounded-full p-2 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <p className="text-gray-300 text-lg">
                  Built Sharmlytics because <strong className="text-white">I got tired of seeing founders waste millions on broken attribution</strong> and generic analytics that don't understand DTC operations
                </p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-6 mt-8">
              <a href="https://twitter.com/mrsharma" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors">
                𝕏 @mrsharma
              </a>
              <a href="https://sharma.co" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors">
                ✓ sharma.co
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-400/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stop Wasting Ad Spend.<br />
            <span className="text-yellow-400">Start Tracking What Matters.</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join 100+ DTC brands using Sharmlytics to optimize their funnels and scale profitably in the post-iOS 14.5 world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="/dashboard" className="bg-yellow-400 text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors">
              Start Free Trial → No Credit Card Required
            </a>
            <a href="/dashboard" className="border-2 border-yellow-400 text-yellow-400 px-10 py-4 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-colors">
              View Live Demo Dashboard
            </a>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <span>✓ 5-minute setup</span>
            <span>✓ No credit card required</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500">
            Built for DTC operators who actually want to scale profitably. © 2026 Sharmlytics.
          </p>
        </div>
      </footer>
    </div>
  );
}// Force deployment Wed Apr  8 17:47:48 EDT 2026
