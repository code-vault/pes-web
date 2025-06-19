import { Award, Users, Zap, Leaf, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const AboutPage = () => {
  const t = useTranslations('aboutPage');
  
  const stats = [
    { icon: Users, number: "2,500+", label: t('stats.customers'), gradient: "from-blue-500 to-cyan-500" },
    { icon: Zap, number: "15MW+", label: t('stats.installed'), gradient: "from-orange-500 to-amber-500" },
    { icon: Award, number: "12+", label: t('stats.experience'), gradient: "from-purple-500 to-violet-500" },
    { icon: Leaf, number: "50M+", label: t('stats.co2Saved'), gradient: "from-green-500 to-emerald-500" }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToHome')}
            </Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl text-center">
              <div className={`bg-gradient-to-br ${stat.gradient} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('ourStory')}</h2>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('story.paragraph1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('story.paragraph2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('story.paragraph3')}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('ourJourney')}</h2>
          <div className="space-y-8">
            {timeline.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-bold">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('whyChooseUs')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-lg flex-shrink-0">
                  <highlight.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">{highlight.title}</h4>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;