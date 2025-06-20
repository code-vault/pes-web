"use client"; 
import Link from 'next/link';
import { Sun, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ScrollReveal';

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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info with ScrollReveal */}
          <ScrollReveal direction="up" delay={100}>
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
                <ScrollReveal direction="scale" delay={300}>
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                    <Facebook className="h-6 w-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="scale" delay={400}>
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                    <Twitter className="h-6 w-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="scale" delay={500}>
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                    <Linkedin className="h-6 w-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="scale" delay={600}>
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                    <Instagram className="h-6 w-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>

          {/* Services with ScrollReveal */}
          <ScrollReveal direction="up" delay={200}>
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">{t('services.title')}</h3>
              <ul className="space-y-3 text-gray-300">
                <ScrollReveal direction="right" delay={400}>
                  <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('services.residential')}</Link></li>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={500}>
                  <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('services.commercial')}</Link></li>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={600}>
                  <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('services.industrial')}</Link></li>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={700}>
                  <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('services.audits')}</Link></li>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={800}>
                  <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('services.maintenance')}</Link></li>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={900}>
                  <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('services.storage')}</Link></li>
                </ScrollReveal>
              </ul>
            </div>
          </ScrollReveal>

          {/* Quick Links with ScrollReveal */}
          <ScrollReveal direction="up" delay={300}>
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">{t('quickLinks.title')}</h3>
              <ul className="space-y-3 text-gray-300">
                <ScrollReveal direction="right" delay={500}>
                  <li><Link href="#about" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.about')}</Link></li>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={600}>
                  <li><Link href="#services" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.services')}</Link></li>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={700}>
                  <li><Link href="#gallery" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.gallery')}</Link></li>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={800}>
                  <li><Link href="#testimonials" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.testimonials')}</Link></li>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={900}>
                  <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.financing')}</Link></li>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={1000}>
                  <li><Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.warranties')}</Link></li>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={1100}>
                  <li><Link href="#contact" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('quickLinks.contact')}</Link></li>
                </ScrollReveal>
              </ul>
            </div>
          </ScrollReveal>

          {/* Contact Info with ScrollReveal */}
          <ScrollReveal direction="up" delay={400}>
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">{t('getInTouch.title')}</h3>
              <div className="space-y-4 text-gray-300">
                <ScrollReveal direction="left" delay={600}>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">+91 98765 43210</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="left" delay={700}>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-blue-400 to-cyan-500 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">info@purvodayaenergy.com</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="left" delay={800}>
                  <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-br from-purple-400 to-violet-500 p-2 rounded-lg mt-1">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium leading-relaxed">1234 Solar Avenue<br />Green City, Delhi 110001</span>
                  </div>
                </ScrollReveal>
              </div>
              <ScrollReveal direction="scale" delay={1000}>
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
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>

        {/* Footer Bottom with ScrollReveal */}
        <ScrollReveal direction="up" delay={1200}>
          <div className="border-t border-gray-700/50 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 font-medium">
                {t('copyright')}
              </div>
              <div className="flex space-x-8 text-gray-400 mt-4 md:mt-0">
                <ScrollReveal direction="left" delay={1400}>
                  <Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('legal.privacy')}</Link>
                </ScrollReveal>
                <ScrollReveal direction="left" delay={1500}>
                  <Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('legal.terms')}</Link>
                </ScrollReveal>
                <ScrollReveal direction="left" delay={1600}>
                  <Link href="#" className="hover:text-orange-400 transition-colors duration-300 font-medium">{t('legal.cookies')}</Link>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;