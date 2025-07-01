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
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          {!isVideoPlaying ? (
            // Hero Image
            <div className="relative w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1920&h=1080&fit=crop&auto=format&q=80"
                alt="Beautiful modern home with solar panels on the roof"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ) : (
            // Video placeholder (would be actual video in production)
            <div className="relative w-full h-full bg-gradient-to-br from-blue-900 to-gray-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
                  <p className="text-xl">Loading Video...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center text-white">
            
            {/* Main Hero Content */}
            <ScrollReveal direction="up" delay={0} duration={800}>
              <div className="max-w-4xl mx-auto mb-12">
                
                {/* Trust Badge */}
                {/* <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-sm font-semibold">India's #1 Rated Solar Company</span>
                  <div className="flex ml-3 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div> */}

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
                  <span className="block mb-2">Power Your Home</span>
                  <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Save ₹3+ Lakhs
                  </span>
                  <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-200 mt-2">
                    Every Year with Solar
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Join 2,500+ homeowners across Eastern UP who've slashed their electricity bills by 90% with our premium solar installations.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Button 
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white text-lg font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 min-w-[200px]"
                  >
                    <Phone className="mr-2 h-6 w-6" />
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
                    className="bg-white/20 backdrop-blur-md border-2 border-white/60 text-white hover:bg-white/30 hover:border-white/80 text-lg font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 min-w-[200px] shadow-lg"
                  >
                    <Calculator className="mr-2 h-6 w-6" />
                    Calculate Savings
                  </Button>
                </div>

                {/* Live Stats Counter */}
                <div 
                  ref={statsRef}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
                    <div className="text-4xl sm:text-5xl font-black text-green-400 mb-2">
                      {formatNumber(customersCount.count)}+
                    </div>
                    <div className="text-lg font-semibold text-gray-200">Happy Customers</div>
                    <div className="text-sm text-gray-400 mt-1">Across Eastern UP</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
                    <div className="text-4xl sm:text-5xl font-black text-blue-400 mb-2">
                      {yearsWarranty.count} Years
                    </div>
                    <div className="text-lg font-semibold text-gray-200">Warranty</div>
                    <div className="text-sm text-gray-400 mt-1">Complete Coverage</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
                    <div className="text-4xl sm:text-5xl font-black text-orange-400 mb-2">
                      {savingsPercent.count}%
                    </div>
                    <div className="text-lg font-semibold text-gray-200">Bill Reduction</div>
                    <div className="text-sm text-gray-400 mt-1">Average Savings</div>
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