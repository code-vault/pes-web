export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200/50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mr-4"></div>
          <span className="text-gray-700 font-medium">Loading...</span>
        </div>
      </div>
    </div>
  );
}