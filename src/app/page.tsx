export default function HomePage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sharmlytics — DTC Analytics Platform</title>
        <meta name="description" content="DTC analytics that actually understand e-commerce operations. Smart event tracking, attribution, and insights for scaling brands." />
        <style dangerouslySetInnerHTML={{__html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            background: #000; 
            color: #fff; 
            min-height: 100vh; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            padding: 20px; 
            text-align: center;
          }
          .container { max-width: 900px; margin: 0 auto; }
          .avatar { width: 120px; height: 120px; border-radius: 50%; border: 3px solid #333; margin: 0 auto 40px; }
          .title { font-size: 64px; font-weight: bold; margin: 0 0 30px 0; line-height: 1.1; letter-spacing: -2px; }
          .subtitle { font-size: 28px; color: #888; margin: 0 0 40px 0; line-height: 1.3; }
          .description { font-size: 20px; line-height: 1.6; color: #ccc; margin-bottom: 50px; }
          .benefits { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-bottom: 60px; }
          .benefit { background: #111; padding: 25px; border-radius: 10px; }
          .benefit h4 { color: #fbbf24; margin: 0 0 10px 0; font-size: 16px; font-weight: 600; }
          .benefit p { color: #999; margin: 0; font-size: 14px; line-height: 1.4; }
          .founder { background: #111; padding: 40px; border-radius: 15px; margin-bottom: 50px; text-align: left; }
          .founder h3 { color: #fff; margin: 0 0 20px 0; font-size: 24px; text-align: center; }
          .founder p { color: #aaa; margin: 0 0 20px 0; font-size: 18px; line-height: 1.5; }
          .founder p:last-child { margin: 0; }
          .social { margin-top: 25px; display: flex; justify-content: center; gap: 30px; }
          .social a { color: #888; text-decoration: none; font-size: 16px; }
          .install { background: #111; padding: 30px; border-radius: 10px; margin-bottom: 40px; text-align: left; }
          .install h4 { color: #fbbf24; margin: 0 0 15px 0; font-size: 16px; text-align: center; }
          .install code { 
            display: block; background: #000; padding: 20px; border-radius: 8px; 
            font-size: 14px; font-family: Monaco, Menlo, monospace; color: #fbbf24; 
            overflow-x: auto;
          }
          .install p { color: #999; font-size: 14px; margin: 15px 0 0 0; text-align: center; }
          .ctas { margin-bottom: 40px; }
          .ctas a { 
            display: inline-block; padding: 18px 40px; text-decoration: none; 
            border-radius: 10px; font-weight: bold; font-size: 18px; margin-right: 20px;
          }
          .primary { background: #fbbf24; color: #000; }
          .secondary { background: transparent; color: #fff; border: 2px solid #333; }
          .footer { color: #666; font-size: 14px; }
        `}} />
      </head>
      <body>
        <div className="container">
          {/* Avatar */}
          <img 
            src="https://pbs.twimg.com/profile_images/1737179558843244544/Kw-Y4z7F_400x400.jpg" 
            alt="Nik Sharma" 
            className="avatar"
          />
          
          {/* Main Title */}
          <h1 className="title">Sharmlytics</h1>
          
          {/* Subtitle */}
          <p className="subtitle">
            DTC analytics that actually understand<br />
            e-commerce operations
          </p>
          
          {/* Main Description */}
          <div className="description">
            <p>
              Smart event tracking for cart thresholds, quiz completions, and lead capture. 
              Automatically fire the right Meta, Google, and TikTok events without manual pixel management.
            </p>
            <br />
            <p>
              One script replaces all your tracking pixels. See complete attribution even when iOS blocks traditional tracking.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="benefits">
            <div className="benefit">
              <h4>Cart Value Events</h4>
              <p>Auto-trigger high-value events at $50, $100, $150+ cart thresholds</p>
            </div>
            <div className="benefit">
              <h4>Quiz & Lead Tracking</h4>
              <p>Track quiz completions, email signups, phone captures automatically</p>
            </div>
            <div className="benefit">
              <h4>5-Minute Setup</h4>
              <p>One script tag. Works with Shopify, custom checkouts, any platform</p>
            </div>
          </div>
          
          {/* Founder Info */}
          <div className="founder">
            <h3>Built by Nik Sharma</h3>
            <p>
              Former head of growth at <strong>Athletic Greens (AG1)</strong> where I scaled the brand from $100M to $300M+ ARR. 
              I've helped 100+ DTC brands optimize their funnels, improve attribution, and scale profitably in the post-iOS 14.5 era.
            </p>
            <p>
              After seeing too many founders struggle with broken attribution and generic analytics tools, 
              I built Sharmlytics — the analytics platform I wish I had when scaling brands.
            </p>
            
            <div className="social">
              <a href="https://twitter.com/mrsharma" target="_blank" rel="noopener noreferrer">
                𝕏 @mrsharma
              </a>
              <a href="https://sharma.co" target="_blank" rel="noopener noreferrer">
                ✓ sharma.co
              </a>
            </div>
          </div>

          {/* Install Code Block */}
          <div className="install">
            <h4>Complete Setup</h4>
            <code>
              &lt;script src="https://sharmlytics.com/pixel.js" data-site="YOUR_SITE_ID"&gt;&lt;/script&gt;
            </code>
            <p>That's it. One script automatically manages all your pixel events.</p>
          </div>
          
          {/* CTAs */}
          <div className="ctas">
            <a href="/dashboard" className="primary">Start Free Trial</a>
            <a href="/dashboard" className="secondary">View Demo</a>
          </div>

          {/* Footer note */}
          <p className="footer">
            5-minute setup • No credit card required • Used by 100+ DTC brands
          </p>
        </div>
      </body>
    </html>
  );
}