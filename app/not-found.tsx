// app/not-found.tsx
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found | Purvodaya Energy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '60px 40px',
            borderRadius: '20px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
            textAlign: 'center',
            maxWidth: '600px',
            width: '100%'
          }}>
            <div style={{
              fontSize: '6rem',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #f97316, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '20px'
            }}>
              404
            </div>
            
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '15px'
            }}>
              Page Not Found
            </h1>
            
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              marginBottom: '30px'
            }}>
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/en"
                style={{
                  backgroundColor: '#f97316',
                  color: 'white',
                  padding: '15px 30px',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                🏠 Return Home
              </a>
              
              <button
                onClick={() => window.history.back()}
                style={{
                  backgroundColor: 'white',
                  color: '#374151',
                  padding: '15px 30px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ← Go Back
              </button>
            </div>

            <div style={{
              marginTop: '40px',
              paddingTop: '20px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '15px' }}>
                You might be looking for:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
                <a href="/en/about" style={{ color: '#f97316', textDecoration: 'none' }}>About Us</a>
                <a href="/en/services" style={{ color: '#f97316', textDecoration: 'none' }}>Services</a>
                <a href="/en/contact" style={{ color: '#f97316', textDecoration: 'none' }}>Contact</a>
                <a href="/en/gallery" style={{ color: '#f97316', textDecoration: 'none' }}>Gallery</a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}