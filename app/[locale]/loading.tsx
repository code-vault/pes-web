// app/[locale]/loading.tsx
export default function LocaleLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      <div className="text-center">
        {/* Animated solar panel loader */}
        <div className="relative mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-500 rounded-lg shadow-lg animate-pulse"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-orange-200 rounded-lg animate-spin border-t-orange-500"></div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Loading Purvodaya Energy
        </h2>
        <p className="text-gray-600">
          Preparing your solar energy experience...
        </p>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}   