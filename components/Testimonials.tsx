// components/Testimonials.tsx (updated)
"use client";
import { useState, useEffect } from "react";
import { Star, Quote, ArrowRight, Play, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import MediaImage from "@/components/MediaImage"; // uses your media fetcher. :contentReference[oaicite:7]{index=7}
import MediaVideo from "@/components/MediaVideo"; // in case you want to embed hosted videos. :contentReference[oaicite:8]{index=8}

const Testimonials = () => {
  const t = useTranslations("testimonials");
  const [allTestimonials, setAllTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const fallback = [
    // minimal fallback similar to Gallery fallback pattern
    {
      _id: "fallback-text-1",
      type: "text",
      name: "Satisfied Customer",
      location: "Local City",
      rating: 5,
      text: { english: "Excellent service and savings!", hindi: "" },
      gradient: "from-blue-500 to-cyan-500",
      project: "5kW Residential",
      savings: "₹1,20,000/year",
    },
    {
      _id: "fallback-video-1",
      type: "video",
      name: "Video Customer",
      location: "Nearby Town",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "2:45",
      rating: 5,
      gradient: "from-red-500 to-pink-500",
      systemSize: "8kW",
      savings: "₹2,64,000/year",
    },
  ];

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        if (!json.success) throw new Error(json.error || "API returned error");

        const data = json.data || [];
        if (!cancelled) {
          // optional: transform to guarantee fields exist
          setAllTestimonials(Array.isArray(data) && data.length > 0 ? data : fallback);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading testimonials:", err);
        if (!cancelled) {
          setAllTestimonials(fallback);
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    }
  }, []);

  const openVideo = (youtubeId: string) => setSelectedVideo(youtubeId);
  const closeVideo = () => setSelectedVideo(null);

  const renderTextTestimonial = (testimonial: any, index: number) => (
    <ScrollReveal direction="up" delay={index * 100}>
      <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2 h-full">
        <CardContent className="p-6 relative h-full flex flex-col">
          <div className={`absolute top-4 right-4 bg-gradient-to-br ${testimonial.gradient} p-2 rounded-lg opacity-20`}>
            <Quote className="h-6 w-6 text-white" />
          </div>

          <div className="flex items-center mb-4">
            {[...Array(testimonial.rating || 5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
            &quot;{testimonial.text?.english || testimonial.text || ""}&quot;
          </p>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Project:</span>
              <span className="font-semibold text-gray-700">{testimonial.project || "-"}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Annual Savings:</span>
              <span className="font-semibold text-green-600">{testimonial.savings || "-"}</span>
            </div>
          </div>

          <div className="border-t border-gray-200/50 pt-4 mt-6">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white font-semibold text-sm">
                  {(testimonial.name || 'U').charAt(0)}
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
  );

  const renderVideoTestimonial = (testimonial: any, index: number) => (
    <ScrollReveal direction="scale" delay={index * 100}>
      <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2 h-full overflow-hidden">
        <div className="relative">
          <div className="relative aspect-[16/9] overflow-hidden cursor-pointer" onClick={() => openVideo(testimonial.youtubeId)}>
            {/* If you use a custom thumbnail stored in Sanity, show via MediaImage; otherwise fallback to YouTube thumbnail */}
            {testimonial.thumbnail?.startsWith('http') ? (
              <img src={testimonial.thumbnail} alt={testimonial.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            ) : testimonial.customerPhoto ? (
              <MediaImage mediaKey={testimonial.customerPhoto} fallbackSrc={testimonial.thumbnail} className="w-full h-full object-cover" />
            ) : (
              <img src={`https://img.youtube.com/vi/${testimonial.youtubeId}/maxresdefault.jpg`} alt={testimonial.name} className="w-full h-full object-cover" loading="lazy" />
            )}

            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse opacity-75"></div>
                <Button size="lg" className="relative bg-red-600 hover:bg-red-700 text-white border-0 rounded-full p-4 shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                  <Play className="h-6 w-6 ml-1" fill="white" />
                </Button>
              </div>
            </div>

            {testimonial.title?.english && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-semibold text-sm">{testimonial.title?.english}</p>
              </div>
            )}

            <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium">
              {testimonial.duration || "-"}
            </div>

            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center">
              <ExternalLink className="h-3 w-3 mr-1" />
              YouTube
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            {[...Array(testimonial.rating || 5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}>
              <span className="text-white font-semibold text-sm">{(testimonial.name || 'U').charAt(0)}</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-gray-600 text-sm">{testimonial.location}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-xl">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">System</p>
                <p className="font-bold text-gray-900 text-sm">{testimonial.systemSize || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Savings</p>
                <p className="font-bold text-green-600 text-sm">{testimonial.savings || "-"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  );

  return (
    <>
      <section id="testimonials" className="py-16 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* header (same as before) */}
          <div className="text-center mb-12">
            <ScrollReveal direction="up" delay={100}>
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
                <span className="text-sm font-semibold text-orange-600">{t('badge')}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">{t('title')}</h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={500}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t('subtitle')}</p>
            </ScrollReveal>
          </div>

          {/* carousel */}
          <ScrollReveal direction="scale" delay={700}>
            <div className="mb-12">
              <Carousel className="w-full max-w-6xl mx-auto">
                <CarouselContent>
                  {(loading ? fallback : allTestimonials).map((item, idx) => (
                    <CarouselItem key={item._id || idx} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2 h-full">
                        {item.type === 'text' ? renderTextTestimonial(item, idx) : renderVideoTestimonial(item, idx)}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white/80 border-gray-200 hover:bg-white" />
                <CarouselNext className="bg-white/80 border-gray-200 hover:bg-white" />
              </Carousel>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={900}>
            <div className="text-center">
              <Link href="/testimonials">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl">
                  {t('readAllReviews')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* video modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl aspect-[16/9]">
            <Button onClick={closeVideo} variant="ghost" size="icon" className="absolute -top-12 right-0 z-60 text-white hover:bg-white/20 h-10 w-10">
              <ArrowRight className="h-6 w-6 rotate-45" />
            </Button>

            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Customer Testimonial"
              className="w-full h-full rounded-lg shadow-2xl animate-in zoom-in duration-500"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Testimonials;