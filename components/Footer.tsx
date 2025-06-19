"use client"; 
import Link from 'next/link';
import { Sun, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  const tHeader = useTranslations('header');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-2 rounded-xl shadow-lg">
                <Sun className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold">{tHeader('companyName')}</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <Facebook className="h-6 w-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <Twitter className="h-6 w-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <Linkedin className="h-6 w-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <Instagram className="h-6 w-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">{t('services.title')}</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('services.residential')}</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('services.commercial')}</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('services.industrial')}</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('services.audits')}</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('services.maintenance')}</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('services.storage')}</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">{t('quickLinks.title')}</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="#about" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.about')}</Link></li>
              <li><Link href="#services" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.services')}</Link></li>
              <li><Link href="#testimonials" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.testimonials')}</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.financing')}</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.warranties')}</Link></li>
              <li><Link href="#contact" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">{t('getInTouch.title')}</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium">(555) 765-2766</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-400 to-cyan-500 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium">info@solartechpro.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-br from-purple-400 to-violet-500 p-2 rounded-lg mt-1">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium leading-relaxed">1234 Solar Avenue<br />Green City, CA 90210</span>
              </div>
            </div>
            <div className="mt-6 p-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-xl">
              <p className="text-white font-bold text-lg mb-2">{t('getInTouch.quote.title')}</p>
              <p className="text-orange-100 mb-4">{t('getInTouch.quote.description')}</p>
              <Button 
                onClick={scrollToTop}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 transition-all duration-300"
              >
                <ArrowUp className="mr-2 h-4 w-4" />
                {t('getInTouch.quote.button')}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 font-medium">
              {t('copyright')}
            </div>
            <div className="flex space-x-8 text-gray-400 mt-4 md:mt-0">
              <Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('legal.privacy')}</Link>
              <Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('legal.terms')}</Link>
              <Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('legal.cookies')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;