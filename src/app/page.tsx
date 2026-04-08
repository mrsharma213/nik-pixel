'use client';

export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-5 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Avatar */}
        <img 
          src="https://pbs.twimg.com/profile_images/1737179558843244544/Kw-Y4z7F_400x400.jpg" 
          alt="Nik Sharma" 
          className="w-32 h-32 rounded-full border-4 border-gray-700 mx-auto mb-10"
        />
        
        {/* Main Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
          Sharmlytics
        </h1>
        
        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-gray-400 mb-12 leading-relaxed">
          DTC analytics that actually understand<br />
          e-commerce operations
        </p>
        
        {/* Description */}
        <div className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
          <p className="mb-6">
            Smart event tracking for cart thresholds, quiz completions, and lead capture. 
            Automatically fire the right Meta, Google, and TikTok events without manual pixel management.
          </p>
          <p>
            One script replaces all your tracking pixels. See complete attribution even when iOS blocks traditional tracking.
          </p>
        </div>

        {/* Key Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h4 className="text-yellow-400 font-semibold mb-3 text-lg">Cart Value Events</h4>
            <p className="text-gray-400 text-sm">Auto-trigger high-value events at $50, $100, $150+ cart thresholds</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h4 className="text-yellow-400 font-semibold mb-3 text-lg">Quiz & Lead Tracking</h4>
            <p className="text-gray-400 text-sm">Track quiz completions, email signups, phone captures automatically</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h4 className="text-yellow-400 font-semibold mb-3 text-lg">5-Minute Setup</h4>
            <p className="text-gray-400 text-sm">One script tag. Works with Shopify, custom checkouts, any platform</p>
          </div>
        </div>
        
        {/* Founder Info */}
        <div className="bg-gray-900 p-10 rounded-lg mb-16 text-left max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">Built by Nik Sharma</h3>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            Former head of growth at <strong className="text-white">Athletic Greens (AG1)</strong> where I scaled the brand from $100M to $300M+ ARR. 
            I've helped 100+ DTC brands optimize their funnels, improve attribution, and scale profitably in the post-iOS 14.5 era.
          </p>
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            After seeing too many founders struggle with broken attribution and generic analytics tools, 
            I built Sharmlytics — the analytics platform I wish I had when scaling brands.
          </p>
          
          <div className="flex justify-center space-x-8">
            <a 
              href="https://twitter.com/mrsharma" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              𝕏 @mrsharma
            </a>
            <a 
              href="https://sharma.co" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✓ sharma.co
            </a>
          </div>
        </div>

        {/* Install Code Block */}
        <div className="bg-gray-900 p-8 rounded-lg mb-12 text-left max-w-2xl mx-auto">
          <h4 className="text-yellow-400 font-semibold text-center mb-4 text-lg">Complete Setup</h4>
          <div className="bg-black p-4 rounded font-mono text-sm text-yellow-400 overflow-x-auto">
            {'<script src="https://sharmlytics.com/pixel.js" data-site="YOUR_SITE_ID"></script>'}
          </div>
          <p className="text-gray-400 text-sm text-center mt-4">
            That's it. One script automatically manages all your pixel events.
          </p>
        </div>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a 
            href="/dashboard" 
            className="inline-block bg-yellow-400 text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors"
          >
            Start Free Trial
          </a>
          <a 
            href="/dashboard" 
            className="inline-block bg-transparent text-white px-10 py-4 rounded-lg font-medium text-lg border-2 border-gray-600 hover:border-yellow-400 transition-colors"
          >
            View Demo
          </a>
        </div>

        {/* Footer note */}
        <p className="text-gray-500 text-sm">
          5-minute setup • No credit card required • Used by 100+ DTC brands
        </p>
      </div>
    </div>
  );
}