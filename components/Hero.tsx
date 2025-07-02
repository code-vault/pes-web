"use client";
import { ArrowRight, Zap, Shield, DollarSign, Play, X, MapPin, Building, Star, TrendingUp, Clock, Award, Sun, Leaf, Home, Calculator, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

// Interactive calculator hook
const useInteractiveCalculator = () => {
  const [billAmount, setBillAmount] = useState(15000);
  const [systemSize, setSystemSize] = useState(10);
  
  const calculateSavings = () => {
    const monthlyReduction = billAmount * 0.75;
    const newBill = billAmount - monthlyReduction;
    const annualSavings = monthlyReduction * 12;
    const totalSavings = annualSavings * 25;
    
    return {
      currentBill: billAmount,
      newBill: Math.round(newBill),
      monthlySavings: Math.round(monthlyReduction),
      annualSavings: Math.round(annualSavings),
      totalSavings: Math.round(totalSavings)
    };
  };

  return {
    billAmount,
    setBillAmount,
    systemSize,
    setSystemSize,
    calculations: calculateSavings()
  };
};

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
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutCubic * end));
        
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const calculator = useInteractiveCalculator();
  const { ref: statsRef, isIntersecting: statsVisible } = useIntersectionObserver(0.3);
  
  // Animated counters
  const customersCount = useCountUp(2500, 2000, 0);
  const yearsWarranty = useCountUp(25, 1500, 500);
  const savingsPercent = useCountUp(90, 1800, 1000);

  useEffect(() => {
    if (statsVisible) {
      customersCount.start();
      yearsWarranty.start();
      savingsPercent.start();
    }
  }, [statsVisible]);

  const openDemoModal = () => {
    setShowDemoModal(true);
  };

  const closeDemoModal = () => {
    setShowDemoModal(false);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <>
      {/* Full-Screen Hero with Background Video/Image */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24"
      >
        {/* Background Image - Residential Rooftop Solar */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {/* Hero Image - Actual Residential Home with Rooftop Solar */}
            <img 
              src="/images/rooftop-solar.jpeg"
              alt="Modern residential home with solar panels installed on the rooftop"
              className="w-full h-full object-cover"
            />
            
            {/* Adaptive overlay for rooftop installation */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
            
            {/* Rooftop installation indicator */}
            <div className="absolute top-6 right-6 z-10">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 border border-white/30 shadow-lg">
                <Home className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-bold tracking-wide">ROOFTOP SOLAR SPECIALISTS</span>
              </div>
            </div>
            
            {/* Home energy savings highlight */}
            <div className="absolute bottom-6 left-6 z-10">
              <div className="bg-gradient-to-r from-blue-500/90 to-indigo-600/90 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-xl">
                <div className="text-white text-lg font-black">Your Home. Your Power.</div>
                <div className="text-blue-100 text-sm">Residential Solar Solutions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center text-white">
            
            {/* Main Hero Content */}
            <ScrollReveal direction="up" delay={0} duration={800}>
              <div className="max-w-4xl mx-auto mb-12">
                
                {/* Trust Badge - Rooftop specialists */}
                <div className="inline-flex items-center bg-white/20 backdrop-blur-md border border-white/40 rounded-full px-6 py-3 mb-6 sm:mb-8 shadow-2xl">
                  <div className="flex items-center mr-3">
                    <Home className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-sm font-bold text-white">Rooftop Solar Experts</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Main Headline - Rooftop focused */}
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight mb-4 sm:mb-6 drop-shadow-2xl">
                  <span className="block mb-1 sm:mb-2 text-white">Power Your Rooftop</span>
                  <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                    Save ₹3+ Lakhs
                  </span>
                  <span className="block text-2xl sm:text-3xl lg:text-5xl font-bold text-white drop-shadow-xl mt-1 sm:mt-2">
                    Every Year with Solar
                  </span>
                </h1>

                {/* Subtitle - Residential focused */}
                <p className="text-lg sm:text-xl lg:text-2xl text-white mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 drop-shadow-lg font-medium">
                  Transform your home's rooftop into a power-generating asset. Join 2,500+ homeowners across Eastern UP who've eliminated their electricity bills with our residential solar installations.
                </p>

                {/* CTA Buttons - Clean and professional */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
                  <Button 
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white text-base sm:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 min-w-[220px] border-2 border-orange-400/50"
                  >
                    <Phone className="mr-2 h-5 sm:h-6 w-5 sm:w-6" />
                    Get Free Quote
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      const calculatorSection = document.querySelector('section:nth-of-type(2)');
                      if (calculatorSection) {
                        calculatorSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    size="lg"
                    className="w-full sm:w-auto bg-white/20 backdrop-blur-md border-2 border-white/70 text-white hover:bg-white/30 hover:border-white/90 text-base sm:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300 hover:scale-105 min-w-[220px] shadow-2xl"
                  >
                    <Calculator className="mr-2 h-5 sm:h-6 w-5 sm:w-6" />
                    Calculate Savings
                  </Button>
                </div>

                {/* Live Stats Counter - Clean professional stats */}
                <div 
                  ref={statsRef}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0"
                >
                  <div className="bg-white/15 backdrop-blur-md border border-white/40 rounded-2xl p-4 sm:p-6 text-center shadow-2xl">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-green-400 mb-1 sm:mb-2 drop-shadow-lg">
                      {formatNumber(customersCount.count)}+
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white drop-shadow-md">Happy Customers</div>
                    <div className="text-sm text-gray-200 mt-1">Across Eastern UP</div>
                  </div>
                  
                  <div className="bg-white/15 backdrop-blur-md border border-white/40 rounded-2xl p-4 sm:p-6 text-center shadow-2xl">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-400 mb-1 sm:mb-2 drop-shadow-lg">
                      {yearsWarranty.count} Years
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white drop-shadow-md">Warranty</div>
                    <div className="text-sm text-gray-200 mt-1">Complete Coverage</div>
                  </div>
                  
                  <div className="bg-white/15 backdrop-blur-md border border-white/40 rounded-2xl p-4 sm:p-6 text-center shadow-2xl">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-orange-400 mb-1 sm:mb-2 drop-shadow-lg">
                      {savingsPercent.count}%
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white drop-shadow-md">Bill Reduction</div>
                    <div className="text-sm text-gray-200 mt-1">Average Savings</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-white/80" />
          </div>
        </div>
      </section>

      {/* Calculator Section - Separate from Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={200} duration={600}>
            
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                Calculate Your Solar Savings
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See exactly how much you can save with solar panels customized for your home
              </p>
            </div>

            {/* Calculator Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              
              {/* Calculator Inputs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* Bill Amount Input */}
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-4">
                    Current Monthly Electricity Bill
                  </label>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="5000"
                      max="50000"
                      step="1000"
                      value={calculator.billAmount}
                      onChange={(e) => calculator.setBillAmount(Number(e.target.value))}
                      className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>₹5,000</span>
                      <div className="text-center">
                        <div className="text-2xl font-black text-orange-600">
                          ₹{formatNumber(calculator.billAmount)}
                        </div>
                        <div className="text-xs">Current Bill</div>
                      </div>
                      <span>₹50,000</span>
                    </div>
                  </div>
                </div>

                {/* System Size Selection */}
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-4">
                    Recommended System Size
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { size: 5, label: '5kW', desc: 'Small Home' },
                      { size: 8, label: '8kW', desc: 'Medium Home' },
                      { size: 10, label: '10kW', desc: 'Large Home' },
                      { size: 15, label: '15kW', desc: 'Villa/Office' }
                    ].map((option) => (
                      <button
                        key={option.size}
                        onClick={() => calculator.setSystemSize(option.size)}
                        className={`p-4 rounded-xl font-bold text-center transition-all duration-300 ${
                          calculator.systemSize === option.size
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                        }`}
                      >
                        <div className="text-lg">{option.label}</div>
                        <div className="text-xs opacity-80">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Display */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                <h3 className="text-2xl font-black text-gray-800 mb-6 text-center">
                  Your Solar Savings Breakdown
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center shadow-md">
                    <div className="text-sm text-gray-600 mb-1">New Monthly Bill</div>
                    <div className="text-2xl font-black text-green-600">
                      ₹{formatNumber(calculator.calculations.newBill)}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 text-center shadow-md">
                    <div className="text-sm text-gray-600 mb-1">Monthly Savings</div>
                    <div className="text-2xl font-black text-orange-600">
                      ₹{formatNumber(calculator.calculations.monthlySavings)}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 text-center shadow-md">
                    <div className="text-sm text-gray-600 mb-1">Annual Savings</div>
                    <div className="text-2xl font-black text-blue-600">
                      ₹{formatNumber(calculator.calculations.annualSavings)}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 text-center shadow-md">
                    <div className="text-sm text-gray-600 mb-1">25-Year Total</div>
                    <div className="text-2xl font-black text-purple-600">
                      ₹{formatNumber(calculator.calculations.totalSavings)}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-8">
                  <Button 
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Get Your {calculator.systemSize}kW System Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-black text-gray-900">Our Solar Story</h3>
              <button
                onClick={closeDemoModal}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Video Content */}
            <div className="p-6">
              <div className="aspect-video bg-gradient-to-br from-blue-900 to-gray-900 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="bg-white/20 backdrop-blur-md p-6 rounded-full mx-auto mb-4 w-fit">
                    <Play className="h-16 w-16" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Customer Success Stories</h4>
                  <p className="text-lg opacity-90">See how families across Eastern UP are saving thousands</p>
                </div>
              </div>

              {/* Modal CTA */}
              <div className="text-center">
                <Button 
                  onClick={() => {
                    closeDemoModal();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Solar Journey Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #dc2626);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #dc2626);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
};

export default Hero;