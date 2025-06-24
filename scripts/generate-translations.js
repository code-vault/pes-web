import { createClient } from '@sanity/client'
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
    console.log('⚠️  .env.local file not found - using existing translations')
  }
}

// Load environment variables
loadEnvFile()

// Sanity client setup (with fallback)
let client = null

if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET) {
  client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN
  })
}

async function generateTranslations() {
  console.log('🔄 Generating translations...')
  
  // Check if we can use Sanity
  if (!client) {
    console.log('📝 Sanity not configured - keeping existing translation files')
    console.log('💡 Your existing translations will continue to work')
    
    // Verify existing translation files exist
    const messagesDir = join(process.cwd(), 'messages')
    const enPath = join(messagesDir, 'en.json')
    const hiPath = join(messagesDir, 'hi.json')
    
    if (existsSync(enPath) && existsSync(hiPath)) {
      console.log('✅ Existing translation files found and ready to use')
      return
    } else {
      console.log('❌ No translation files found')
      console.log('🔧 Either set up Sanity or ensure translation files exist')
      return
    }
  }
  
  try {
    // Test Sanity connection
    console.log('🔍 Testing Sanity connection...')
    await client.fetch('*[_type == "translation"][0..1]')
    console.log('✅ Connected to Sanity!')

    // Fetch all translations from Sanity
    const translations = await client.fetch(`
      *[_type == "translation"] {
        key,
        english,
        hindi,
        category
      }
    `)

    console.log(`📊 Found ${translations.length} translations in Sanity`)

    if (translations.length === 0) {
      console.log('📝 No translations found in Sanity')
      console.log('💡 Keeping existing translation files')
      return
    }

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

    console.log('✅ Translations generated successfully from Sanity!')
    console.log(`📄 Generated ${translations.length} translations`)

  } catch (error) {
    console.error('❌ Error fetching from Sanity:', error.message)
    console.log('📝 Keeping existing translation files')
    console.log('💡 Your website will continue to work with existing translations')
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