'use client';
import { useEffect } from 'react';
import { AlertTriangle, Home, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  useEffect(() => {
    // Hide header, footer, and floating elements
    const hideElements = () => {
      const selectors = [
        'header', 
        'nav[role="navigation"]',
        'footer',
        '[data-testid="header"]',
        '[class*="header"]',
        '[class*="nav"]',
        '[class*="footer"]',
        '[class*="floating"]'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'none';
          }
        });
      });

      // Also hide main padding that might be for header spacing
      const main = document.querySelector('main');
      if (main instanceof HTMLElement) {
        main.style.paddingTop = '0';
        main.style.marginTop = '0';
      }
    };

    hideElements();
    const timer = setTimeout(hideElements, 100);

    return () => {
      clearTimeout(timer);
      // Restore elements when leaving
      const selectors = [
        'header', 'nav[role="navigation"]', 'footer',
        '[class*="header"]', '[class*="footer"]', '[class*="floating"]'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = '';
          }
        });
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* Brand */}
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Purvodaya Energy Solutions
            </h2>
            <p className="text-sm text-gray-500">Solar Energy Experts</p>
          </Link>
        </div>

        {/* Error Content */}
        <div className="mb-16">
          <div className="text-8xl font-bold text-gray-100 mb-6">404</div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            This page does not exist
          </h1>
          
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            The page you are looking for might have been removed, renamed, 
            or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg">
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="px-8 py-3 text-lg border-gray-300">
                <Mail className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm mb-8">
            <Link href="/services" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
              Solar Services
            </Link>
            <Link href="/gallery" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
              Gallery
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/testimonials" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
              Reviews
            </Link>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-3 text-sm">Need help?</p>
            <div className="flex justify-center gap-6 text-sm">
              <a href="tel:+919876543210" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
                +91 98765 43210
              </a>
              <a href="mailto:info@purvodayaenergy.com" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
                Email Support
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © 2024 Purvodaya Energy Solutions
          </p>
        </div>
      </div>
    </div>
  );
}