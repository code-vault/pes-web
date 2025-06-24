'use client';
import { useEffect } from 'react';

export default function WebVitals() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        const sendToAnalytics = (metric: any) => {
          // Send to your analytics service
          console.log('Web Vital:', metric);
          
          // Example: Send to Google Analytics
          if (typeof gtag !== 'undefined') {
            gtag('event', metric.name, {
              event_category: 'Web Vitals',
              event_label: metric.id,
              value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
              non_interaction: true,
            });
          }
        };

        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getFCP(sendToAnalytics);
        getLCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
      });
    }
  }, []);

  return null;
}