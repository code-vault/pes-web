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
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'hi' : 'en';
    // Replace the current locale in the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPathname = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPathname);
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20' 
        : 'bg-white/70 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-2 rounded-xl shadow-lg">
              <Sun className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t('companyName')}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105">{t('home')}</Link>
            <Link href="#services" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105">{t('services')}</Link>
            <Link href="#about" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105">{t('about')}</Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105">{t('testimonials')}</Link>
            <Link href="#contact" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105">{t('contact')}</Link>
          </nav>

          {/* Language Toggle & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 rounded-b-2xl shadow-xl">
              <Link href="#home" className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium">{t('home')}</Link>
              <Link href="#services" className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium">{t('services')}</Link>
              <Link href="#about" className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium">{t('about')}</Link>
              <Link href="#testimonials" className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium">{t('testimonials')}</Link>
              <Link href="#contact" className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium">{t('contact')}</Link>
              <div className="px-3 py-2 flex items-center justify-between">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Toggle language"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">{locale === 'en' ? 'हिंदी' : 'English'}</span>
                </button>
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg">
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