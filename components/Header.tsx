"use client";
import {Link} from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Globe } from 'lucide-react';
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

  // Main navigation items (left side)
  const mainNavItems = [
    { href: "#about", label: t('about') },
    { href: "#services", label: t('services') },
    { href: "#gallery", label: t('gallery') },
    { href: "#testimonials", label: t('testimonials') }
  ];

  // Right side navigation items (before CTA button)
  const rightNavItems = [
    { href: "#contact", label: locale === 'hi' ? 'संपर्क करें' : 'Contact Us' },
    { href: "/faq", label: "FAQ" }
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20 py-3' 
        : 'bg-white/90 backdrop-blur-sm py-4'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300 group">
            <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
              <Sun className="h-9 w-9 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {locale === 'hi' ? 'पूर्वोदय एनर्जी' : 'Purvodaya Energy'}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {locale === 'hi' ? 'सोलर एनर्जी सॉल्यूशंस' : 'Solar Energy Solutions'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
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

          {/* Right side - Contact, FAQ, Language & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            {rightNavItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105 px-3 py-2 rounded-lg hover:bg-orange-50"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4 group-hover:text-orange-500 transition-colors" />
              <span className="text-sm font-medium">{locale === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
            
            {/* CTA Button */}
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-6 py-3 text-sm font-semibold rounded-lg">
              {locale === 'hi' ? 'मुफ्त कोटेशन' : 'Get Quote'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl">
              {/* Main navigation */}
              {mainNavItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="block px-6 py-4 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-xl transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Divider */}
              <div className="border-t border-gray-200/50 my-4"></div>
              
              {/* Right side navigation */}
              {rightNavItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="block px-6 py-3 text-gray-600 hover:text-orange-500 hover:bg-orange-50/50 rounded-xl transition-all font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile actions */}
              <div className="px-3 py-6 border-t border-gray-200/50 mt-4 space-y-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors w-full justify-center"
                  aria-label="Toggle language"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm font-medium">{locale === 'en' ? 'हिंदी' : 'English'}</span>
                </button>
                
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg py-4 rounded-xl font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {locale === 'hi' ? 'मुफ्त कोटेशन' : 'Get Quote'}
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