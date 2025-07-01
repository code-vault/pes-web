'use client';
export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border">
          <div className="bg-gradient-to-br from-gray-500 to-slate-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl">📡</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            You're Offline
          </h1>
          
          <p className="text-gray-600 mb-8">
            Please check your internet connection and try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}