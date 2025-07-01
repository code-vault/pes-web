"use client";
import {Link} from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Globe, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'hi' : 'en';
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPathname = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPathname);
  };

  // Main navigation items (center)
  const mainNavItems = [
    { href: "/about", label: t('about') },
    { href: "/services", label: t('services') },
    { href: "/gallery", label: t('gallery') },
    { href: "/testimonials", label: t('testimonials') }
  ];

  // Handle contact navigation - scroll to contact section on homepage, navigate to contact page on other pages
  const handleContactClick = () => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    
    if (currentPath === '/') {
      // On homepage - scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On other pages - navigate to contact page
      router.push(`/${locale}/contact`);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar - Clean and Minimal */}
      <div className={`bg-gray-50 border-b border-gray-200/50 py-1.5 fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            {/* Left side - Contact */}
            <div className="hidden md:flex items-center space-x-1 text-gray-600">
              <Phone className="h-3 w-3" />
              <span>{t('topBar.phone')}</span>
            </div>
            
            {/* Right side - Social Media & Language */}
            <div className="flex items-center space-x-4">
              {/* Social media links */}
              <div className="flex items-center space-x-2">
                <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors" aria-label={t('social.facebook')}>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors" aria-label={t('social.linkedin')}>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors" aria-label={t('social.instagram')}>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C3.85 14.724 3.85 12.78 5.126 11.504c1.276-1.276 3.091-1.453 4.543-.532 1.297.824 1.985 2.27 1.628 3.611-.356 1.341-1.628 2.405-3.023 2.405h-.825zm7.07 0c-1.297 0-2.448-.49-3.323-1.297-1.276-1.276-1.276-3.22 0-4.496 1.276-1.276 3.091-1.453 4.543-.532 1.297.824 1.985 2.27 1.628 3.611-.356 1.341-1.628 2.405-3.023 2.405h-.825z"/>
                  </svg>
                </a>
              </div>
              
              {/* Divider */}
              <div className="w-px h-4 bg-gray-300"></div>
              
              {/* Language switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-orange-500 transition-colors group rounded"
                aria-label={t('languageSwitcher.toggle')}
              >
                <Globe className="h-3 w-3 group-hover:text-orange-500 transition-colors" />
                <span className="font-medium">{t('languageSwitcher.current')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Sticks to top when scrolled with proper mobile spacing */}
      <header className={`fixed w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? 'top-0 bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20 py-3' 
          : 'top-0 md:top-8 bg-white/90 backdrop-blur-sm py-3 md:py-4'
      }`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section - Responsive sizing */}
            <div className="flex-shrink-0 lg:w-72 -ml-2 sm:-ml-4">
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover:scale-105 transition-transform duration-300 group">
                <div className="bg-gradient-to-br from-orange-600 to-amber-600 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Sun - positioned higher */}
                    <circle cx="16" cy="8" r="3" fill="currentColor" />
                    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="16" y1="2" x2="16" y2="3" />
                      <line x1="23" y1="5" x2="22" y2="6" />
                      <line x1="9" y1="5" x2="10" y2="6" />
                      <line x1="25" y1="8" x2="24" y2="8" />
                      <line x1="8" y1="8" x2="7" y2="8" />
                    </g>
                    
                    {/* Simple rooftop */}
                    <path d="M4 18 L16 14 L28 18 L28 24 L4 24 Z" fill="currentColor" opacity="0.7" />
                    
                    {/* Solar panels - simplified */}
                    <g fill="currentColor">
                      <rect x="6" y="17" width="6" height="4" rx="0.5" opacity="0.9" />
                      <rect x="13" y="15.5" width="6" height="4" rx="0.5" opacity="0.9" />
                      <rect x="20" y="17" width="6" height="4" rx="0.5" opacity="0.9" />
                    </g>
                    
                    {/* Energy rays from sun to panels */}
                    <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6">
                      <line x1="14" y1="11" x2="9" y2="17" />
                      <line x1="16" y1="11" x2="16" y2="15" />
                      <line x1="18" y1="11" x2="23" y2="17" />
                    </g>
                  </svg>
                </div>
                {/* Responsive logo text */}
                <div>
                  <div className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-black bg-gradient-to-r from-orange-700 via-amber-600 to-orange-800 bg-clip-text text-transparent leading-tight tracking-tight">
                    {t('logo.main')}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent font-semibold tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] uppercase">
                    {t('logo.tagline')}
                  </div>
                </div>
              </Link>
            </div>

            {/* Center Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
              {mainNavItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105 px-3 py-2 rounded-lg hover:bg-orange-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side - Contact, FAQ & CTA */}
            <div className="hidden lg:flex items-center space-x-4 w-64 justify-end">
              {/* Dynamic Contact Link */}
              <button
                onClick={handleContactClick}
                className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105 px-3 py-2 rounded-lg hover:bg-orange-50 whitespace-nowrap"
              >
                {t('contact')}
              </button>
              
              {/* FAQ Link */}
              <Link 
                href="/faq" 
                className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105 px-3 py-2 rounded-lg hover:bg-orange-50 whitespace-nowrap"
              >
                FAQ
              </Link>
              
              {/* CTA Button */}
              <Button 
                onClick={handleContactClick}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-6 py-3 font-semibold rounded-lg ml-3 whitespace-nowrap"
              >
                {t('getQuote')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                className="p-2 sm:p-3 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={t('mobileMenu.toggle')}
              >
                {isMenuOpen ? <X className="h-6 w-6 sm:h-7 sm:w-7" /> : <Menu className="h-6 w-6 sm:h-7 sm:w-7" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Full width with proper spacing */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 sm:mt-6">
              <div className="px-3 sm:px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl">
                {/* Main navigation */}
                {mainNavItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="block px-4 sm:px-6 py-3 sm:py-4 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-xl transition-all font-medium text-base sm:text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Divider */}
                <div className="border-t border-gray-200/50 my-4"></div>
                
                {/* Contact Navigation */}
                <button 
                  onClick={handleContactClick}
                  className="block w-full text-left px-4 sm:px-6 py-3 text-gray-600 hover:text-orange-500 hover:bg-orange-50/50 rounded-xl transition-all font-medium text-sm sm:text-base"
                >
                  {t('contact')}
                </button>
                
                {/* FAQ Link */}
                <Link 
                  href="/faq" 
                  className="block px-4 sm:px-6 py-3 text-gray-600 hover:text-orange-500 hover:bg-orange-50/50 rounded-xl transition-all font-medium text-sm sm:text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                
                {/* Mobile actions */}
                <div className="px-3 py-6 border-t border-gray-200/50 mt-4">
                  <Button 
                    onClick={handleContactClick}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg"
                  >
                    {t('getQuote')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;