import { Award, Users, Zap, Leaf, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const About = () => {
  const t = useTranslations('about');
  
  const stats = [
    { icon: Users, number: "2,500+", label: t('stats.customers'), gradient: "from-blue-500 to-cyan-500" },
    { icon: Zap, number: "15MW+", label: t('stats.installed'), gradient: "from-orange-500 to-amber-500" },
    { icon: Award, number: "12+", label: t('stats.experience'), gradient: "from-purple-500 to-violet-500" },
    { icon: Leaf, number: "50M+", label: t('stats.co2Saved'), gradient: "from-green-500 to-emerald-500" }
  ];

  const highlights = [
    {
      icon: CheckCircle,
      title: t('highlights.licensed.title'),
      description: t('highlights.licensed.description')
    },
    {
      icon: CheckCircle,
      title: t('highlights.equipment.title'),
      description: t('highlights.equipment.description')
    },
    {
      icon: CheckCircle,
      title: t('highlights.warranty.title'),
      description: t('highlights.warranty.description')
    },
    {
      icon: CheckCircle,
      title: t('highlights.pricing.title'),
      description: t('highlights.pricing.description')
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
                <span className="text-sm font-semibold text-orange-600">{t('badge')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
                {t('title')}
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t('subtitle')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('description')}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:shadow-lg transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-lg flex-shrink-0">
                    <highlight.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{highlight.title}</h4>
                    <p className="text-gray-600 text-sm">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group bg-white/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/30 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`bg-gradient-to-br ${stat.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-3">{stat.number}</div>
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