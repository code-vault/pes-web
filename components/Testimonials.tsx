import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

const Testimonials = () => {
  const t = useTranslations('testimonials');
  const reviews = t.raw('reviews') as Array<{name: string, location: string, text: string}>;

  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500", 
    "from-purple-500 to-violet-500",
    "from-orange-500 to-red-500",
    "from-teal-500 to-cyan-500",
    "from-indigo-500 to-blue-500"
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
            <span className="text-sm font-semibold text-orange-600">{t('badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 bg-white/60 backdrop-blur-sm border-0 hover:-translate-y-2 overflow-hidden">
              <CardContent className="p-8 relative">
                {/* Quote Icon */}
                <div className={`absolute top-4 right-4 bg-gradient-to-br ${gradients[index]} p-2 rounded-lg opacity-20`}>
                  <Quote className="h-6 w-6 text-white" />
                </div>

                {/* Stars */}
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Customer Info */}
                <div className="border-t border-gray-200/50 pt-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index]} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-semibold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                      <p className="text-gray-600 font-medium">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;