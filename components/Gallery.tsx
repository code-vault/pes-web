"use client";
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ScrollReveal';
import PhotoStack from '@/components/PhotoStack';
import PhotoCarousel from '@/components/PhotoCarousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Gallery = () => {
  const t = useTranslations('gallery');
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback items (used when Sanity has no data or on error)
  const fallbackItems = [
    {
      _id: 'fallback-1',
      title: 'Solar Rooftop Installation',
      category: 'residential',
      mediaType: 'imageGallery' as const,
      images: [
        {
          image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Solar installation',
          caption: 'Professional solar panel installation'
        }
      ],
      featured: false
    },
    {
      _id: 'fallback-2',
      title: 'Commercial Solar Farm',
      category: 'commercial',
      mediaType: 'imageGallery' as const,
      images: [
        {
          image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6909?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Solar farm',
          caption: 'Large scale solar farm'
        }
      ],
      featured: false
    },
    {
      _id: 'fallback-3',
      title: 'Industrial Solar Complex',
      category: 'industrial',
      mediaType: 'imageGallery' as const,
      images: [
        {
          image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Industrial solar',
          caption: 'Industrial scale installation'
        }
      ],
      featured: false
    },
    {
      _id: 'fallback-4',
      title: 'Hybrid Power System',
      category: 'residential',
      mediaType: 'imageGallery' as const,
      images: [
        {
          image: 'https://images.unsplash.com/photo-1513107990900-ed83fbe91e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Hybrid system',
          caption: 'Solar with battery storage'
        }
      ],
      featured: false
    },
    {
      _id: 'fallback-5',
      title: 'Grid-Tied Solar Solution',
      category: 'commercial',
      mediaType: 'imageGallery' as const,
      images: [
        {
          image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Grid-tied system',
          caption: 'Connected to main grid'
        }
      ],
      featured: false
    },
    {
      _id: 'fallback-6',
      title: 'Off-Grid Installation',
      category: 'residential',
      mediaType: 'imageGallery' as const,
      images: [
        {
          image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Off-grid system',
          caption: 'Standalone solar power'
        }
      ],
      featured: false
    }
  ];

  // Fetch FIRST 6 items from gallery projects from Sanity in real-time
  useEffect(() => {
    async function loadGalleryItems() {
      try {
        console.log('Fetching gallery from API endpoint...');
        const response = await fetch('/api/gallery');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const { success, data, error } = await response.json();
        
        if (!success) {
          throw new Error(error || 'API returned error');
        }
        
        console.log('Gallery fetch results:', data);
        
        if (data && data.length > 0) {
          console.log('Found', data.length, 'total projects');
          
          // Filter and transform gallery items - only image galleries for home
          const transformedItems = data.filter((item: any) => {
            const isImageGallery = item.mediaType === 'imageGallery' && item.images && item.images.length > 0;
            console.log(`Project "${item.title}" - mediaType: ${item.mediaType}, hasImages: ${item.images?.length > 0}, qualifies: ${isImageGallery}`);
            return isImageGallery;
          }).map((item: any) => {
            // Handle title - could be string or object with english/hindi fields
            let title = 'Project';
            if (typeof item.title === 'string') {
              title = item.title;
            } else if (item.title?.english) {
              title = item.title.english;
            } else if (item.title?.hindi) {
              title = item.title.hindi;
            } else if (item.title) {
              title = JSON.stringify(item.title);
            }

            // Handle description similarly
            let description = null;
            if (typeof item.description === 'string') {
              description = item.description;
            } else if (item.description?.english) {
              description = item.description.english;
            }

            return {
              _id: item._id,
              title: title || 'Project',
              category: item.category || null,
              mediaType: item.mediaType,
              images: item.images || [],
              description: description,
              specifications: item.specifications || null,
              featured: item.featured || false
            };
          });

          console.log('Transformed items:', transformedItems);
          setMediaItems(transformedItems.length > 0 ? transformedItems : fallbackItems);
        } else {
          console.log('No projects found, using fallback items');
          setMediaItems(fallbackItems);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading gallery:', err);
        // On error, use fallback items
        setMediaItems(fallbackItems);
        setLoading(false);
      }
    }

    loadGalleryItems();
  }, []);

  const handleViewGallery = () => {
    router.push('/gallery');
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
          {/* Header section */}
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

          {/* Loading state */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              <p className="text-gray-600 mt-4">Loading gallery preview...</p>
            </div>
          )}

          {/* Gallery Carousel */}
          {!loading && mediaItems.length > 0 && (
            <ScrollReveal direction="up" delay={200} duration={500}>
              <div className="mb-12">
                <Carousel className="w-full max-w-5xl mx-auto">
                  <CarouselContent>
                    {mediaItems.map((project) => (
                      <CarouselItem key={project._id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-2 h-full">
                          <PhotoStack
                            images={project.images}
                            title={project.title}
                            onClick={() => setSelectedProject(project)}
                            className="h-full"
                          />
                          <p className="mt-4 text-center font-semibold text-gray-800 truncate">
                            {project.title}
                          </p>
                          {project.category && (
                            <p className="text-center text-sm text-gray-500 capitalize">
                              {project.category}
                            </p>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="bg-white/80 border-gray-200 hover:bg-white" />
                  <CarouselNext className="bg-white/80 border-gray-200 hover:bg-white" />
                </Carousel>
              </div>
            </ScrollReveal>
          )}

          {/* Empty state */}
          {!loading && mediaItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No gallery projects available yet</p>
            </div>
          )}

          {/* CTA section */}
          {!loading && (
            <ScrollReveal direction="up" delay={300} duration={500}>
              <div className="text-center">
                <Button 
                  onClick={handleViewGallery}
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  {t('viewFullGallery')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Photo Carousel Modal */}
      {selectedProject && (
        <PhotoCarousel
          images={selectedProject.images}
          title={selectedProject.title}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default Gallery;
