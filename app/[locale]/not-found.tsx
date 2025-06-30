// app/[locale]/not-found.tsx
export default function LocaleNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 flex items-center justify-center pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text mb-4">
            404
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/30">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/en"
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-6 py-3 rounded-lg font-semibold"
            >
              🏠 Back to Home
            </a>
            
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              ← Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="/en/about" className="text-orange-600 hover:text-orange-700 hover:underline">About Us</a>
              <a href="/en/services" className="text-orange-600 hover:text-orange-700 hover:underline">Services</a>
              <a href="/en/contact" className="text-orange-600 hover:text-orange-700 hover:underline">Contact</a>
              <a href="/en/gallery" className="text-orange-600 hover:text-orange-700 hover:underline">Gallery</a>
              <a href="/en/testimonials" className="text-orange-600 hover:text-orange-700 hover:underline">Testimonials</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}