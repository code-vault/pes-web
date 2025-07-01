"use client";
import { ArrowRight, Zap, Shield, DollarSign, Play, X, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

// Number animation hook (keeping for calculator)
const useCountUp = (end: number, duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const timer = setTimeout(() => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, delay, hasStarted]);

  return { count, start: () => setHasStarted(true) };
};

// Intersection Observer hook for calculator numbers
const useIntersectionObserver = (threshold: number = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isIntersecting };
};

const Hero = () => {
  const t = useTranslations('hero');
  const [showDemoModal, setShowDemoModal] = useState(false);
  
  // Only keep intersection observer for stats counter
  const { ref: calculatorRef, isIntersecting: calculatorVisible } = useIntersectionObserver(0.3);
  
  // Number animations for calculator
  const currentBill = useCountUp(15000, 1500, 50);
  const withSolar = useCountUp(3750, 1500, 100);
  const monthlySavings = useCountUp(11250, 1500, 150);
  const annualSavings = useCountUp(135000, 2000, 200);
  const yearSavings = useCountUp(3375000, 2500, 250);

  // Start animations when calculator becomes visible
  useEffect(() => {
    if (calculatorVisible) {
      currentBill.start();
      withSolar.start();
      monthlySavings.start();
      annualSavings.start();
      yearSavings.start();
    }
  }, [calculatorVisible]);

  const openDemoModal = () => {
    setShowDemoModal(true);
  };

  const closeDemoModal = () => {
    setShowDemoModal(false);
  };

  // Format numbers with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  // Benefit cards data
  const benefitCards = [
    { 
      icon: DollarSign, 
      title: t('save'), 
      desc: t('saveBills'), 
      gradient: "from-green-400 to-emerald-500"
    },
    { 
      icon: Shield, 
      title: t('warranty'), 
      desc: t('warrantyText'), 
      gradient: "from-blue-400 to-cyan-500"
    },
    { 
      icon: Zap, 
      title: t('clean'), 
      desc: t('cleanEnergy'), 
      gradient: "from-orange-400 to-red-500"
    }
  ];

  // Office locations for trust badge
  const offices = [
    { name: "Basti", isHQ: true },
    { name: "Gorakhpur", isHQ: false },
    { name: "Sant Kabir Nagar", isHQ: false }
  ];

  return (
    <section 
      id="home" 
      className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Animated background elements - Reduced opacity on mobile */}
      <div className="absolute inset-0 overflow-hidden opacity-30 sm:opacity-100">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-orange-400/15 to-yellow-400/15 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Hero Content - Mobile First Design */}
          <ScrollReveal direction="up" delay={0} duration={500}>
            <div className="space-y-4 sm:space-y-6 order-1">
              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                {/* <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg">
                  <Zap className="h-3 sm:h-4 w-3 sm:w-4 text-orange-500 mr-1.5 sm:mr-2" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">{t('badge')}</span>
                </div> */}
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                  {t('title')}
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-light max-w-xl">
                  {t('subtitle')}
                </p>

                {/* Multi-Office Trust Badge - Mobile Optimized */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Building className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">
                      Serving Eastern Uttar Pradesh
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-gray-600">
                    <MapPin className="h-3 sm:h-4 w-3 sm:w-4 text-gray-500 flex-shrink-0" />
                    <span className="mr-1">Offices in:</span>
                    {offices.map((office, index) => (
                      <span key={office.name} className="flex items-center">
                        <span className={office.isHQ ? "font-semibold text-orange-600" : ""}>
                          {office.name}
                        </span>
                        {office.isHQ && <span className="text-xs text-orange-500 ml-1">(HQ)</span>}
                        {index < offices.length - 1 && <span className="mx-1">•</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Benefits - Mobile Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {benefitCards.map((item, index) => (
                  <div key={index} className="group bg-white/60 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`bg-gradient-to-br ${item.gradient} p-1.5 sm:p-2 rounded-lg w-fit mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                    </div>
                    <p className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 mb-1">{item.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons - Mobile Stack */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button 
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-6 py-3 text-sm sm:text-base font-semibold rounded-xl w-full sm:w-auto"
                >
                  {t('getQuoteBtn')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={openDemoModal}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-white hover:shadow-lg bg-white/60 backdrop-blur-sm transition-all duration-300 px-6 py-3 text-sm sm:text-base font-semibold rounded-xl w-full sm:w-auto"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {t('watchDemo')}
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero Calculator - Mobile Optimized */}
          <ScrollReveal direction="right" delay={200} duration={500}>
            <div 
              ref={calculatorRef}
              className="relative order-2 lg:order-2"
            >
              <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t('calculator.title')}</h3>
                    <div className="bg-gradient-to-r from-orange-400 to-amber-400 p-2 rounded-lg">
                      <Zap className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-gray-50/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-200/50">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">{t('calculator.currentBill')}</span>
                        <span className="font-bold text-base sm:text-lg text-gray-900">
                          ₹{formatNumber(currentBill.count)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-green-50/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-green-200/50">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">{t('calculator.withSolar')}</span>
                        <span className="font-bold text-base sm:text-lg text-green-600">
                          ₹{formatNumber(withSolar.count)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 sm:p-5 rounded-xl text-white">
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <span className="font-medium text-sm sm:text-base">{t('calculator.monthlySavings')}</span>
                        <span className="font-bold text-lg sm:text-xl">
                          ₹{formatNumber(monthlySavings.count)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm sm:text-base">{t('calculator.annualSavings')}</span>
                        <span className="font-bold text-lg sm:text-xl">
                          ₹{formatNumber(annualSavings.count)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 sm:pt-3">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 sm:p-4 rounded-xl border border-blue-200/50">
                      <p className="text-xs sm:text-sm text-gray-600 text-center">
                        <span className="font-semibold text-gray-900">{t('calculator.yearSavings')}</span> 
                        <span className="font-bold text-base sm:text-lg text-blue-600 ml-2 block sm:inline">
                          ₹{formatNumber(yearSavings.count)}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Local Service Badge - Mobile Optimized */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-2.5 sm:p-3 rounded-xl border border-purple-200/50">
                    <p className="text-xs text-center text-purple-700 leading-relaxed">
                      <Building className="inline h-3 w-3 mr-1" />
                      Local service across Basti, Gorakhpur & Sant Kabir Nagar
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Demo Modal - Mobile Optimized */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-500">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t('demoModal.title')}</h3>
              <button
                onClick={closeDemoModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={t('demoModal.closeButton')}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-5">
              <div className="text-center space-y-4">
                {/* Placeholder Video Area */}
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg border-2 border-dashed border-orange-300 flex items-center justify-center">
                  <div className="text-center px-4">
                    <Play className="h-8 sm:h-12 w-8 sm:w-12 text-orange-500 mx-auto mb-2 sm:mb-3" />
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">{t('demoModal.comingSoon')}</h4>
                    <p className="text-gray-500 text-sm">
                      {t('demoModal.description')}
                    </p>
                  </div>
                </div>

                {/* Demo Features - Mobile Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Zap className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600 mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-800 text-sm">{t('demoModal.features.0.title')}</h5>
                    <p className="text-xs text-gray-600 mt-1">{t('demoModal.features.0.description')}</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Shield className="h-5 sm:h-6 w-5 sm:w-6 text-green-600 mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-800 text-sm">{t('demoModal.features.1.title')}</h5>
                    <p className="text-xs text-gray-600 mt-1">{t('demoModal.features.1.description')}</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <DollarSign className="h-5 sm:h-6 w-5 sm:w-6 text-orange-600 mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-800 text-sm">{t('demoModal.features.2.title')}</h5>
                    <p className="text-xs text-gray-600 mt-1">{t('demoModal.features.2.description')}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-gray-600 mb-3 text-sm">{t('demoModal.cta.question')}</p>
                  <Button 
                    onClick={closeDemoModal}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-5 py-2 rounded-lg font-semibold w-full sm:w-auto"
                  >
                    {t('demoModal.cta.button')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;