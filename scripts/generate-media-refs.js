// purvodaya-energy-website/scripts/generate-media-refs.js
import { client, getImageUrl } from '../lib/sanity'
import { writeFileSync } from 'fs'
import { join } from 'path'

async function generateMediaReferences() {
  console.log('🖼️ Generating media references from Sanity...')
  
  try {
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

    // Build media references object
    const mediaRefs = {}

    mediaAssets.forEach(({ key, title, type, file, altText, category }) => {
      const mediaData = {
        title,
        type,
        altText: altText || title,
        category,
        url: type === 'image' ? getImageUrl(file) : file.asset.url,
        // Generate multiple sizes for images
        ...(type === 'image' && {
          sizes: {
            thumbnail: getImageUrl(file, 400, 300),
            medium: getImageUrl(file, 800, 600),
            large: getImageUrl(file, 1200, 900),
            original: getImageUrl(file, 1920, 1080)
          }
        })
      }

      setNestedProperty(mediaRefs, key, mediaData)
    })

    // Write media references file
    const publicDir = join(process.cwd(), 'public')
    writeFileSync(
      join(publicDir, 'media-refs.json'),
      JSON.stringify(mediaRefs, null, 2)
    )

    console.log('✅ Media references generated successfully!')
    console.log(`🖼️ Generated ${mediaAssets.length} media references`)

  } catch (error) {
    console.error('❌ Error generating media references:', error)
    process.exit(1)
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