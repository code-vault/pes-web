'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="mb-6">
                <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Something went wrong!
                </h1>
                <p className="text-gray-600">
                  We encountered an unexpected error. This has been logged and we&apos;re working to fix it.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={reset}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try again
                </button>

                <Link
                  href="/"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go home
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <details className="text-left">
                  <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                    Technical Details
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded text-xs text-gray-600 font-mono">
                    {error.message}
                    {error.digest && (
                      <div className="mt-1">
                        Error ID: {error.digest}
                      </div>
                    )}
                  </div>
                </details>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                Need help? Contact us at{' '}
                <a href="mailto:support@purvodayaenergy.com" className="text-orange-600 hover:text-orange-700">
                  support@purvodayaenergy.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}