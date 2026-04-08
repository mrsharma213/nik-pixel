export default async function EventsPage() {
  return (
    <>
        <div className="mb-8">
          <h1 className="text-[28px] font-semibold tracking-[-1px] text-white mb-2">
            Custom Events
          </h1>
          <p className="text-[16px] text-[#a6a6a6] leading-relaxed">
            Set up custom events that automatically trigger Meta, Google, and TikTok pixel events based on user behavior.
          </p>
        </div>

        {/* Quick Setup Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
            <h3 className="text-[18px] font-semibold text-white mb-3">Cart Value Events</h3>
            <p className="text-[14px] text-[#a6a6a6] mb-4 leading-relaxed">
              Trigger high-value events when customers hit specific cart thresholds.
            </p>
            <button className="w-full px-4 py-2 bg-[#fbbf24] text-black font-medium text-[14px] rounded-lg hover:bg-[#fcd34d] transition-colors">
              Set Up Cart Events
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
            <h3 className="text-[18px] font-semibold text-white mb-3">Quiz & Lead Capture</h3>
            <p className="text-[14px] text-[#a6a6a6] mb-4 leading-relaxed">
              Track quiz completions, email signups, and phone number submissions.
            </p>
            <button className="w-full px-4 py-2 bg-[#fbbf24] text-black font-medium text-[14px] rounded-lg hover:bg-[#fcd34d] transition-colors">
              Set Up Lead Events
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
            <h3 className="text-[18px] font-semibold text-white mb-3">Product Interest</h3>
            <p className="text-[14px] text-[#a6a6a6] mb-4 leading-relaxed">
              Identify high-intent customers based on product browsing behavior.
            </p>
            <button className="w-full px-4 py-2 bg-[#fbbf24] text-black font-medium text-[14px] rounded-lg hover:bg-[#fcd34d] transition-colors">
              Set Up Interest Events
            </button>
          </div>
        </div>

        {/* Event Configuration Table */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-semibold text-white">Configured Events</h2>
              <button className="px-4 py-2 bg-[rgba(251,191,36,0.15)] text-[#fbbf24] font-medium text-[14px] rounded-lg hover:bg-[rgba(251,191,36,0.25)] transition-colors border border-[rgba(251,191,36,0.3)]">
                + Add Custom Event
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgba(166,166,166,0.1)] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#a6a6a6]">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-[16px] font-medium text-white mb-2">No custom events configured</h3>
              <p className="text-[14px] text-[#a6a6a6] mb-6 max-w-[400px] mx-auto">
                Set up your first custom event to start triggering platform-specific pixel events automatically.
              </p>
              <button className="px-6 py-2 bg-[#fbbf24] text-black font-medium text-[14px] rounded-lg hover:bg-[#fcd34d] transition-colors">
                Create Your First Event
              </button>
            </div>
          </div>
        </div>

        {/* GTM Integration Section */}
        <div className="mt-8 bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-[20px] font-semibold text-white mb-2">Google Tag Manager Integration</h2>
              <p className="text-[14px] text-[#a6a6a6] leading-relaxed max-w-[600px]">
                Connect your GTM account to automatically sync Sharmlytics events with your existing pixel infrastructure.
              </p>
            </div>
            <div className="text-[11px] font-medium uppercase tracking-[0.5px] px-2 py-1 rounded bg-[rgba(166,166,166,0.1)] text-[#a6a6a6]">
              Coming Soon
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[16px] font-medium text-white mb-3">What This Enables:</h4>
              <ul className="space-y-2">
                {[
                  'Auto-create GTM tags for Sharmlytics events',
                  'Sync custom audiences to Meta & Google',
                  'One-click pixel deployment across containers',
                  'Unified event mapping and testing',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[14px] text-[#a6a6a6]">
                    <div className="w-1 h-1 rounded-full bg-[#fbbf24] mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black/30 border border-white/5 rounded-lg p-4">
              <h4 className="text-[14px] font-medium text-white mb-3">Authentication Required</h4>
              <p className="text-[13px] text-[#a6a6a6] mb-4 leading-relaxed">
                To enable GTM integration, you'll need to authenticate with your Google account and grant permissions to manage your Tag Manager containers.
              </p>
              <button 
                disabled
                className="w-full px-4 py-2 bg-[rgba(251,191,36,0.1)] text-[rgba(251,191,36,0.5)] font-medium text-[14px] rounded-lg cursor-not-allowed border border-[rgba(251,191,36,0.2)]"
              >
                Connect Google Account
              </button>
            </div>
          </div>
        </div>
    </>
  );
}