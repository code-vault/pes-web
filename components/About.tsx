import { Link } from '@/i18n/navigation';
import { Award, Users, Zap, Leaf, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from './ui/button';

const About = () => {
  const t = useTranslations('about');
  
  const stats = [
    { icon: Users, number: "2,500+", label: t('stats.customers'), gradient: "from-blue-500 to-cyan-500" },
    { icon: Zap, number: "15MW+", label: t('stats.installed'), gradient: "from-orange-500 to-amber-500" },
    { icon: Award, number: "12+", label: t('stats.experience'), gradient: "from-purple-500 to-violet-500" },
    { icon: Leaf, number: "50M+", label: t('stats.co2Saved'), gradient: "from-green-500 to-emerald-500" }
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
              <span className="text-sm font-semibold text-orange-600">{t('badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('subtitle')}
            </p>
            <Link href="/about">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                {t('learnMore')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`bg-gradient-to-br ${stat.gradient} w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;