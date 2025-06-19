import { ArrowRight, Zap, Shield, DollarSign, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section id="home" className="pt-24 pb-20 bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content - More Spacious */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg">
                <Zap className="h-5 w-5 text-orange-500 mr-3" />
                <span className="text-base font-semibold text-gray-700">{t('badge')}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                {t('title')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-2xl">
                {t('subtitle')}
              </p>
            </div>

            {/* Key Benefits - Modern Cards with More Space */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <p className="font-bold text-2xl text-gray-900 mb-2">{t('save')}</p>
                <p className="text-base text-gray-600 font-medium">{t('saveBills')}</p>
              </div>
              <div className="group bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-blue-400 to-cyan-500 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <p className="font-bold text-3xl text-gray-900 mb-2">{t('warranty')}</p>
                <p className="text-base text-gray-600 font-medium">{t('warrantyText')}</p>
              </div>
              <div className="group bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <p className="font-bold text-3xl text-gray-900 mb-2">{t('clean')}</p>
                <p className="text-base text-gray-600 font-medium">{t('cleanEnergy')}</p>
              </div>
            </div>

            {/* CTA Buttons - Enhanced with More Space */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl">
                {t('getQuoteBtn')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-white hover:shadow-xl bg-white/60 backdrop-blur-sm transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-xl">
                <Play className="mr-2 h-5 w-5" />
                {t('watchDemo')}
              </Button>
            </div>
          </div>

          {/* Hero Visual - Modern Calculator with More Space */}
          <div className="relative">
            <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-[2rem] p-10 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500">
              <div className="space-y-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold text-gray-900">{t('calculator.title')}</h3>
                  <div className="bg-gradient-to-r from-orange-400 to-amber-400 p-4 rounded-2xl">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium text-lg">{t('calculator.currentBill')}</span>
                      <span className="font-bold text-2xl text-gray-900">₹15,000</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50/80 backdrop-blur-sm p-6 rounded-2xl border border-green-200/50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium text-lg">{t('calculator.withSolar')}</span>
                      <span className="font-bold text-2xl text-green-600">₹3,750</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 rounded-2xl text-white">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium text-lg">{t('calculator.monthlySavings')}</span>
                      <span className="font-bold text-3xl">₹11,250</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-lg">{t('calculator.annualSavings')}</span>
                      <span className="font-bold text-3xl">₹1,35,000</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200/50">
                    <p className="text-base text-gray-600 text-center">
                      <span className="font-semibold text-gray-900 text-lg">{t('calculator.yearSavings')}</span> 
                      <span className="font-bold text-2xl text-blue-600 ml-2">₹33,75,000</span>
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