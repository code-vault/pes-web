// app/error.tsx
'use client'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
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
        borderRadius: '15px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>😵</div>
        
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '10px'
        }}>
          Oops! Something went wrong
        </h2>
        
        <p style={{
          color: '#6b7280',
          marginBottom: '25px',
          fontSize: '14px'
        }}>
          Don't worry, this happens sometimes. Try refreshing the page.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={reset}
            style={{
              backgroundColor: '#f97316',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Try again
          </button>

          <a
            href="/en"
            style={{
              backgroundColor: '#f9fafb',
              color: '#374151',
              padding: '10px 20px',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              border: '1px solid #e5e7eb'
            }}
          >
            Return home
          </a>
        </div>
      </div>
    </div>
  )
}