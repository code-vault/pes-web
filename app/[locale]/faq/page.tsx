"use client";
import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ScrollReveal';

type Props = {
  params: Promise<{locale: string}>;
};

export default function FAQPage({params}: Props) {
  const t = useTranslations('faqPage');
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // FAQ Data from translations
  const faqData = Array.from({ length: 8 }, (_, i) => ({
    question: t(`questions.${i}.question`),
    answer: t(`questions.${i}.answer`)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 pt-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header with ScrollReveal */}
        <div className="mb-12">
          <ScrollReveal direction="up" delay={100}>
            <Link href="/">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('backToHome')}
              </Button>
            </Link>
          </ScrollReveal>
          
          <div className="text-center">
            <ScrollReveal direction="up" delay={300}>
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
                <HelpCircle className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-sm font-semibold text-orange-600">
                  {t('badge')}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={500}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                {t('title')}
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={700}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('subtitle')}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* FAQ Items with ScrollReveal */}
        <div className="space-y-4 mb-12">
          {faqData.map((item, index) => (
            <ScrollReveal 
              key={index}
              direction="up" 
              delay={900 + (index * 100)}
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-200"
                  aria-expanded={openItems.includes(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openItems.includes(index) ? (
                        <ChevronUp className="h-6 w-6 text-orange-500 transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-400 transition-transform duration-200" />
                      )}
                    </div>
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.includes(index) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-200/50 pt-4">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Contact Section with ScrollReveal */}
        <ScrollReveal direction="up" delay={1500}>
          <div className="text-center">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{t('contact.title')}</h3>
              <p className="text-orange-100 mb-6 text-lg">
                {t('contact.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.href = 'tel:+919876543210'}
                  className="bg-white text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {t('contact.callExpert')}
                </Button>
                <Button 
                  onClick={() => window.location.href = 'mailto:info@purvodayaenergy.com?subject=Solar Installation Inquiry'}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 transition-all duration-300"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {t('contact.emailUs')}
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}