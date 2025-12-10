"use client";
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ScrollReveal';
import MediaImage from '@/components/MediaImage';
import MediaVideo from '@/components/MediaVideo';
import PhotoStack from '@/components/PhotoStack';

const GalleryPage = () => {
  const t = useTranslations('galleryPage');
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback items (only 6 items, used when Sanity has no data)
  const fallbackItems = [
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      altText: 'Solar installation',
      title: t('projects.0.title'),
      category: t('projects.0.category')
    },
    {
      type: 'video' as const,
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      altText: 'Video project',
      title: t('projects.1.title'),
      category: t('projects.1.category')
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1559302504-64aae6ca6909?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1559302504-64aae6ca6909?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      altText: 'Farm project',
      title: t('projects.2.title'),
      category: t('projects.2.category')
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      altText: 'Industrial installation',
      title: t('projects.3.title'),
      category: t('projects.3.category')
    },
    {
      type: 'video' as const,
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      altText: 'Video project',
      title: t('projects.4.title'),
      category: t('projects.4.category')
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1513107990900-ed83fbe91e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1513107990900-ed83fbe91e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      altText: 'Solar panel installation',
      title: t('projects.5.title'),
      category: t('projects.5.category')
    }
  ];

  // Fetch ALL gallery items from API endpoint
  useEffect(() => {
    async function loadGalleryItems() {
      try {
        const startTime = performance.now();
        console.log('📸 Fetching gallery items from API endpoint...');
        
        const response = await fetch('/api/gallery-page', {
          // Don't cache on client-side to always get fresh data
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const fetchTime = performance.now() - startTime;
        
        if (!data.success) {
          throw new Error(data.error || 'Unknown API error');
        }

        const results = data.data || [];
        console.log(`✅ Loaded ${results.length} gallery items (${fetchTime.toFixed(0)}ms, source: ${data.source})`);
        
        if (results && results.length > 0) {
          // API already transforms data and pre-generates URLs!
          // Just use it directly - no need for further transformation
          setMediaItems(results);
        } else {
          console.log('No gallery items from API, using fallback');
          setMediaItems(fallbackItems);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading gallery from API:', err);
        // On error, use fallback items
        setMediaItems(fallbackItems);
        setLoading(false);
      }
    }

    loadGalleryItems();
  }, []);

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

          {/* Loading state */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              <p className="text-white mt-4">Loading gallery...</p>
            </div>
          )}

          {/* Gallery Grid with ScrollReveal */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mediaItems.map((item, index) => (
                <ScrollReveal
                  key={index}
                  direction="scale"
                  delay={700 + (index * 100)}
                >
                  {item.type === 'imageGallery' && item.images ? (
                    // Use PhotoStack for image galleries
                    <div className="h-full">
                      <PhotoStack
                        images={item.images}
                        title={item.title}
                        onClick={() => openLightbox(item, index)}
                        className="h-full"
                      />
                    </div>
                  ) : (
                    // Custom card for videos and other types
                    <div 
                      className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10 h-full"
                      onClick={() => openLightbox(item, index)}
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm bg-white/5 h-full">
                        <div className="aspect-[4/3] overflow-hidden bg-gray-800">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.altText || 'Gallery item'}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                              <span className="text-gray-500">No image</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Hover overlay with project name */}
                        {item.title && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                            <div className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full">
                              <span className="text-xs font-semibold">{item.title}</span>
                            </div>
                          </div>
                        )}

                        {/* Type badge - only show for videos */}
                        {item.type === 'video' && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-red-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                              {t('video')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
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
              selectedMedia.mediaKey ? (
                <MediaImage
                  mediaKey={selectedMedia.mediaKey}
                  fallbackSrc={selectedMedia.src}
                  fallbackAlt={selectedMedia.altText}
                  width={1200}
                  height={900}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scale-in"
                />
              ) : (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.altText}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scale-in"
                />
              )
            ) : (
              selectedMedia.mediaKey ? (
                <MediaVideo
                  mediaKey={selectedMedia.mediaKey}
                  fallbackSrc={selectedMedia.src}
                  controls
                  autoPlay
                  className="max-w-full max-h-full rounded-lg shadow-2xl animate-scale-in"
                />
              ) : (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  className="max-w-full max-h-full rounded-lg shadow-2xl animate-scale-in"
                >
                  {t('videoNotSupported')}
                </video>
              )
            )}
          </div>

          {/* Show title in lightbox only if it exists */}
          {selectedMedia.title && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <h3 className="text-white text-xl font-semibold mb-2">{selectedMedia.title}</h3>
              <p className="text-gray-300 text-sm">
                {t('imageCounter', { current: currentIndex + 1, total: mediaItems.length })}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GalleryPage;