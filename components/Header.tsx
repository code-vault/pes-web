"use client";
import {Link} from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Globe, ChevronDown, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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

  // Main navigation items
  const mainNavItems = [
    { href: "#services", label: t('services') },
    { href: "#about", label: t('about') }
  ];

  // Secondary navigation items (will be in dropdown)
  const moreNavItems = [
    { href: "#gallery", label: t('gallery') },
    { href: "#testimonials", label: t('testimonials') },
    { href: "/faq", label: "FAQ" }
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with Home Link */}
          <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-2 rounded-xl shadow-lg">
              <Sun className="h-8 w-8 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {locale === 'hi' ? 'पूर्वोदय एनर्जी' : 'Purvodaya Energy'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Cleaner */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Home Icon */}
            <Link href="/" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105 flex items-center" title={t('home')}>
              <Home className="h-5 w-5" />
            </Link>

            {/* Main navigation items */}
            {mainNavItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105"
              >
                {item.label}
              </Link>
            ))}

            <Link href="#contact" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105">
              {t('contact')}
            </Link>

            {/* More dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="flex items-center text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105"
              >
                More
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 py-2"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {moreNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 transition-all font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side - Language & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{locale === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-6">
              {t('getQuote')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu - Organized */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 rounded-b-2xl shadow-xl">
              {/* Home link with icon */}
              <Link 
                href="/" 
                className="flex items-center px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 mr-3" />
                {t('home')}
              </Link>

              {/* Main navigation */}
              {mainNavItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <Link 
                href="#contact" 
                className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>
              
              {/* Divider */}
              <div className="border-t border-gray-200/50 my-2"></div>
              
              {/* Secondary navigation */}
              {moreNavItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="block px-4 py-3 text-gray-600 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile actions */}
              <div className="px-3 py-4 border-t border-gray-200/50 mt-2 space-y-3">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full justify-center"
                  aria-label="Toggle language"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">{locale === 'en' ? 'हिंदी' : 'English'}</span>
                </button>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('getQuote')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;