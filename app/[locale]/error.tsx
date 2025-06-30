// app/[locale]/error.tsx
'use client'

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <svg className="h-8 w-8 text-red-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong!
            </h1>
            <p className="text-gray-600">
              We encountered an unexpected error. Please try again or return to the homepage.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={reset}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              🔄 Try again
            </button>

            <a
              href="/en"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center"
            >
              🏠 Go home
            </a>
          </div>

          {error.digest && (
            <div className="mt-6 text-xs text-gray-500">
              Error ID: {error.digest}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}