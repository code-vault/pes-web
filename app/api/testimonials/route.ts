import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import imageUrlBuilder from '@sanity/image-url';

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing required Sanity environment variables');
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

// Rate limiting map
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 60 second window
    return true;
  }

  if (record.count >= 60) {
    return false;
  }

  record.count++;
  return true;
}

// Try to load testimonials cache
function loadTestimonialsCache() {
  try {
    const cacheFile = join(process.cwd(), 'public', 'testimonials-cache.json');
    
    if (existsSync(cacheFile)) {
      const cacheContent = readFileSync(cacheFile, 'utf-8');
      const cache = JSON.parse(cacheContent);
      
      if (cache.testimonials && Array.isArray(cache.testimonials) && cache.testimonials.length > 0) {
        console.log(`📦 Using cached testimonials data (${cache.testimonials.length} testimonials)`);
        return cache.testimonials;
      }
    }
  } catch (err) {
    console.warn('Failed to load testimonials cache:', err);
  }
  
  return null;
}

function getImageUrl(source: any, width = 400, height = 400) {
  try {
    if (typeof source === 'string') {
      return source;
    } else {
      return builder
        .image(source)
        .width(width)
        .height(height)
        .format('webp')
        .url();
    }
  } catch (err) {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  try {
    // First, try to use cached data
    const cachedTestimonials = loadTestimonialsCache();
    
    if (cachedTestimonials) {
      const items = {
        textTestimonials: cachedTestimonials
          .filter((item: any) => item._type === 'testimonial')
          .map((item: any) => ({
            _id: item._id,
            customerName: item.customerName,
            location: item.location,
            testimonialText: item.testimonialText,
            rating: item.rating,
            customerPhoto: item.customerPhoto,
            projectDetails: item.projectDetails,
            gradient: item.gradient,
            featured: item.featured || false,
            sortOrder: item.sortOrder
          })),
        videoTestimonials: cachedTestimonials
          .filter((item: any) => item._type === 'videoTestimonial')
          .map((item: any) => ({
            _id: item._id,
            customerName: item.customerName,
            location: item.location,
            title: item.title,
            description: item.description,
            youtubeId: item.youtubeId,
            duration: item.duration,
            thumbnail: item.thumbnail,
            rating: item.rating,
            projectDetails: item.projectDetails,
            gradient: item.gradient,
            featured: item.featured || false,
            sortOrder: item.sortOrder
          }))
      };

      return NextResponse.json(
        {
          success: true,
          data: items,
          source: 'cache'
        },
        {
          headers: {
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
          }
        }
      );
    }

    // Fallback: Fetch from Sanity
    console.log('📡 Cache miss, fetching testimonials from Sanity...');
    
    const textQuery = `*[_type == "testimonial"] | order(sortOrder asc, rating desc) {
      _id,
      _type,
      customerName,
      location,
      testimonialText,
      rating,
      customerPhoto,
      projectDetails,
      gradient,
      featured,
      sortOrder
    }`;

    const videoQuery = `*[_type == "videoTestimonial"] | order(sortOrder asc) {
      _id,
      _type,
      customerName,
      location,
      title,
      description,
      youtubeId,
      duration,
      thumbnail,
      rating,
      projectDetails,
      gradient,
      featured,
      sortOrder
    }`;

    const [textTestimonials, videoTestimonials] = await Promise.all([
      client.fetch(textQuery),
      client.fetch(videoQuery)
    ]);

    // Transform data
    const transformedText = textTestimonials.map((item: any) => ({
      _id: item._id,
      _type: item._type,
      customerName: item.customerName,
      location: item.location,
      testimonialText: item.testimonialText,
      rating: item.rating,
      customerPhoto: item.customerPhoto ? {
        url: getImageUrl(item.customerPhoto, 400, 400),
        alt: item.customerName
      } : null,
      projectDetails: item.projectDetails,
      gradient: item.gradient,
      featured: item.featured || false,
      sortOrder: item.sortOrder
    }));

    const transformedVideo = videoTestimonials.map((item: any) => ({
      _id: item._id,
      _type: item._type,
      customerName: item.customerName,
      location: item.location,
      title: item.title,
      description: item.description,
      youtubeId: item.youtubeId,
      duration: item.duration,
      thumbnail: item.thumbnail ? {
        url: getImageUrl(item.thumbnail, 640, 360),
        alt: item.customerName
      } : {
        url: `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`,
        alt: item.customerName
      },
      rating: item.rating,
      projectDetails: item.projectDetails,
      gradient: item.gradient,
      featured: item.featured || false,
      sortOrder: item.sortOrder
    }));

    return NextResponse.json(
      {
        success: true,
        data: {
          textTestimonials: transformedText,
          videoTestimonials: transformedVideo
        },
        source: 'sanity'
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block'
        }
      }
    );
  } catch (error) {
    console.error('Testimonials API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials data' },
      {
        status: 500,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY'
        }
      }
    );
  }
}