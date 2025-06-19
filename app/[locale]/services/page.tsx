import { Home, Building, Factory, Wrench, Calculator, HeadphonesIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {Link} from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const ServicesPage = () => {
  const t = useTranslations('servicesPage');

  const services = [
    {
      Icon: Home,
      title: t('services.0.title'),
      description: t('services.0.description'),
      features: t('services.0.features'),
      gradient: "from-blue-500 to-cyan-500",
      detailedDescription: t('services.0.detailedDescription')
    },
    {
      Icon: Building,
      title: t('services.1.title'),
      description: t('services.1.description'),
      features: t('services.1.features'),
      gradient: "from-green-500 to-emerald-500",
      detailedDescription: t('services.1.detailedDescription')
    },
    {
      Icon: Factory,
      title: t('services.2.title'),
      description: t('services.2.description'),
      features: t('services.2.features'),
      gradient: "from-purple-500 to-violet-500",
      detailedDescription: t('services.2.detailedDescription')
    },
    {
      Icon: Calculator,
      title: t('services.3.title'),
      description: t('services.3.description'),
      features: t('services.3.features'),
      gradient: "from-orange-500 to-red-500",
      detailedDescription: t('services.3.detailedDescription')
    },
    {
      Icon: Wrench,
      title: t('services.4.title'),
      description: t('services.4.description'),
      features: t('services.4.features'),
      gradient: "from-teal-500 to-cyan-500",
      detailedDescription: t('services.4.detailedDescription')
    },
    {
      Icon: HeadphonesIcon,
      title: t('services.5.title'),
      description: t('services.5.description'),
      features: t('services.5.features'),
      gradient: "from-indigo-500 to-blue-500",
      detailedDescription: t('services.5.detailedDescription')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className={`bg-gradient-to-br ${service.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                  {service.description}
                </CardDescription>
                <p className="text-gray-700 leading-relaxed">
                  {service.detailedDescription}
                </p>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-gray-900 mb-4">{t('whatsIncluded')}</h4>
                <ul className="space-y-3">
                  {service.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-4 shadow-sm`}></div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;