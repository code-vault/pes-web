import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'v7cam0qp',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

async function generateTranslations() {
  console.log('🔄 Generating translations from Sanity...')
  
  try {
    // Fetch all translations from Sanity
    const translations = await client.fetch(`
      *[_type == "translation"] {
        key,
        english,
        hindi,
        category
      }
    `)

    // Build nested translation objects
    const englishTranslations = {}
    const hindiTranslations = {}

    translations.forEach(({ key, english, hindi }) => {
      setNestedProperty(englishTranslations, key, english)
      setNestedProperty(hindiTranslations, key, hindi)
    })

    // Ensure messages directory exists
    const messagesDir = join(process.cwd(), 'messages')
    if (!existsSync(messagesDir)) {
      mkdirSync(messagesDir, { recursive: true })
    }

    // Write translation files
    writeFileSync(
      join(messagesDir, 'en.json'),
      JSON.stringify(englishTranslations, null, 2)
    )

    writeFileSync(
      join(messagesDir, 'hi.json'),
      JSON.stringify(hindiTranslations, null, 2)
    )

    console.log('✅ Translations generated successfully!')
    console.log(`📄 Generated ${translations.length} translations`)

  } catch (error) {
    console.error('❌ Error generating translations:', error)
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
generateTranslations().catch(console.error)