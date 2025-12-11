// scripts/generate-testimonials-cache.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

function getImageUrl(source, width = 400, height = 400) {
  try {
    if (typeof source === 'string') {
      return source;
    }
    return builder
      .image(source)
      .width(width)
      .height(height)
      .format('webp')
      .url();
  } catch (err) {
    console.warn('Failed to generate image URL:', err);
    return null;
  }
}

async function generateTestimonialsCache() {
  console.log('🔄 Generating testimonials cache...');

  try {
    // Fetch text testimonials
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

    // Fetch video testimonials
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

    console.log('📡 Fetching testimonials from Sanity...');
    const [textTestimonials, videoTestimonials] = await Promise.all([
      client.fetch(textQuery),
      client.fetch(videoQuery)
    ]);

    console.log(`✅ Fetched ${textTestimonials.length} text testimonials`);
    console.log(`✅ Fetched ${videoTestimonials.length} video testimonials`);

    // Transform text testimonials
    const transformedText = textTestimonials.map((item) => ({
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
      gradient: item.gradient || 'from-blue-500 to-cyan-500',
      featured: item.featured || false,
      sortOrder: item.sortOrder || 999
    }));

    // Transform video testimonials
    const transformedVideo = videoTestimonials.map((item) => ({
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
      gradient: item.gradient || 'from-red-500 to-pink-500',
      featured: item.featured || false,
      sortOrder: item.sortOrder || 999
    }));

    // Combine all testimonials
    const allTestimonials = [...transformedText, ...transformedVideo];

    // Create cache object
    const cache = {
      testimonials: allTestimonials,
      generatedAt: new Date().toISOString(),
      totalCount: allTestimonials.length,
      textCount: transformedText.length,
      videoCount: transformedVideo.length
    };

    // Ensure public directory exists
    const publicDir = join(process.cwd(), 'public');
    try {
      mkdirSync(publicDir, { recursive: true });
    } catch (err) {
      // Directory already exists
    }

    // Write cache file
    const cacheFile = join(publicDir, 'testimonials-cache.json');
    writeFileSync(cacheFile, JSON.stringify(cache, null, 2));

    console.log(`✅ Cache generated successfully: ${cacheFile}`);
    console.log(`📊 Total: ${cache.totalCount} testimonials (${cache.textCount} text, ${cache.videoCount} video)`);
    console.log(`⏰ Generated at: ${cache.generatedAt}`);

    return cache;
  } catch (error) {
    console.error('❌ Error generating testimonials cache:', error);
    throw error;
  }
}

// Run the script
generateTestimonialsCache()
  .then(() => {
    console.log('✅ Testimonials cache generation complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed to generate testimonials cache:', error);
    process.exit(1);
  });