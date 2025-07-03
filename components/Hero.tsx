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

// Hero Background Video-like Slideshow Component
const HeroBackgroundSlideshow = () => {
  // Array of hero images with different solar installations
  const heroImages = [
    {
      src: "/images/rooftop-solar-1.jpg",
      alt: "Modern residential home with solar panels on rooftop",
      title: "Residential Solar Excellence",
      effect: "slow-zoom-in"
    },
    {
      src: "/images/rooftop-solar-2.jpg",
      alt: "Large commercial solar installation", 
      title: "Commercial Solar Solutions",
      effect: "pan-left"
    },
    {
      src: "/images/rooftop-solar-3.jpg",
      alt: "Solar panels on industrial facility",
      title: "Industrial Scale Projects", 
      effect: "pan-right"
    },
    {
      src: "/images/rooftop-solar-4.jpg",
      alt: "Solar installation team at work",
      title: "Professional Installation",
      effect: "slow-zoom-out"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize after component mounts
    setIsInitialized(true);
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 8000); // Change image every 8 seconds for longer continuous motion

    return () => clearInterval(interval);
  }, []);

  const getVideoLikeStyle = (index: number, effect: string) => {
    if (!isInitialized || !heroImages[index]) {
      return "absolute inset-0 w-full h-full object-cover opacity-0";
    }
    
    const isActive = index === currentImageIndex;
    const isNext = index === (currentImageIndex + 1) % heroImages.length;
    
    let baseStyle = "absolute inset-0 w-full h-full object-cover";
    
    if (isActive) {
      switch (effect) {
        case "slow-zoom-in":
          return `${baseStyle} opacity-100 animate-[slowZoomIn_10s_ease-in-out_infinite]`;
        case "slow-zoom-out":
          return `${baseStyle} opacity-100 animate-[slowZoomOut_10s_ease-in-out_infinite]`;
        case "pan-left":
          return `${baseStyle} opacity-100 animate-[panLeft_12s_linear_infinite]`;
        case "pan-right":
          return `${baseStyle} opacity-100 animate-[panRight_12s_linear_infinite]`;
        default:
          return `${baseStyle} opacity-100 animate-[slowZoomIn_10s_ease-in-out_infinite]`;
      }
    } else if (isNext) {
      // Smooth fade in for next image
      return `${baseStyle} opacity-0 scale-100 animate-[smoothFadeIn_2s_ease-in-out_6s_forwards]`;
    } else {
      return `${baseStyle} opacity-0 scale-100`;
    }
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Background Images with Video-like Motion */}
      {heroImages.map((image, index) => (
        <div key={index} className="absolute inset-0">
          <img
            src={image.src}
            alt={image.alt}
            className={getVideoLikeStyle(index, image.effect)}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
      
      {/* Enhanced overlay gradients for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 z-10"></div>
      
      {/* Additional text protection overlay */}
      <div className="absolute inset-0 bg-black/20 z-15"></div>
      
      {/* Animated particles overlay - More dynamic */}
      <div className="absolute inset-0 z-20 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-[floatParticle1_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full animate-[floatParticle2_4s_ease-in-out_infinite_1s]"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2.5 h-2.5 bg-amber-400 rounded-full animate-[floatParticle3_5s_ease-in-out_infinite_2s]"></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-[floatParticle4_3s_ease-in-out_infinite_3s]"></div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-orange-300 rounded-full animate-[floatParticle5_7s_ease-in-out_infinite_1.5s]"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1.5 h-1.5 bg-amber-300 rounded-full animate-[floatParticle6_4.5s_ease-in-out_infinite_2.5s]"></div>
      </div>
      
      {/* Dynamic content overlay based on current image */}
      <div className="absolute top-6 right-6 z-30">
        {isInitialized && heroImages[currentImageIndex] && (
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 border border-white/30 shadow-lg transition-all duration-1000 animate-[slideInBounce_2s_ease-out]">
            <Home className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-bold tracking-wide">
              {heroImages[currentImageIndex]?.title?.toUpperCase() || 'SOLAR SOLUTIONS'}
            </span>
          </div>
        )}
      </div>
      
      {/* Progress bar instead of dots for video-like feel */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 w-32 h-1 bg-white/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-[8000ms] ease-linear"
          style={{
            width: `${((currentImageIndex + 1) / heroImages.length) * 100}%`,
            animation: 'progressBar 8s linear infinite'
          }}
        />
      </div>

      {/* CSS Animations for Smooth Video-like Effects */}
      <style jsx>{`
        /* Smooth, slow zoom in - no jitter */
        @keyframes slowZoomIn {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.08); }
        }
        
        /* Smooth, slow zoom out - no jitter */
        @keyframes slowZoomOut {
          0% { transform: scale(1.08); }
          100% { transform: scale(1.0); }
        }
        
        /* Smooth pan left - very subtle */
        @keyframes panLeft {
          0% { transform: scale(1.05) translateX(2%); }
          100% { transform: scale(1.05) translateX(-2%); }
        }
        
        /* Smooth pan right - very subtle */
        @keyframes panRight {
          0% { transform: scale(1.05) translateX(-2%); }
          100% { transform: scale(1.05) translateX(2%); }
        }
        
        /* Smooth fade in transition */
        @keyframes smoothFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        /* Reduced motion floating particles - much smoother */
        @keyframes floatParticle1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-8px) translateX(4px); opacity: 1; }
        }
        
        @keyframes floatParticle2 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.5; }
          50% { transform: translateY(-6px) translateX(-3px) scale(1.1); opacity: 0.9; }
        }
        
        @keyframes floatParticle3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
          33% { transform: translateY(-5px) translateX(3px); opacity: 1; }
          66% { transform: translateY(-3px) translateX(-2px); opacity: 0.8; }
        }
        
        @keyframes floatParticle4 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-7px) translateX(-4px) scale(1.05); opacity: 1; }
        }
        
        @keyframes floatParticle5 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          40% { transform: translateY(-6px) translateX(3px); opacity: 0.9; }
          80% { transform: translateY(-4px) translateX(-3px); opacity: 0.7; }
        }
        
        @keyframes floatParticle6 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-5px) translateX(2px) scale(1.03); opacity: 0.8; }
        }
        
        /* Smooth content badge animation */
        @keyframes slideInBounce {
          0% { transform: translateX(50px); opacity: 0; }
          70% { transform: translateX(-5px); opacity: 0.9; }
          100% { transform: translateX(0px); opacity: 1; }
        }
        
        /* Smooth progress bar */
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        /* Ensure smooth hardware acceleration */
        .animate-slowZoomIn,
        .animate-slowZoomOut,
        .animate-panLeft,
        .animate-panRight {
          will-change: transform;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
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
      {/* Full-Screen Hero with Animated Background Slideshow */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 md:pt-32"
      >
        {/* Animated Background Slideshow */}
        <HeroBackgroundSlideshow />

        {/* Hero Content Overlay */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center text-white">
            
            {/* Main Hero Content */}
            <ScrollReveal direction="up" delay={0} duration={800}>
              <div className="max-w-4xl mx-auto mb-12">
                
                {/* Trust Badge - Enhanced contrast */}
                <div className="inline-flex items-center bg-black/50 backdrop-blur-md border border-white/60 rounded-full px-6 py-3 mb-6 sm:mb-8 shadow-2xl">
                  <div className="flex items-center mr-3">
                    <Home className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-sm font-bold text-white drop-shadow-lg">Rooftop Solar Experts</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                    ))}
                  </div>
                </div>

                {/* Main Headline - Enhanced text shadows */}
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight mb-4 sm:mb-6">
                  <span className="block mb-1 sm:mb-2 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-shadow-lg">Power Your Rooftop</span>
                  <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,1)] filter drop-shadow-2xl">
                    Save ₹3+ Lakhs
                  </span>
                  <span className="block text-2xl sm:text-3xl lg:text-5xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mt-1 sm:mt-2">
                    Every Year with Solar
                  </span>
                </h1>

                {/* Subtitle - Enhanced readability */}
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/20">
                  <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                    Transform your home's rooftop into a power-generating asset. Join 2,500+ homeowners across Eastern UP who've eliminated their electricity bills with our residential solar installations.
                  </p>
                </div>

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

                {/* Live Stats Counter - Enhanced contrast */}
                <div 
                  ref={statsRef}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0"
                >
                  <div className="bg-black/40 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-6 text-center shadow-2xl">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-green-400 mb-1 sm:mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {formatNumber(customersCount.count)}+
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white drop-shadow-md">Happy Customers</div>
                    <div className="text-sm text-gray-200 mt-1 drop-shadow-sm">Across Eastern UP</div>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-6 text-center shadow-2xl">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-400 mb-1 sm:mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {yearsWarranty.count} Years
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white drop-shadow-md">Warranty</div>
                    <div className="text-sm text-gray-200 mt-1 drop-shadow-sm">Complete Coverage</div>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-6 text-center shadow-2xl">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-orange-400 mb-1 sm:mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {savingsPercent.count}%
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white drop-shadow-md">Bill Reduction</div>
                    <div className="text-sm text-gray-200 mt-1 drop-shadow-sm">Average Savings</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
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