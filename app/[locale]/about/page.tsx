import { Award, Users, Zap, Leaf, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ScrollReveal';
import { useState, useEffect, useRef } from 'react';

// Number animation hook for stats counter
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

// Intersection Observer hook for stats counter
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

const AboutPage = () => {
  const t = useTranslations('aboutPage');
  
  // Only keep intersection observer for stats counter
  const { ref: statsRef, isIntersecting: statsVisible } = useIntersectionObserver(0.3);
  
  // Stats data with numbers
  const stats = [
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

  const highlights = [
    {
      icon: CheckCircle,
      title: t('highlights.0.title'),
      description: t('highlights.0.description')
    },
    {
      icon: CheckCircle,
      title: t('highlights.1.title'),
      description: t('highlights.1.description')
    },
    {
      icon: CheckCircle,
      title: t('highlights.2.title'),
      description: t('highlights.2.description')
    },
    {
      icon: CheckCircle,
      title: t('highlights.3.title'),
      description: t('highlights.3.description')
    }
  ];

  const timeline = [
    { year: "2012", title: t('timeline.0.title'), description: t('timeline.0.description') },
    { year: "2015", title: t('timeline.1.title'), description: t('timeline.1.description') },
    { year: "2018", title: t('timeline.2.title'), description: t('timeline.2.description') },
    { year: "2021", title: t('timeline.3.title'), description: t('timeline.3.description') },
    { year: "2024", title: t('timeline.4.title'), description: t('timeline.4.description') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 pt-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
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

          <ScrollReveal direction="up" delay={300}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              {t('title')}
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={500}>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
              {t('subtitle')}
            </p>
          </ScrollReveal>
        </div>

        {/* Stats Section with ScrollReveal */}
        <ScrollReveal direction="up" delay={700}>
          <div 
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl text-center">
                <div className={`bg-gradient-to-br ${stat.gradient} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatNumber(counts[index].count, index)}{stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Story Section with ScrollReveal */}
        <ScrollReveal direction="up" delay={900}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('ourStory')}</h2>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <ScrollReveal direction="up" delay={1100}>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t('story.paragraph1')}
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={1300}>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t('story.paragraph2')}
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={1500}>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('story.paragraph3')}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline with ScrollReveal */}
        <ScrollReveal direction="up" delay={1100}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('ourJourney')}</h2>
            <div className="space-y-8">
              {timeline.map((milestone, index) => (
                <ScrollReveal
                  key={index}
                  direction="right"
                  delay={1300 + (index * 200)}
                >
                  <div className="flex items-start space-x-6">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-bold">
                      {milestone.year}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Highlights with ScrollReveal */}
        <ScrollReveal direction="up" delay={1700}>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('whyChooseUs')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <ScrollReveal
                  key={index}
                  direction="scale"
                  delay={1900 + (index * 150)}
                >
                  <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-lg flex-shrink-0">
                      <highlight.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-lg">{highlight.title}</h4>
                      <p className="text-gray-600">{highlight.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AboutPage;