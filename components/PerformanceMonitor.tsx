"use client";
import { useEffect, useState } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<WebVitalsMetric[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Import web-vitals dynamically to avoid SSR issues
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      const handleMetric = (metric: any) => {
        setMetrics(prev => {
          const existing = prev.find(m => m.name === metric.name);
          if (existing) {
            return prev.map(m => m.name === metric.name ? {
              name: metric.name,
              value: metric.value,
              rating: metric.rating,
              delta: metric.delta
            } : m);
          }
          return [...prev, {
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta
          }];
        });
      };

      // Monitor Core Web Vitals
      getCLS(handleMetric);
      getFID(handleMetric);
      getFCP(handleMetric);
      getLCP(handleMetric);
      getTTFB(handleMetric);
    });

    // Monitor custom performance metrics
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`Performance: ${entry.name} - ${entry.duration}ms`);
      }
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });

    return () => observer.disconnect();
  }, []);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Toggle Performance Monitor"
      >
        📊
      </button>

      {/* Performance Panel */}
      {isVisible && (
        <div className="fixed bottom-16 left-4 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-w-sm">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center">
            📊 Performance Metrics
            <button
              onClick={() => setIsVisible(false)}
              className="ml-auto text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </h3>
          
          <div className="space-y-2 text-sm">
            {metrics.length === 0 ? (
              <p className="text-gray-500">Loading metrics...</p>
            ) : (
              metrics.map((metric) => (
                <div key={metric.name} className={`p-2 rounded ${getRatingColor(metric.rating)}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{metric.name}</span>
                    <span>{formatValue(metric.name, metric.value)}</span>
                  </div>
                  <div className="text-xs opacity-75 capitalize">
                    {metric.rating.replace('-', ' ')}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
            <p><strong>CLS:</strong> Cumulative Layout Shift</p>
            <p><strong>FID:</strong> First Input Delay</p>
            <p><strong>FCP:</strong> First Contentful Paint</p>
            <p><strong>LCP:</strong> Largest Contentful Paint</p>
            <p><strong>TTFB:</strong> Time to First Byte</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PerformanceMonitor;