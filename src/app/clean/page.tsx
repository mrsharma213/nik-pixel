export default function CleanPage() {
  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{ maxWidth: '800px' }}>
        <img 
          src="https://pbs.twimg.com/profile_images/1737179558843244544/Kw-Y4z7F_400x400.jpg" 
          alt="Nik Sharma" 
          style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            marginBottom: '40px',
            border: '3px solid #333'
          }}
        />
        <h1 style={{ 
          fontSize: '64px', 
          fontWeight: 'bold', 
          marginBottom: '30px',
          lineHeight: '1.1',
          letterSpacing: '-2px'
        }}>
          Sharmlytics
        </h1>
        <p style={{ 
          fontSize: '28px', 
          color: '#888', 
          marginBottom: '40px',
          lineHeight: '1.3'
        }}>
          DTC analytics that actually understand<br />
          e-commerce operations
        </p>
        
        <div style={{ 
          background: '#111', 
          padding: '40px', 
          borderRadius: '15px', 
          marginBottom: '50px',
          textAlign: 'left'
        }}>
          <h3 style={{ 
            color: '#fff', 
            marginBottom: '20px', 
            fontSize: '24px',
            textAlign: 'center'
          }}>
            Built by Nik Sharma
          </h3>
          <p style={{ 
            color: '#aaa', 
            marginBottom: '20px', 
            fontSize: '18px',
            lineHeight: '1.5'
          }}>
            Former head of growth at <strong style={{ color: '#fff' }}>Athletic Greens (AG1)</strong> where I scaled the brand from $100M to $300M+ ARR. 
            I've helped 100+ DTC brands optimize their funnels, improve attribution, and scale profitably.
          </p>
          <p style={{ 
            color: '#aaa', 
            margin: '0', 
            fontSize: '18px',
            lineHeight: '1.5'
          }}>
            Built Sharmlytics because I got tired of seeing founders waste millions on broken attribution.
          </p>
        </div>
        
        <div style={{ marginBottom: '40px' }}>
          <a 
            href="/dashboard" 
            style={{
              display: 'inline-block',
              background: '#fbbf24',
              color: '#000',
              padding: '18px 40px',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '18px',
              marginRight: '20px'
            }}
          >
            Start Free Trial
          </a>
          <a 
            href="/dashboard" 
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: '#fff',
              padding: '18px 40px',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: '500',
              fontSize: '18px',
              border: '2px solid #333'
            }}
          >
            View Demo
          </a>
        </div>
        
        <p style={{ color: '#666', fontSize: '14px' }}>
          ✅ THIS IS THE CORRECT CLEAN HOMEPAGE LAYOUT<br />
          pixel.nik.co/clean proves deployment works<br />
          5-minute setup • No credit card required
        </p>
      </div>
    </div>
  );
}