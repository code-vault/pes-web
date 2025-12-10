#!/usr/bin/env node
// scripts/generate-gallery-cache.js
// Generates a cached JSON file of gallery projects for fast loading
// Run: npm run generate:gallery-cache
// Or add to build: "postbuild": "node scripts/generate-gallery-cache.js"

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'

// Simple .env.local loader
function loadEnvFile() {
  const envPath = join(process.cwd(), '.env.local')
  
  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, 'utf8')
    const lines = envContent.split('\n')
    
    lines.forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '')
          process.env[key.trim()] = value.trim()
        }
      }
    })
    
    console.log('✅ Loaded environment variables from .env.local')
  } else {
    console.log('⚠️  .env.local file not found')
    console.log('📝 Create .env.local with your Sanity credentials')
  }
}

loadEnvFile()

// Validate Sanity credentials
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.log('⚠️  Sanity credentials not configured')
  console.log('📝 Gallery cache requires Sanity setup')
  console.log('🔄 Skipping gallery cache generation...')
  
  // Create empty cache file
  const cacheDir = join(process.cwd(), 'public')
  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true })
  }
  
  writeFileSync(
    join(cacheDir, 'gallery-cache.json'),
    JSON.stringify({
      "_info": "Gallery cache not available - Sanity credentials missing",
      "_generated": new Date().toISOString(),
      "projects": []
    }, null, 2)
  )
  
  console.log('✅ Created empty gallery-cache.json file')
  process.exit(0)
}

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // Use API version for freshest data
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

const builder = imageUrlBuilder(client)

function getImageUrl(source, width = 400, height = 300) {
  try {
    if (typeof source === 'string') {
      // External URL
      return source
    } else {
      // Sanity image object
      return builder
        .image(source)
        .width(width)
        .height(height)
        .format('webp')
        .url()
    }
  } catch (err) {
    console.warn('Failed to generate image URL:', err.message)
    return null
  }
}

async function generateGalleryCache() {
  console.log('🖼️  Generating gallery cache from Sanity...')
  
  try {
    // Test connection
    console.log('🔍 Testing Sanity connection...')
    await client.fetch('*[_type == "galleryProject"][0..1]')
    console.log('✅ Connected to Sanity!')

    // Fetch all gallery projects
    console.log('📦 Fetching gallery projects...')
    const projects = await client.fetch(`
      *[_type == "galleryProject"] | order(sortOrder asc) {
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
      }
    `)

    console.log(`✅ Fetched ${projects.length} projects from Sanity`)

    // Transform projects with cached image URLs
    const cachedProjects = projects.map(project => {
      const transformed = {
        _id: project._id,
        title: project.title,
        category: project.category,
        mediaType: project.mediaType,
        featured: project.featured || false
      }

      // Generate image URLs and cache them
      if (project.mediaType === 'imageGallery' && project.images?.length > 0) {
        transformed.images = project.images.map(img => ({
          image: getImageUrl(img.image, 800, 600), // Full size
          thumbnail: getImageUrl(img.image, 400, 300), // Thumbnail
          alt: img.alt || '',
          caption: img.caption || ''
        }))
      }

      if (project.mediaType === 'video' && project.video) {
        transformed.video = {
          url: project.video.asset?.url || null
        }
        if (project.videoThumbnail) {
          transformed.videoThumbnail = getImageUrl(project.videoThumbnail, 400, 300)
        }
      }

      if (project.description) {
        transformed.description = project.description
      }

      if (project.specifications) {
        transformed.specifications = project.specifications
      }

      return transformed
    })

    // Save to public/gallery-cache.json
    const cacheDir = join(process.cwd(), 'public')
    if (!existsSync(cacheDir)) {
      mkdirSync(cacheDir, { recursive: true })
    }

    const cacheFile = join(cacheDir, 'gallery-cache.json')
    const cacheData = {
      "_info": "Gallery cache - generated from Sanity",
      "_generated": new Date().toISOString(),
      "_ttl": "Cache is valid for 24 hours. Regenerate to get latest changes.",
      "projects": cachedProjects
    }

    writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2))
    console.log(`✅ Gallery cache saved to ${cacheFile}`)
    console.log(`📊 Cache contains ${cachedProjects.length} projects with pre-generated image URLs`)
    console.log('💡 To update: Run "npm run generate:gallery-cache" again')

  } catch (error) {
    console.error('❌ Error generating gallery cache:', error.message)
    
    // Create error cache file
    const cacheDir = join(process.cwd(), 'public')
    if (!existsSync(cacheDir)) {
      mkdirSync(cacheDir, { recursive: true })
    }

    const errorCache = {
      "_info": "Gallery cache generation failed",
      "_error": error.message,
      "_generated": new Date().toISOString(),
      "projects": []
    }

    writeFileSync(
      join(cacheDir, 'gallery-cache.json'),
      JSON.stringify(errorCache, null, 2)
    )

    console.log('✅ Created error cache file')
    process.exit(1)
  }
}

generateGalleryCache()
