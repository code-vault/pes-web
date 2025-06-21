"use client";
import { useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Maximize, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ScrollReveal';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Gallery = () => {
  const t = useTranslations('gallery');
  const tGalleryPage = useTranslations('galleryPage');
  const [selectedMedia, setSelectedMedia] = useState<{type: 'image' | 'video', src: string, title: string} | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Using translation keys that now exist in messages
  const mediaItems = [
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: tGalleryPage('projects.0.title')
    },
    {
      type: 'video' as const,
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: tGalleryPage('projects.1.title')
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1559302504-64aae6ca6909?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1559302504-64aae6ca6909?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: tGalleryPage('projects.2.title')
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: tGalleryPage('projects.3.title')
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1513107990900-ed83fbe91e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1513107990900-ed83fbe91e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: tGalleryPage('projects.5.title')
    },
    {
      type: 'video' as const,
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: tGalleryPage('projects.4.title')
    }
  ];

  const openLightbox = (item: typeof mediaItems[0], index: number) => {
    setSelectedMedia(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : mediaItems.length - 1;
    setCurrentIndex(newIndex);
    setSelectedMedia(mediaItems[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < mediaItems.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedMedia(mediaItems[newIndex]);
  };

  return (
    <>
      <section id="gallery" className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-r from-orange-400/8 to-amber-400/8 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header section - Group all header content */}
          <ScrollReveal direction="up" delay={0} duration={500}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
                <span className="text-sm font-semibold text-orange-600">{t('badge')}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                {t('title')}
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('subtitle')}
              </p>
            </div>
          </ScrollReveal>

          {/* Gallery Carousel */}
          <ScrollReveal direction="up" delay={200} duration={500}>
            <div className="mb-12">
              <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                  {mediaItems.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2 h-full">
                        <div 
                          className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
                          onClick={() => openLightbox(item, index)}
                        >
                          <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white">
                            <div className="aspect-[4/3] overflow-hidden">
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                              />
                            </div>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                {item.type === 'video' ? (
                                  <Play className="h-12 w-12 text-white mx-auto mb-2" />
                                ) : (
                                  <Maximize className="h-12 w-12 text-white mx-auto mb-2" />
                                )}
                                <p className="text-white font-semibold">{item.title}</p>
                              </div>
                            </div>

                            <div className="absolute top-4 right-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                item.type === 'video' 
                                  ? 'bg-red-500/80 text-white' 
                                  : 'bg-blue-500/80 text-white'
                              } backdrop-blur-sm`}>
                                {item.type === 'video' ? 'Video' : 'Photo'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white/80 border-gray-200 hover:bg-white" />
                <CarouselNext className="bg-white/80 border-gray-200 hover:bg-white" />
              </Carousel>
            </div>
          </ScrollReveal>

          {/* CTA section */}
          <ScrollReveal direction="up" delay={300} duration={500}>
            <div className="text-center">
              <Link href="/gallery">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl">
                  {t('viewFullGallery')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox Modal with enhanced animations */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Button
            onClick={closeLightbox}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-60 text-white hover:bg-white/20 h-12 w-12"
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-60 text-white hover:bg-white/20 h-12 w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-60 text-white hover:bg-white/20 h-12 w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {selectedMedia.type === 'image' ? (
              <img
                src={selectedMedia.src}
                alt={selectedMedia.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in duration-500"
              />
            ) : (
              <video
                src={selectedMedia.src}
                controls
                autoPlay
                className="max-w-full max-h-full rounded-lg shadow-2xl animate-in zoom-in duration-500"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <h3 className="text-white text-xl font-semibold mb-2">{selectedMedia.title}</h3>
            <p className="text-gray-300 text-sm">
              {currentIndex + 1} of {mediaItems.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;