// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <head>
        <title>Error - Purvodaya Energy</title>
      </head>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          background: 'linear-gradient(135deg, #fef2f2, #fef3e2)',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px'
            }}>⚠️</div>
            
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              Something went wrong!
            </h1>
            
            <p style={{
              color: '#6b7280',
              marginBottom: '30px'
            }}>
              We encountered an unexpected error. This has been logged and we're working to fix it.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={reset}
                style={{
                  backgroundColor: '#f97316',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                🔄 Try again
              </button>

              <a
                href="/en"
                style={{
                  backgroundColor: '#f9fafb',
                  color: '#374151',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '1px solid #e5e7eb',
                  display: 'block'
                }}
              >
                🏠 Go home
              </a>
            </div>

            {error.message && (
              <details style={{ marginTop: '20px', textAlign: 'left' }}>
                <summary style={{ fontSize: '14px', color: '#6b7280', cursor: 'pointer' }}>
                  Technical Details
                </summary>
                <div style={{
                  marginTop: '10px',
                  padding: '10px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#6b7280'
                }}>
                  {error.message}
                  {error.digest && <div>Error ID: {error.digest}</div>}
                </div>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}