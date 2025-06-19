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
    <section id="about" className="section-modern bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
      
      <div className="container-modern relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg">
              <span className="text-base font-semibold text-orange-600">{t('badge')}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              {t('title')}
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              {t('subtitle')}
            </p>
            
            <Link href="/about">
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl">
                {t('learnMore')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group card-modern p-6 text-center rounded-2xl">
                <div className={`bg-gradient-to-br ${stat.gradient} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional content section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Expert Team</h3>
            <p className="text-gray-600 leading-relaxed">
              Our certified solar engineers have years of experience in designing and installing premium solar systems.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Quality Guarantee</h3>
            <p className="text-gray-600 leading-relaxed">
              We use only tier-1 solar panels and provide comprehensive 25-year warranties on all installations.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Fast Installation</h3>
            <p className="text-gray-600 leading-relaxed">
              Most residential installations are completed in 1-3 days with minimal disruption to your daily routine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;