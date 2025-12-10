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

// Rate limiting map (in-memory, suitable for single-instance deployments)
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
    return false; // Rate limit exceeded
  }

  record.count++;
  return true;
}

// Try to load gallery cache from public folder
function loadGalleryCache() {
  try {
    const cacheFile = join(process.cwd(), 'public', 'gallery-cache.json');
    
    if (existsSync(cacheFile)) {
      const cacheContent = readFileSync(cacheFile, 'utf-8');
      const cache = JSON.parse(cacheContent);
      
      // Check if cache has valid data
      if (cache.projects && Array.isArray(cache.projects) && cache.projects.length > 0) {
        console.log(`📦 Using cached gallery data (${cache.projects.length} projects)`);
        return cache.projects;
      }
    }
  } catch (err) {
    console.warn('Failed to load gallery cache:', err);
  }
  
  return null;
}

function getImageUrl(source: any, width = 400, height = 300) {
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
    // First, try to use cached gallery data (fastest - minimal transformation)
    const cachedProjects = loadGalleryCache();
    
    if (cachedProjects) {
      // Transform cached data to gallery format (thumbnails already generated, just flatten text)
      const items = cachedProjects
        .filter((item: any) => {
          return (item.mediaType === 'imageGallery' && item.images?.length > 0) || 
                 (item.mediaType === 'video' && item.video);
        })
        .map((item: any) => {
          if (item.mediaType === 'imageGallery' && item.images) {
            const firstImage = item.images[0];
            return {
              type: 'imageGallery' as const,
              id: item._id,
              images: item.images,
              thumbnail: firstImage?.thumbnail || firstImage?.image,
              altText: (firstImage?.alt || '') || (typeof item.title === 'string' ? item.title : item.title?.english) || 'Gallery image',
              title: typeof item.title === 'string' ? item.title : item.title?.english || 'Untitled',
              category: item.category,
              description: typeof item.description === 'string' ? item.description : item.description?.english,
              specifications: item.specifications,
              featured: item.featured || false
            };
          } else if (item.mediaType === 'video' && item.video) {
            return {
              type: 'video' as const,
              id: item._id,
              src: item.video?.url,
              thumbnail: item.videoThumbnail,
              altText: 'Project video',
              title: typeof item.title === 'string' ? item.title : item.title?.english || 'Untitled',
              category: item.category,
              description: typeof item.description === 'string' ? item.description : item.description?.english,
              specifications: item.specifications,
              featured: item.featured || false
            };
          }
          return null;
        })
        .filter(Boolean);

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

    // Fallback: Fetch from Sanity and transform
    console.log('📡 Cache miss, fetching from Sanity...');
    
    const query = `*[_type == "galleryProject"] | order(sortOrder asc) {
      _id,
      title,
      category,
      mediaType,
      images,
      video,
      videoThumbnail,
      description,
      specifications,
      featured
    }`;

    const results = await client.fetch(query);

    // Transform on the fly
    const items = results
      .filter((item: any) => {
        return (item.mediaType === 'imageGallery' && item.images?.length > 0) || 
               (item.mediaType === 'video' && item.video);
      })
      .map((item: any) => {
        if (item.mediaType === 'imageGallery' && item.images) {
          const firstImage = item.images[0];
          let thumbnailUrl = null;
          
          if (firstImage?.image) {
            if (typeof firstImage.image === 'string') {
              thumbnailUrl = firstImage.image;
            } else {
              thumbnailUrl = getImageUrl(firstImage.image, 400, 300);
            }
          }
          
          return {
            type: 'imageGallery' as const,
            id: item._id,
            images: item.images,
            thumbnail: thumbnailUrl,
            altText: firstImage?.alt || item.title || 'Gallery image',
            title: item.title?.english || item.title,
            category: item.category,
            description: item.description?.english || item.description,
            specifications: item.specifications,
            featured: item.featured || false
          };
        } else if (item.mediaType === 'video' && item.video) {
          return {
            type: 'video' as const,
            id: item._id,
            src: item.video?.asset?.url,
            thumbnail: item.videoThumbnail ? getImageUrl(item.videoThumbnail, 400, 300) : null,
            altText: 'Project video',
            title: item.title?.english || item.title,
            category: item.category,
            description: item.description?.english || item.description,
            specifications: item.specifications,
            featured: item.featured || false
          };
        }
        return null;
      })
      .filter(Boolean);

    return NextResponse.json(
      {
        success: true,
      data: items,
        source: 'cache'
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
    console.error('Gallery API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery data' },
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
