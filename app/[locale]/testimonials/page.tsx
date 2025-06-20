"use client";
import { useState } from 'react';
import { Star, Quote, ArrowLeft, Play, ExternalLink, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ScrollReveal';

const TestimonialsPage = () => {
  const t = useTranslations('testimonialsPage');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Video testimonials data from translations
  const videoTestimonials = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: t(`videoTestimonials.${i}.name`),
    location: t(`videoTestimonials.${i}.location`),
    title: t(`videoTestimonials.${i}.title`),
    youtubeId: t(`videoTestimonials.${i}.youtubeId`),
    thumbnail: `https://img.youtube.com/vi/${t(`videoTestimonials.${i}.youtubeId`)}/maxresdefault.jpg`,
    duration: t(`videoTestimonials.${i}.duration`),
    rating: 5,
    savings: t(`videoTestimonials.${i}.savings`),
    systemSize: t(`videoTestimonials.${i}.systemSize`),
    description: t(`videoTestimonials.${i}.description`)
  }));

  // Written testimonials from existing translations
  const testimonials = [
    {
      name: t('testimonials.0.name'),
      location: t('testimonials.0.location'),
      rating: 5,
      text: t('testimonials.0.text'),
      gradient: "from-blue-500 to-cyan-500",
      project: t('testimonials.0.project'),
      savings: t('testimonials.0.savings')
    },
    {
      name: t('testimonials.1.name'),
      location: t('testimonials.1.location'),
      rating: 5,
      text: t('testimonials.1.text'),
      gradient: "from-green-500 to-emerald-500",
      project: t('testimonials.1.project'),
      savings: t('testimonials.1.savings')
    },
    {
      name: t('testimonials.2.name'),
      location: t('testimonials.2.location'),
      rating: 5,
      text: t('testimonials.2.text'),
      gradient: "from-purple-500 to-violet-500",
      project: t('testimonials.2.project'),
      savings: t('testimonials.2.savings')
    },
    {
      name: t('testimonials.3.name'),
      location: t('testimonials.3.location'),
      rating: 5,
      text: t('testimonials.3.text'),
      gradient: "from-orange-500 to-red-500",
      project: t('testimonials.3.project'),
      savings: t('testimonials.3.savings')
    },
    {
      name: t('testimonials.4.name'),
      location: t('testimonials.4.location'),
      rating: 5,
      text: t('testimonials.4.text'),
      gradient: "from-teal-500 to-cyan-500",
      project: t('testimonials.4.project'),
      savings: t('testimonials.4.savings')
    },
    {
      name: t('testimonials.5.name'),
      location: t('testimonials.5.location'),
      rating: 5,
      text: t('testimonials.5.text'),
      gradient: "from-indigo-500 to-blue-500",
      project: t('testimonials.5.project'),
      savings: t('testimonials.5.savings')
    },
    // Add more testimonials...
    ...Array.from({ length: 6 }, (_, i) => ({
      name: t(`additionalTestimonials.${i}.name`),
      location: t(`additionalTestimonials.${i}.location`),
      rating: 5,
      text: t(`additionalTestimonials.${i}.text`),
      gradient: `from-${['blue', 'green', 'purple', 'orange', 'teal', 'indigo'][i % 6]}-500 to-${['cyan', 'emerald', 'violet', 'red', 'cyan', 'blue'][i % 6]}-500`,
      project: t(`additionalTestimonials.${i}.project`),
      savings: t(`additionalTestimonials.${i}.savings`)
    }))
  ];

  const openVideo = (youtubeId: string) => {
    setSelectedVideo(youtubeId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pt-32 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
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

          {/* Video Testimonials Section with ScrollReveal */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <ScrollReveal direction="up" delay={700}>
                <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
                  <span className="text-sm font-semibold text-orange-600">{t('videoReviews')}</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={900}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t('watchCustomerStories')}
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1100}>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('seeRealCustomers')}
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videoTestimonials.map((testimonial, index) => (
                <ScrollReveal
                  key={testimonial.id}
                  direction="scale"
                  delay={1300 + (index * 200)}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2 overflow-hidden">
                    <div className="relative">
                      {/* YouTube Video Thumbnail */}
                      <div className="relative aspect-[16/9] overflow-hidden cursor-pointer" onClick={() => openVideo(testimonial.youtubeId)}>
                        <img
                          src={testimonial.thumbnail}
                          alt={testimonial.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
                          <div className="relative">
                            <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse opacity-75"></div>
                            <Button
                              size="lg"
                              className="relative bg-red-600 hover:bg-red-700 text-white border-0 rounded-full p-6 shadow-2xl transform group-hover:scale-110 transition-all duration-300"
                            >
                              <Play className="h-8 w-8 ml-1" fill="white" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Duration Badge */}
                        <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium">
                          {testimonial.duration}
                        </div>
                        
                        {/* YouTube Badge */}
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          YouTube
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{testimonial.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{testimonial.description}</p>
                      
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-semibold text-lg">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-gray-600 text-sm">{testimonial.location}</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">{t('systemSize')}</p>
                            <p className="font-bold text-gray-900">{testimonial.systemSize}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">{t('annualSavings')}</p>
                            <p className="font-bold text-green-600">{testimonial.savings}</p>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => openVideo(testimonial.youtubeId)}
                        className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white transition-all duration-300"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {t('watchFullStory')}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Written Testimonials Section with ScrollReveal */}
          <div className="mb-8">
            <div className="text-center mb-12">
              <ScrollReveal direction="up" delay={2100}>
                <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
                  <span className="text-sm font-semibold text-orange-600">{t('writtenReviews')}</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={2300}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t('detailedCustomerReviews')}
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={2500}>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('readComprehensiveFeedback')}
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal
                key={index}
                direction="up"
                delay={2700 + (index * 100)}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2">
                  <CardContent className="p-8 relative">
                    <div className={`absolute top-4 right-4 bg-gradient-to-br ${testimonial.gradient} p-2 rounded-lg opacity-20`}>
                      <Quote className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex items-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                      &quot;{testimonial.text}&quot;
                    </p>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">{t('project')}</span>
                        <span className="font-semibold text-gray-700">{testimonial.project}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">{t('annualSavings')}</span>
                        <span className="font-semibold text-green-600">{testimonial.savings}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200/50 pt-6 mt-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                          <span className="text-white font-semibold text-lg">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-gray-600 text-sm">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Call to Action with ScrollReveal */}
          <ScrollReveal direction="up" delay={4000}>
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{t('cta.title')}</h3>
                <p className="text-orange-100 mb-6">{t('cta.description')}</p>
                <Button className="bg-white text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {t('cta.button')}
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* YouTube Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-[16/9]">
            <Button
              onClick={closeVideo}
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 z-60 text-white hover:bg-white/20 h-10 w-10"
            >
              <X className="h-6 w-6" />
            </Button>
            
            {/* YouTube Embed */}
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title={t('customerTestimonial')}
              className="w-full h-full rounded-lg shadow-2xl"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white text-sm opacity-75">
              {t('modalInstructions')}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialsPage;