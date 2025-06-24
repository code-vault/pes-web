// scripts/generate-media-refs.js
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'

// Simple .env.local loader (no dependencies needed)
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
          const value = valueParts.join('=').replace(/^["']|["']$/g, '') // Remove quotes
          process.env[key.trim()] = value.trim()
        }
      }
    })
    
    console.log('✅ Loaded environment variables from .env.local')
  } else {
    console.log('⚠️  .env.local file not found')
    console.log('📝 Create .env.local with your Sanity credentials to use media references')
    console.log('🔄 For now, skipping media references generation...')
    process.exit(0)
  }
}

// Load environment variables
loadEnvFile()

// Validate Sanity credentials
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.log('⚠️  Sanity credentials not configured')
  console.log('📝 Media references require Sanity setup')
  console.log('💡 Your website works fine without media references')
  console.log('🔄 Skipping media references generation...')
  
  // Create empty media refs file for development
  const mediaRefs = {
    "_info": "Media references not configured - using fallback",
    "_note": "Add Sanity credentials to use dynamic media",
    "_generated": new Date().toISOString()
  }
  
  const publicDir = join(process.cwd(), 'public')
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true })
  }
  
  writeFileSync(
    join(publicDir, 'media-refs.json'),
    JSON.stringify(mediaRefs, null, 2)
  )
  
  console.log('✅ Created fallback media-refs.json file')
  process.exit(0)
}

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

// Helper for generating image URLs
const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

function getImageUrl(source, width = 800, height = 600) {
  return urlFor(source)
    .width(width)
    .height(height)
    .format('webp')
    .url()
}

async function generateMediaReferences() {
  console.log('🖼️ Generating media references from Sanity...')
  
  try {
    // Test connection first
    console.log('🔍 Testing Sanity connection...')
    await client.fetch('*[_type == "mediaAsset"][0..1]')
    console.log('✅ Connected to Sanity!')

    // Fetch all media assets from Sanity
    const mediaAssets = await client.fetch(`
      *[_type == "mediaAsset"] {
        key,
        title,
        type,
        file,
        altText,
        category
      }
    `)

    console.log(`📊 Found ${mediaAssets.length} media assets`)

    if (mediaAssets.length === 0) {
      console.log('📝 No media assets found in Sanity')
      console.log('💡 To use media references:')
      console.log('1. Create "mediaAsset" documents in your Sanity Studio')
      console.log('2. Add images/videos with proper schema')
      console.log('3. Re-run this script')
      
      // Create empty media refs file
      const mediaRefs = {
        "_info": "No media assets found. Add media to Sanity and regenerate.",
        "_generated": new Date().toISOString()
      }
      
      const publicDir = join(process.cwd(), 'public')
      if (!existsSync(publicDir)) {
        mkdirSync(publicDir, { recursive: true })
      }
      
      writeFileSync(
        join(publicDir, 'media-refs.json'),
        JSON.stringify(mediaRefs, null, 2)
      )
      
      console.log('✅ Created empty media-refs.json file')
      return
    }

    // Build media references object
    const mediaRefs = {
      "_info": "Generated media references from Sanity",
      "_generated": new Date().toISOString(),
      "_count": mediaAssets.length
    }

    mediaAssets.forEach(({ key, title, type, file, altText, category }) => {
      if (!key || !file) {
        console.log(`⚠️  Skipping asset without key or file: ${title}`)
        return
      }

      const mediaData = {
        title: title || 'Untitled',
        type: type || 'image',
        altText: altText || title || 'Media asset',
        category: category || 'general'
      }

      if (type === 'image' && file) {
        mediaData.url = getImageUrl(file)
        mediaData.sizes = {
          thumbnail: getImageUrl(file, 400, 300),
          medium: getImageUrl(file, 800, 600),
          large: getImageUrl(file, 1200, 900),
          original: getImageUrl(file, 1920, 1080)
        }
      } else if (type === 'video' && file?.asset?.url) {
        mediaData.url = file.asset.url
      } else {
        console.log(`⚠️  Skipping asset with invalid file structure: ${title}`)
        return
      }

      setNestedProperty(mediaRefs, key, mediaData)
    })

    // Ensure public directory exists
    const publicDir = join(process.cwd(), 'public')
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true })
    }

    // Write media references file
    writeFileSync(
      join(publicDir, 'media-refs.json'),
      JSON.stringify(mediaRefs, null, 2)
    )

    console.log('✅ Media references generated successfully!')
    console.log(`🖼️ Generated ${mediaAssets.length} media references`)
    console.log(`📁 Saved to: public/media-refs.json`)
    console.log('\n💡 Usage in components:')
    console.log('import MediaImage from "@/components/MediaImage"')
    console.log('<MediaImage mediaKey="hero.mainImage" width={800} height={600} />')

  } catch (error) {
    console.error('❌ Error generating media references:', error.message)
    
    if (error.message.includes('mediaAsset')) {
      console.log('\n📝 Media Asset Schema Missing:')
      console.log('It looks like you don\'t have mediaAsset documents in Sanity.')
      console.log('This is optional - your website works fine without media references.')
      console.log('\nTo set up media assets:')
      console.log('1. Create mediaAsset schema in Sanity Studio')
      console.log('2. Add media documents with key, title, type, and file fields')
      console.log('3. Re-run this script')
    }
    
    // Create fallback empty file
    try {
      const publicDir = join(process.cwd(), 'public')
      if (!existsSync(publicDir)) {
        mkdirSync(publicDir, { recursive: true })
      }
      
      const fallbackRefs = {
        "_info": "Media references unavailable - using fallback",
        "_error": error.message,
        "_generated": new Date().toISOString()
      }
      
      writeFileSync(
        join(publicDir, 'media-refs.json'),
        JSON.stringify(fallbackRefs, null, 2)
      )
      
      console.log('✅ Created fallback media-refs.json file')
    } catch (writeError) {
      console.error('❌ Could not create fallback file:', writeError.message)
    }
  }
}

// Helper function to set nested object properties
function setNestedProperty(obj, path, value) {
  const keys = path.split('.')
  const lastKey = keys.pop()
  
  if (!lastKey) return
  
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {}
    return current[key]
  }, obj)
  
  target[lastKey] = value
}

// Execute the function
generateMediaReferences().catch(console.error)