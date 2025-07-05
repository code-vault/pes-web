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

// Hero Background Solar Energy Visualization Component
const HeroBackgroundSlideshow = () => {
  // Solar story progression - each image tells part of the solar journey
  const solarStory = [
    {
      src: "/images/rooftop-solar-1.jpg",
      alt: "Sunrise over residential solar installation",
      title: "Dawn of Clean Energy",
      theme: "sunrise",
      energyLevel: 25
    },
    {
      src: "/images/rooftop-solar-2.jpg", 
      alt: "Peak sun commercial solar array",
      title: "Peak Power Generation",
      theme: "noon",
      energyLevel: 100
    },
    {
      src: "/images/rooftop-solar-3.jpg",
      alt: "Golden hour industrial solar farm",
      title: "Sustainable Future",
      theme: "golden",
      energyLevel: 75
    },
    {
      src: "/images/rooftop-solar-4.jpg",
      alt: "Evening solar installation with storage",
      title: "Energy Independence", 
      theme: "evening",
      energyLevel: 50
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [energyPulse, setEnergyPulse] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
    
    // Main story progression - Slower for smoother transitions
    const storyInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % solarStory.length);
    }, 12000); // 12 seconds per image

    // Energy pulse animation
    const pulseInterval = setInterval(() => {
      setEnergyPulse(prev => (prev + 1) % 100);
    }, 100);

    return () => {
      clearInterval(storyInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  const currentStory = solarStory[currentIndex];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Ultra-Smooth Layered Image System with Better Text Protection */}
      {solarStory.map((story, index) => {
        const isActive = index === currentIndex;
        
        return (
          <div 
            key={index}
            className="absolute inset-0"
          >
            {/* Base Image - Full brightness, natural colors */}
            <img
              src={story.src}
              alt={story.alt}
              className={`w-full h-full object-cover ${
                isActive ? 'opacity-100' : 'opacity-0'
              } ${isActive ? `animate-solar-${story.theme}` : ''}`}
              style={{
                transition: 'opacity 5000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
              loading={index === 0 ? "eager" : "lazy"}
            />
            
            {/* Subtle Theme Overlay - Very light */}
            <div className={`absolute inset-0 ${
              isActive ? 'opacity-100' : 'opacity-0'
            } ${
              story.theme === 'sunrise' ? 'bg-gradient-to-tr from-orange-500/8 via-transparent to-transparent' :
              story.theme === 'noon' ? 'bg-gradient-to-b from-yellow-400/5 via-transparent to-transparent' :
              story.theme === 'golden' ? 'bg-gradient-to-bl from-amber-400/10 via-transparent to-transparent' :
              'bg-gradient-to-tl from-blue-500/8 via-transparent to-transparent'
            }`}
            style={{
              transition: 'opacity 5000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }} />
          </div>
        );
      })}

      {/* Minimal overlay - only where text appears */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

      {/* Dynamic Energy Visualization */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Animated Solar Rays */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 bg-gradient-to-b from-yellow-300 via-orange-400 to-transparent"
              style={{
                height: `${20 + (currentStory.energyLevel / 5)}px`,
                transform: `rotate(${i * 45}deg)`,
                transformOrigin: 'bottom center',
                opacity: currentStory.energyLevel / 200,
                animation: `solarRay${i} ${3 + i * 0.5}s ease-in-out infinite`
              }}
            />
          ))}
        </div>

        {/* Energy Particles Flow */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                currentStory.theme === 'sunrise' ? 'bg-orange-400' :
                currentStory.theme === 'noon' ? 'bg-yellow-300' :
                currentStory.theme === 'golden' ? 'bg-amber-400' :
                'bg-blue-400'
              }`}
              style={{
                top: `${20 + (i * 7)}%`,
                left: `${10 + (i * 6)}%`,
                opacity: currentStory.energyLevel / 300,
                animation: `energyFlow${i % 4} ${4 + i * 0.3}s ease-in-out infinite`
              }}
            />
          ))}
        </div>

        {/* Circuit-like Energy Connections */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={
                currentStory.theme === 'sunrise' ? '#f97316' :
                currentStory.theme === 'noon' ? '#eab308' :
                currentStory.theme === 'golden' ? '#f59e0b' :
                '#3b82f6'
              } stopOpacity="0.6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {/* Animated Connection Lines */}
          <path
            d="M100,100 Q300,50 500,150 T900,100"
            stroke="url(#energyGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ 
              strokeDasharray: '10,5',
              animation: 'energyFlow 3s linear infinite'
            }}
          />
          <path
            d="M150,300 Q400,250 600,350 T1000,300"
            stroke="url(#energyGradient)"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ 
              strokeDasharray: '8,4',
              animation: 'energyFlow 4s linear infinite reverse'
            }}
          />
        </svg>
      </div>

      {/* Story Progress Indicator with Strong Background */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex flex-col items-center space-y-4 bg-black/50 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/30">
          {/* Energy Level Meter */}
          <div className="w-32 h-3 bg-black/40 rounded-full overflow-hidden border border-white/20">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                currentStory.theme === 'sunrise' ? 'bg-gradient-to-r from-orange-400 to-yellow-400' :
                currentStory.theme === 'noon' ? 'bg-gradient-to-r from-yellow-300 to-white' :
                currentStory.theme === 'golden' ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                'bg-gradient-to-r from-blue-400 to-purple-500'
              }`}
              style={{ 
                width: `${currentStory.energyLevel}%`,
                boxShadow: `0 0 10px ${
                  currentStory.theme === 'sunrise' ? '#f97316' :
                  currentStory.theme === 'noon' ? '#eab308' :
                  currentStory.theme === 'golden' ? '#f59e0b' :
                  '#3b82f6'
                }`
              }}
            />
          </div>
          
          {/* Story Progress Dots */}
          <div className="flex space-x-3">
            {solarStory.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? `${
                        currentStory.theme === 'sunrise' ? 'bg-orange-400' :
                        currentStory.theme === 'noon' ? 'bg-yellow-300' :
                        currentStory.theme === 'golden' ? 'bg-amber-400' :
                        'bg-blue-400'
                      } scale-150 shadow-lg`
                    : 'bg-white/60 scale-100'
                }`}
                style={{
                  boxShadow: index === currentIndex ? `0 0 12px ${
                    currentStory.theme === 'sunrise' ? '#f97316' :
                    currentStory.theme === 'noon' ? '#eab308' :
                    currentStory.theme === 'golden' ? '#f59e0b' :
                    '#3b82f6'
                  }` : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Story Title with Strong Background */}
      <div className="absolute top-6 right-6 z-30">
        {isInitialized && currentStory && (
          <div 
            className="backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/40 shadow-2xl transition-all duration-1000 bg-black/60"
            style={{
              animation: 'storyAppear 2s ease-out'
            }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full animate-pulse ${
                currentStory.theme === 'sunrise' ? 'bg-orange-400' :
                currentStory.theme === 'noon' ? 'bg-yellow-300' :
                currentStory.theme === 'golden' ? 'bg-amber-400' :
                'bg-blue-400'
              }`} />
              <span className="text-white font-bold text-sm tracking-wide drop-shadow-lg">
                {currentStory.title.toUpperCase()}
              </span>
              <div className="text-white/90 text-xs font-medium">
                {currentStory.energyLevel}% Energy
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced CSS Animations */}
      <style jsx>{`
        /* Natural image animations - full brightness, beautiful colors */
        @keyframes solar-sunrise {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-0.5%) translateY(0); }
        }
        
        @keyframes solar-noon {
          0% { transform: translateY(0); }
          100% { transform: translateY(-0.5%); }
        }
        
        @keyframes solar-golden {
          0% { transform: translateX(0); }
          100% { transform: translateX(0.5%); }
        }
        
        @keyframes solar-evening {
          0% { transform: translateY(0); }
          100% { transform: translateY(0.5%); }
        }
        
        /* Energy flow animations */
        @keyframes energyFlow {
          0% { stroke-dashoffset: 0; opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { stroke-dashoffset: -50; opacity: 0.3; }
        }
        
        /* Solar ray animations */
        @keyframes solarRay0 { 0%, 100% { opacity: 0.3; transform: rotate(0deg) scaleY(1); } 50% { opacity: 0.8; transform: rotate(0deg) scaleY(1.5); } }
        @keyframes solarRay1 { 0%, 100% { opacity: 0.2; transform: rotate(45deg) scaleY(0.8); } 60% { opacity: 0.9; transform: rotate(45deg) scaleY(1.3); } }
        @keyframes solarRay2 { 0%, 100% { opacity: 0.4; transform: rotate(90deg) scaleY(1.1); } 40% { opacity: 0.7; transform: rotate(90deg) scaleY(1.6); } }
        @keyframes solarRay3 { 0%, 100% { opacity: 0.3; transform: rotate(135deg) scaleY(0.9); } 70% { opacity: 0.8; transform: rotate(135deg) scaleY(1.4); } }
        @keyframes solarRay4 { 0%, 100% { opacity: 0.5; transform: rotate(180deg) scaleY(1.2); } 30% { opacity: 0.6; transform: rotate(180deg) scaleY(1.7); } }
        @keyframes solarRay5 { 0%, 100% { opacity: 0.2; transform: rotate(225deg) scaleY(0.7); } 80% { opacity: 0.9; transform: rotate(225deg) scaleY(1.2); } }
        @keyframes solarRay6 { 0%, 100% { opacity: 0.4; transform: rotate(270deg) scaleY(1); } 45% { opacity: 0.7; transform: rotate(270deg) scaleY(1.5); } }
        @keyframes solarRay7 { 0%, 100% { opacity: 0.3; transform: rotate(315deg) scaleY(1.1); } 65% { opacity: 0.8; transform: rotate(315deg) scaleY(1.3); } }
        
        /* Energy particle flows */
        @keyframes energyFlow0 {
          0% { transform: translateY(0) translateX(0) scale(0.5); opacity: 0; }
          25% { opacity: 0.8; transform: scale(1); }
          50% { transform: translateY(-20px) translateX(10px) scale(1.2); }
          100% { transform: translateY(-40px) translateX(20px) scale(0.3); opacity: 0; }
        }
        
        @keyframes energyFlow1 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateY(-30px) translateX(-15px) rotate(180deg); opacity: 0; }
        }
        
        @keyframes energyFlow2 {
          0% { transform: translateY(0) translateX(0) scale(0.8); opacity: 0; }
          40% { opacity: 0.7; transform: scale(1.1); }
          100% { transform: translateY(-25px) translateX(25px) scale(0.4); opacity: 0; }
        }
        
        @keyframes energyFlow3 {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          35% { opacity: 0.8; }
          100% { transform: translateY(-35px) translateX(-10px); opacity: 0; }
        }
        
        /* Story appearance animation */
        @keyframes storyAppear {
          0% { transform: translateX(100px) scale(0.8); opacity: 0; }
          60% { transform: translateX(-10px) scale(1.05); opacity: 0.9; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        
        /* Apply smooth animations - 12 second duration for perfect sync */
        .animate-solar-sunrise { animation: solar-sunrise 12s ease-out forwards; }
        .animate-solar-noon { animation: solar-noon 12s ease-out forwards; }
        .animate-solar-golden { animation: solar-golden 12s ease-out forwards; }
        .animate-solar-evening { animation: solar-evening 12s ease-out forwards; }
        
        /* Ensure perfectly smooth transitions */
        img {
          will-change: opacity;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        
        /* Force smooth rendering */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
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