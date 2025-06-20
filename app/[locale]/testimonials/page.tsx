"use client";
import { useState } from 'react';
import { Star, Quote, ArrowLeft, Play, ExternalLink, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const TestimonialsPage = () => {
  const t = useTranslations('testimonialsPage');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Video testimonials data
  const videoTestimonials = [
    {
      id: 1,
      name: "Raj Sharma",
      location: "Mumbai, Maharashtra",
      title: "From ₹25,000 to ₹3,000 Monthly Bills!",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
      duration: "2:45",
      rating: 5,
      savings: "₹2,64,000/year",
      systemSize: "8kW Residential",
      description: "See how Raj transformed his home energy costs with our solar solution."
    },
    {
      id: 2,
      name: "Priya Patel",
      location: "Ahmedabad, Gujarat",
      title: "Best Investment We Ever Made",
      youtubeId: "9bZkp7q19f0",
      thumbnail: `https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg`,
      duration: "3:12",
      rating: 5,
      savings: "₹1,80,000/year",
      systemSize: "6kW Residential",
      description: "Priya shares her amazing experience with our solar installation team."
    },
    {
      id: 3,
      name: "Amit Kumar",
      location: "Delhi NCR",
      title: "Professional Service, Amazing Results",
      youtubeId: "ScMzIvxBSi4",
      thumbnail: `https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg`,
      duration: "1:58",
      rating: 5,
      savings: "₹3,60,000/year",
      systemSize: "12kW Commercial",
      description: "Commercial client Amit explains the ROI of his solar investment."
    },
    {
      id: 4,
      name: "Sunita Gupta",
      location: "Pune, Maharashtra",
      title: "Exceeded All Our Expectations",
      youtubeId: "kJQP7kiw5Fk",
      thumbnail: `https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg`,
      duration: "2:30",
      rating: 5,
      savings: "₹2,10,000/year",
      systemSize: "7kW Residential",
      description: "Sunita talks about the seamless installation process and ongoing support."
    }
  ];

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
      name: `Customer ${i + 7}`,
      location: i % 2 === 0 ? "Residential Customer" : "Business Owner",
      rating: 5,
      text: "Amazing experience with Purvodaya Energy Solutions. The installation was smooth, and we're seeing great savings on our energy bills. Professional team and excellent customer service throughout the process.",
      gradient: `from-${['blue', 'green', 'purple', 'orange', 'teal', 'indigo'][i % 6]}-500 to-${['cyan', 'emerald', 'violet', 'red', 'cyan', 'blue'][i % 6]}-500`,
      project: `${5 + i}kW ${i % 2 === 0 ? 'Residential' : 'Commercial'} System`,
      savings: `₹${90000 + i * 15000}/year`
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
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pt-32">
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

          {/* Video Testimonials Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
                <span className="text-sm font-semibold text-orange-600">Video Reviews</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Watch Customer Stories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See real customers share their solar journey and savings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videoTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2 overflow-hidden">
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
                          <p className="text-xs text-gray-500 uppercase tracking-wider">System Size</p>
                          <p className="font-bold text-gray-900">{testimonial.systemSize}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Annual Savings</p>
                          <p className="font-bold text-green-600">{testimonial.savings}</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => openVideo(testimonial.youtubeId)}
                      className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white transition-all duration-300"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Watch Full Story
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Written Testimonials Section */}
          <div className="mb-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
                <span className="text-sm font-semibold text-orange-600">Written Reviews</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Detailed Customer Reviews
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Read comprehensive feedback from our satisfied customers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2">
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
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Our Happy Customers?</h3>
              <p className="text-orange-100 mb-6">Get your free solar consultation today and start saving!</p>
              <Button className="bg-white text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Free Quote Now
              </Button>
            </div>
          </div>
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
              title="Customer Testimonial"
              className="w-full h-full rounded-lg shadow-2xl"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white text-sm opacity-75">
              Press ESC to close • Click outside to close
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialsPage;