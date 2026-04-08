export default function NewHomePage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sharmlytics — DTC Analytics Platform</title>
        <style dangerouslySetInnerHTML={{__html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #000; color: #fff; min-height: 100vh; 
            display: flex; align-items: center; justify-content: center; 
            padding: 20px; text-align: center;
          }
          .container { max-width: 900px; }
          h1 { font-size: 64px; font-weight: bold; margin-bottom: 30px; }
          .subtitle { font-size: 28px; color: #888; margin-bottom: 40px; }
          .avatar { width: 120px; height: 120px; border-radius: 50%; margin-bottom: 40px; }
        `}} />
      </head>
      <body>
        <div className="container">
          <img 
            src="https://pbs.twimg.com/profile_images/1737179558843244544/Kw-Y4z7F_400x400.jpg" 
            alt="Nik Sharma" 
            className="avatar"
          />
          <h1>Sharmlytics</h1>
          <p className="subtitle">DTC analytics that actually understand e-commerce operations</p>
          <p>Former AG1 Head of Growth ($100M → $300M ARR)</p>
          <br />
          <p><strong>THIS IS THE CORRECT HOMEPAGE - CLEAN LAYOUT WORKS!</strong></p>
          <br />
          <a href="/dashboard" style={{
            display: 'inline-block',
            background: '#fbbf24',
            color: '#000',
            padding: '15px 30px',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: 'bold'
          }}>
            Start Free Trial
          </a>
        </div>
      </body>
    </html>
  );
}