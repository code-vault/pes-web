"use client";
import { useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Maximize, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ScrollReveal';

const GalleryPage = () => {
  const t = useTranslations('galleryPage');
  const [selectedMedia, setSelectedMedia] = useState<{type: 'image' | 'video', src: string, title: string} | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mediaItems = [
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: t('projects.0.title'),
      category: t('projects.0.category')
    },
    {
      type: 'video' as const,
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: t('projects.1.title'),
      category: t('projects.1.category')
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1559302504-64aae6ca6909?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1559302504-64aae6ca6909?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: t('projects.2.title'),
      category: t('projects.2.category')
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: t('projects.3.title'),
      category: t('projects.3.category')
    },
    {
      type: 'video' as const,
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: t('projects.4.title'),
      category: t('projects.4.category')
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1513107990900-ed83fbe91e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1513107990900-ed83fbe91e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: t('projects.5.title'),
      category: t('projects.5.category')
    },
    // Add more media items...
    ...Array.from({ length: 12 }, (_, i) => ({
      type: 'image' as const,
      src: `https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
      thumbnail: `https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
      title: `${t('projects.0.title')} ${i + 7}`,
      category: i % 2 === 0 ? t('categories.residential') : t('categories.commercial')
    }))
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 pt-32 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* Header with ScrollReveal */}
          <div className="mb-8">
            <ScrollReveal direction="up" delay={100}>
              <Link href="/">
                <Button variant="outline" className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('backToHome')}
                </Button>
              </Link>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                {t('title')}
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={500}>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
                {t('subtitle')}
              </p>
            </ScrollReveal>
          </div>

          {/* Gallery Grid with ScrollReveal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mediaItems.map((item, index) => (
              <ScrollReveal
                key={index}
                direction="scale"
                delay={700 + (index * 100)}
              >
                <div 
                  className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10"
                  onClick={() => openLightbox(item, index)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm bg-white/5">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                        <p className="text-gray-300 text-sm">{item.category}</p>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.type === 'video' 
                          ? 'bg-red-500/80 text-white' 
                          : 'bg-blue-500/80 text-white'
                      } backdrop-blur-sm`}>
                        {item.type === 'video' ? t('video') : t('photo')}
                      </span>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/80 text-white backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal with enhanced animations */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
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
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scale-in"
              />
            ) : (
              <video
                src={selectedMedia.src}
                controls
                autoPlay
                className="max-w-full max-h-full rounded-lg shadow-2xl animate-scale-in"
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

export default GalleryPage;