"use client";
import { Home, Building, Factory, ArrowRight } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from './ui/button';
import ScrollReveal from '@/components/ScrollReveal';

const Services = () => {
  const t = useTranslations('services');

  const services = [
    {
      Icon: Home,
      title: t('residential.title'),
      description: t('residential.description'),
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      Icon: Building,
      title: t('commercial.title'),
      description: t('commercial.description'),
      gradient: "from-green-500 to-emerald-500"
    },
    {
      Icon: Factory,
      title: t('industrial.title'),
      description: t('industrial.description'),
      gradient: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <section id="services" className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/8 to-violet-400/8 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section with ScrollReveal */}
        <div className="text-center mb-12">
          <ScrollReveal direction="up" delay={100}>
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
              <span className="text-sm font-semibold text-orange-600">{t('badge')}</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={300}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              {t('title')}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={500}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </ScrollReveal>
        </div>

        {/* Services grid with ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <ScrollReveal 
              key={index}
              direction="scale" 
              delay={700 + (index * 200)}
            >
              <Card className="group hover:shadow-2xl transition-all duration-700 border-0 bg-white/60 backdrop-blur-sm hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className={`bg-gradient-to-br ${service.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <service.Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA section with ScrollReveal */}
        <ScrollReveal direction="up" delay={1300}>
          <div className="text-center">
            <Link href="/services">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                {t('viewAll')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Services;