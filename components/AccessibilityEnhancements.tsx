'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AccessibilityEnhancements() {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const pathname = usePathname();

  // Skip to main content functionality
  useEffect(() => {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-600 focus:text-white focus:rounded';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    return () => {
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink);
      }
    };
  }, []);

  // Focus management for route changes
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    const heading = document.querySelector('h1');
    
    if (heading) {
      heading.focus();
      heading.setAttribute('tabindex', '-1');
    } else if (mainContent) {
      mainContent.focus();
      mainContent.setAttribute('tabindex', '-1');
    }
  }, [pathname]);

  // High contrast mode
  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  // Font size adjustment
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Keyboard navigation announcement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <>
      {/* Accessibility toolbar */}
      <div className="fixed top-0 right-0 z-50 bg-white border border-gray-200 rounded-bl-lg shadow-lg p-2 space-y-2">
        <button
          onClick={() => setIsHighContrast(!isHighContrast)}
          className="block w-full text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          aria-label={`Turn ${isHighContrast ? 'off' : 'on'} high contrast mode`}
        >
          {isHighContrast ? '🔆' : '🌓'} Contrast
        </button>
        
        <div className="space-y-1">
          <button
            onClick={() => setFontSize(Math.min(fontSize + 10, 150))}
            className="block w-full text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
            aria-label="Increase font size"
          >
            🔍+ Font
          </button>
          <button
            onClick={() => setFontSize(Math.max(fontSize - 10, 80))}
            className="block w-full text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
            aria-label="Decrease font size"
          >
            🔍- Font
          </button>
        </div>
      </div>

      {/* Screen reader announcements */}
      <div 
        id="sr-announcements" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      />

      {/* CSS for accessibility */}
      <style jsx global>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .focus\\:not-sr-only:focus {
          position: static;
          width: auto;
          height: auto;
          padding: inherit;
          margin: inherit;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }

        /* High contrast mode */
        .high-contrast {
          filter: contrast(200%) saturate(0%);
        }

        /* Focus indicators */
        .keyboard-navigation *:focus {
          outline: 3px solid #f97316 !important;
          outline-offset: 2px !important;
        }

        /* Better focus for buttons */
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible {
          outline: 3px solid #f97316;
          outline-offset: 2px;
        }

        /* Improved color contrast */
        .text-gray-600 {
          color: #4b5563;
        }

        .text-gray-500 {
          color: #6b7280;
        }

        /* Motion reduction */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  );
}