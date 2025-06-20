"use client";
import { Link } from '@/i18n/navigation';
import { Award, Users, Zap, Leaf, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from './ui/button';
import { useState, useEffect, useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

// Number animation hook (keeping for stats counter)
const useCountUp = (end: number, duration: number = 2500, delay: number = 0) => {
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

// Intersection Observer hook (only for stats counter)
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

const About = () => {
  const t = useTranslations('about');
  
  // Only keep intersection observer for stats counter
  const { ref: statsRef, isIntersecting: statsVisible } = useIntersectionObserver(0.3);
  
  // Stats data with numbers
  const statsData = [
    { icon: Users, number: 2500, suffix: "+", label: t('stats.customers'), gradient: "from-blue-500 to-cyan-500" },
    { icon: Zap, number: 15, suffix: "MW+", label: t('stats.installed'), gradient: "from-orange-500 to-amber-500" },
    { icon: Award, number: 12, suffix: "+", label: t('stats.experience'), gradient: "from-purple-500 to-violet-500" },
    { icon: Leaf, number: 50, suffix: "M+", label: t('stats.co2Saved'), gradient: "from-green-500 to-emerald-500" }
  ];

  // Number animations for stats
  const customersCount = useCountUp(2500, 2000, 200);
  const installedCount = useCountUp(15, 1500, 400);
  const experienceCount = useCountUp(12, 1000, 600);
  const co2Count = useCountUp(50, 1800, 800);

  const counts = [customersCount, installedCount, experienceCount, co2Count];

  // Start animations when stats become visible
  useEffect(() => {
    if (statsVisible) {
      counts.forEach(counter => counter.start());
    }
  }, [statsVisible]);

  // Format numbers
  const formatNumber = (num: number, index: number): string => {
    if (index === 0) return new Intl.NumberFormat('en-IN').format(num); // customers
    return num.toString(); // others
  };

  // Features data
  const features = [
    {
      icon: Users,
      title: "Expert Team",
      description: "Our certified solar engineers have years of experience in designing and installing premium solar systems.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "Quality Guarantee", 
      description: "We use only tier-1 solar panels and provide comprehensive 25-year warranties on all installations.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Fast Installation",
      description: "Most residential installations are completed in 1-3 days with minimal disruption to your daily routine.",
      gradient: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <section id="about" className="section-modern bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
      
      <div className="container-modern relative z-10">
        {/* Header section with ScrollReveal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            <ScrollReveal direction="up" delay={100}>
              <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg">
                <span className="text-base font-semibold text-orange-600">{t('badge')}</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={300}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                {t('title')}
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={500}>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                {t('subtitle')}
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={700}>
              <Link href="/about">
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl">
                  {t('learnMore')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>

          {/* Stats Grid with ScrollReveal */}
          <div className="grid grid-cols-2 gap-6">
            {statsData.map((stat, index) => (
              <ScrollReveal 
                key={index}
                direction="scale" 
                delay={200 + (index * 150)}
              >
                <div 
                  ref={index === 0 ? statsRef : undefined}
                  className="group card-modern p-6 text-center rounded-2xl"
                >
                  <div className={`bg-gradient-to-br ${stat.gradient} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {formatNumber(counts[index].count, index)}{stat.suffix}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Additional content section with ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={200 + (index * 200)}
            >
              <div className="text-center space-y-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-xl hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;