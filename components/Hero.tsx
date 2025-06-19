import { ArrowRight, Zap, Shield, DollarSign, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section id="home" className="pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg">
                <Zap className="h-4 w-4 text-orange-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">{t('badge')}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                {t('title')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                {t('subtitle')}
              </p>
            </div>

            {/* Key Benefits - Modern Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-xl w-fit mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <p className="font-bold text-2xl text-gray-900">{t('save')}</p>
                <p className="text-sm text-gray-600 font-medium">{t('saveBills')}</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-br from-blue-400 to-cyan-500 p-3 rounded-xl w-fit mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <p className="font-bold text-2xl text-gray-900">{t('warranty')}</p>
                <p className="text-sm text-gray-600 font-medium">{t('warrantyText')}</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-xl w-fit mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <p className="font-bold text-2xl text-gray-900">{t('clean')}</p>
                <p className="text-sm text-gray-600 font-medium">{t('cleanEnergy')}</p>
              </div>
            </div>

            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg">
                {t('getQuoteBtn')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-white hover:shadow-xl bg-white/60 backdrop-blur-sm transition-all duration-300 px-8 py-4 text-lg">
                <Play className="mr-2 h-5 w-5" />
                {t('watchDemo')}
              </Button>
            </div>
          </div>

          {/* Hero Visual - Modern Calculator */}
          <div className="relative">
            <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{t('calculator.title')}</h3>
                  <div className="bg-gradient-to-r from-orange-400 to-amber-400 p-3 rounded-xl">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">{t('calculator.currentBill')}</span>
                      <span className="font-bold text-xl text-gray-900">₹15,000</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50/80 backdrop-blur-sm p-4 rounded-xl border border-green-200/50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">{t('calculator.withSolar')}</span>
                      <span className="font-bold text-xl text-green-600">₹3,750</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 rounded-xl text-white">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{t('calculator.monthlySavings')}</span>
                      <span className="font-bold text-2xl">₹11,250</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t('calculator.annualSavings')}</span>
                      <span className="font-bold text-2xl">₹1,35,000</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200/50">
                    <p className="text-sm text-gray-600 text-center">
                      <span className="font-semibold text-gray-900">{t('calculator.yearSavings')}</span> ₹33,75,000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;