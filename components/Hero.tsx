"use client";
import { ArrowRight, Zap, Shield, DollarSign, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

// Number animation hook (keeping this for calculator)
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
  
  // Only keep intersection observer for calculator number animations
  const { ref: calculatorRef, isIntersecting: calculatorVisible } = useIntersectionObserver(0.3);
  
  // Number animations for calculator
  const currentBill = useCountUp(15000, 1500, 200);
  const withSolar = useCountUp(3750, 1500, 400);
  const monthlySavings = useCountUp(11250, 1500, 600);
  const annualSavings = useCountUp(135000, 2000, 800);
  const yearSavings = useCountUp(3375000, 2500, 1000);

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

  return (
    <section id="home" className="pt-28 pb-16 bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/15 to-yellow-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content with ScrollReveal */}
          <div className="space-y-6">
            <div className="space-y-5">
              <ScrollReveal direction="up" delay={100}>
                <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg">
                  <Zap className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-sm font-semibold text-gray-700">{t('badge')}</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={300}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                  {t('title')}
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={500}>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light max-w-xl">
                  {t('subtitle')}
                </p>
              </ScrollReveal>
            </div>

            {/* Key Benefits with ScrollReveal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {benefitCards.map((item, index) => (
                <ScrollReveal 
                  key={index}
                  direction="scale" 
                  delay={700 + (index * 200)}
                >
                  <div className="group bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className={`bg-gradient-to-br ${item.gradient} p-2 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="font-bold text-xl text-gray-900 mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600 font-medium">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA Buttons with ScrollReveal */}
            <ScrollReveal direction="up" delay={1300}>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-6 py-3 text-base font-semibold rounded-xl">
                  {t('getQuoteBtn')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={openDemoModal}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-white hover:shadow-lg bg-white/60 backdrop-blur-sm transition-all duration-300 px-6 py-3 text-base font-semibold rounded-xl"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {t('watchDemo')}
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Hero Calculator with ScrollReveal */}
          <ScrollReveal direction="right" delay={600}>
            <div 
              ref={calculatorRef}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
                <div className="space-y-5">
                  <ScrollReveal direction="up" delay={900}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{t('calculator.title')}</h3>
                      <div className="bg-gradient-to-r from-orange-400 to-amber-400 p-2 rounded-lg">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </ScrollReveal>
                  
                  <div className="space-y-4">
                    <ScrollReveal direction="up" delay={1100}>
                      <div className="bg-gray-50/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">{t('calculator.currentBill')}</span>
                          <span className="font-bold text-lg text-gray-900">
                            ₹{formatNumber(currentBill.count)}
                          </span>
                        </div>
                      </div>
                    </ScrollReveal>
                    
                    <ScrollReveal direction="up" delay={1300}>
                      <div className="bg-green-50/80 backdrop-blur-sm p-4 rounded-xl border border-green-200/50">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">{t('calculator.withSolar')}</span>
                          <span className="font-bold text-lg text-green-600">
                            ₹{formatNumber(withSolar.count)}
                          </span>
                        </div>
                      </div>
                    </ScrollReveal>
                    
                    <ScrollReveal direction="scale" delay={1500}>
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-5 rounded-xl text-white">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">{t('calculator.monthlySavings')}</span>
                          <span className="font-bold text-xl">
                            ₹{formatNumber(monthlySavings.count)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{t('calculator.annualSavings')}</span>
                          <span className="font-bold text-xl">
                            ₹{formatNumber(annualSavings.count)}
                          </span>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                  
                  <ScrollReveal direction="up" delay={1700}>
                    <div className="pt-3">
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200/50">
                        <p className="text-sm text-gray-600 text-center">
                          <span className="font-semibold text-gray-900">{t('calculator.yearSavings')}</span> 
                          <span className="font-bold text-lg text-blue-600 ml-2">
                            ₹{formatNumber(yearSavings.count)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[70vh] overflow-y-auto animate-in slide-in-from-bottom duration-500">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">{t('demoModal.title')}</h3>
              <button
                onClick={closeDemoModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={t('demoModal.closeButton')}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5">
              <div className="text-center space-y-4">
                {/* Placeholder Video Area */}
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg border-2 border-dashed border-orange-300 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-12 w-12 text-orange-500 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">{t('demoModal.comingSoon')}</h4>
                    <p className="text-gray-500 text-sm">
                      {t('demoModal.description')}
                    </p>
                  </div>
                </div>

                {/* Demo Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Zap className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-800 text-sm">{t('demoModal.features.0.title')}</h5>
                    <p className="text-xs text-gray-600">{t('demoModal.features.0.description')}</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-800 text-sm">{t('demoModal.features.1.title')}</h5>
                    <p className="text-xs text-gray-600">{t('demoModal.features.1.description')}</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <DollarSign className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-800 text-sm">{t('demoModal.features.2.title')}</h5>
                    <p className="text-xs text-gray-600">{t('demoModal.features.2.description')}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-gray-600 mb-3 text-sm">{t('demoModal.cta.question')}</p>
                  <Button 
                    onClick={closeDemoModal}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-5 py-2 rounded-lg font-semibold"
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