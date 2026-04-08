import { CopyButton } from '@/components/CopyButton';

const SCRIPT_TAG = '<script src="https://pixel.sharmlytics.com/pixel.js" data-site="YOUR_SITE_ID"></script>';

export default function HomePage() {
  return (
    <div style={{ margin: 0, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", background: "#000", color: "#fff" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Sharmlytics',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            description: 'DTC analytics that actually understand e-commerce operations. Smart event tracking, attribution, and insights for scaling brands.',
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

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          
          {/* Avatar */}
          <div style={{ marginBottom: "40px" }}>
            <img 
              src="https://pbs.twimg.com/profile_images/1737179558843244544/Kw-Y4z7F_400x400.jpg" 
              alt="Nik Sharma" 
              style={{ width: "120px", height: "120px", borderRadius: "50%", border: "3px solid #333" }} 
            />
          </div>
          
          {/* Main Title */}
          <h1 style={{ fontSize: "64px", fontWeight: "bold", margin: "0 0 30px 0", lineHeight: "1.1", letterSpacing: "-2px" }}>
            Sharmlytics
          </h1>
          
          {/* Subtitle */}
          <p style={{ fontSize: "28px", color: "#888", margin: "0 0 40px 0", lineHeight: "1.3" }}>
            DTC analytics that actually understand<br />
            e-commerce operations
          </p>
          
          {/* Main Description */}
          <div style={{ fontSize: "20px", lineHeight: "1.6", color: "#ccc", marginBottom: "50px", maxWidth: "800px", margin: "0 auto 50px auto" }}>
            <p style={{ margin: "0 0 25px 0" }}>
              Smart event tracking for cart thresholds, quiz completions, and lead capture. 
              Automatically fire the right Meta, Google, and TikTok events without manual pixel management.
            </p>
            <p style={{ margin: "0 0 25px 0" }}>
              One script replaces all your tracking pixels. See complete attribution even when iOS blocks traditional tracking.
            </p>
          </div>

          {/* Key Benefits */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", marginBottom: "60px", maxWidth: "800px", margin: "0 auto 60px auto" }}>
            <div style={{ background: "#111", padding: "25px", borderRadius: "10px" }}>
              <h4 style={{ color: "#fbbf24", margin: "0 0 10px 0", fontSize: "16px", fontWeight: "600" }}>Cart Value Events</h4>
              <p style={{ color: "#999", margin: "0", fontSize: "14px", lineHeight: "1.4" }}>
                Auto-trigger high-value events at $50, $100, $150+ cart thresholds
              </p>
            </div>
            <div style={{ background: "#111", padding: "25px", borderRadius: "10px" }}>
              <h4 style={{ color: "#fbbf24", margin: "0 0 10px 0", fontSize: "16px", fontWeight: "600" }}>Quiz & Lead Tracking</h4>
              <p style={{ color: "#999", margin: "0", fontSize: "14px", lineHeight: "1.4" }}>
                Track quiz completions, email signups, phone captures automatically
              </p>
            </div>
            <div style={{ background: "#111", padding: "25px", borderRadius: "10px" }}>
              <h4 style={{ color: "#fbbf24", margin: "0 0 10px 0", fontSize: "16px", fontWeight: "600" }}>5-Minute Setup</h4>
              <p style={{ color: "#999", margin: "0", fontSize: "14px", lineHeight: "1.4" }}>
                One script tag. Works with Shopify, custom checkouts, any platform
              </p>
            </div>
          </div>
          
          {/* Creator Info */}
          <div style={{ background: "#111", padding: "40px", borderRadius: "15px", marginBottom: "50px", textAlign: "left", maxWidth: "700px", margin: "0 auto 50px auto" }}>
            <h3 style={{ color: "#fff", margin: "0 0 20px 0", fontSize: "24px", textAlign: "center" }}>Built by Nik Sharma</h3>
            <p style={{ color: "#aaa", margin: "0 0 20px 0", fontSize: "18px", lineHeight: "1.5" }}>
              Former head of growth at <strong style={{ color: "#fff" }}>Athletic Greens (AG1)</strong> where I scaled the brand from $100M to $300M+ ARR. 
              I've helped 100+ DTC brands optimize their funnels, improve attribution, and scale profitably in the post-iOS 14.5 era.
            </p>
            <p style={{ color: "#aaa", margin: "0", fontSize: "18px", lineHeight: "1.5" }}>
              After seeing too many founders struggle with broken attribution and generic analytics tools, 
              I built Sharmlytics — the analytics platform I wish I had when scaling brands.
            </p>
            
            {/* Social Links */}
            <div style={{ marginTop: "25px", display: "flex", justifyContent: "center", gap: "30px" }}>
              <a href="https://twitter.com/mrsharma" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style={{ color: "#888", textDecoration: "none", fontSize: "16px" }}>
                𝕏 @mrsharma
              </a>
              <a href="https://sharma.co" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 style={{ color: "#888", textDecoration: "none", fontSize: "16px" }}>
                ✓ sharma.co
              </a>
            </div>
          </div>

          {/* Install Code Block */}
          <div style={{ background: "#111", padding: "30px", borderRadius: "10px", marginBottom: "40px", textAlign: "left", maxWidth: "600px", margin: "0 auto 40px auto" }}>
            <h4 style={{ color: "#fbbf24", margin: "0 0 15px 0", fontSize: "16px", textAlign: "center" }}>Complete Setup</h4>
            <code style={{ 
              display: "block", 
              background: "#000", 
              padding: "20px", 
              borderRadius: "8px", 
              fontSize: "14px", 
              fontFamily: "Monaco, Menlo, monospace",
              color: "#fbbf24",
              overflowX: "auto"
            }}>
              {SCRIPT_TAG}
            </code>
            <p style={{ color: "#999", fontSize: "14px", margin: "15px 0 0 0", textAlign: "center" }}>
              That's it. One script automatically manages all your pixel events.
            </p>
          </div>
          
          {/* CTA */}
          <div style={{ marginBottom: "40px" }}>
            <a href="/dashboard" 
               style={{ 
                 display: "inline-block", 
                 background: "#fbbf24", 
                 color: "#000", 
                 padding: "18px 40px", 
                 textDecoration: "none", 
                 borderRadius: "10px", 
                 fontWeight: "bold", 
                 fontSize: "18px",
                 marginRight: "20px"
               }}>
              Start Free Trial
            </a>
            <a href="/dashboard" 
               style={{ 
                 display: "inline-block", 
                 background: "transparent", 
                 color: "#fff", 
                 padding: "18px 40px", 
                 textDecoration: "none", 
                 borderRadius: "10px", 
                 fontWeight: "500", 
                 fontSize: "18px",
                 border: "2px solid #333"
               }}>
              View Demo
            </a>
          </div>

          {/* Footer note */}
          <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>
            5-minute setup • No credit card required • Used by 100+ DTC brands
          </p>
        </div>
      </div>
    </div>
  );
}
