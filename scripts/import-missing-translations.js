import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables
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
  }
}

loadEnvFile()

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

async function importMissingTranslations() {
  console.log('📥 Importing missing translation keys to Sanity...')
  
  try {
    // Read current translation files
    const enPath = join(process.cwd(), 'messages', 'en.json')
    const hiPath = join(process.cwd(), 'messages', 'hi.json')
    
    if (!existsSync(enPath) || !existsSync(hiPath)) {
      throw new Error('Translation files not found!')
    }

    const englishTranslations = JSON.parse(readFileSync(enPath, 'utf8'))
    const hindiTranslations = JSON.parse(readFileSync(hiPath, 'utf8'))

    // Flatten nested objects into key-value pairs
    const flatEnglish = flattenObject(englishTranslations)
    const flatHindi = flattenObject(hindiTranslations)

    // Create translation documents for missing keys
    const missingKeys = [
      // Contact form steps
      'contact.form.steps.0.title',
      'contact.form.steps.1.title',
      'contact.form.steps.2.title',
      
      // Gallery projects
      'galleryPage.projects.0.title',
      'galleryPage.projects.1.title',
      'galleryPage.projects.2.title',
      'galleryPage.projects.3.title',
      'galleryPage.projects.4.title',
      'galleryPage.projects.5.title',
      
      // Additional gallery projects
      ...Array.from({ length: 12 }, (_, i) => `galleryPage.additionalProjects.${i}.title`),
      ...Array.from({ length: 12 }, (_, i) => `galleryPage.additionalProjects.${i}.category`),
      
      // Testimonials reviews
      'testimonials.reviews.0.name',
      'testimonials.reviews.0.location',
      'testimonials.reviews.0.text',
      'testimonials.reviews.0.project',
      'testimonials.reviews.0.savings',
      'testimonials.reviews.1.name',
      'testimonials.reviews.1.location',
      'testimonials.reviews.1.text',
      'testimonials.reviews.1.project',
      'testimonials.reviews.1.savings',
      'testimonials.reviews.2.name',
      'testimonials.reviews.2.location',
      'testimonials.reviews.2.text',
      'testimonials.reviews.2.project',
      'testimonials.reviews.2.savings'
    ]

    const translationDocs = []

    missingKeys.forEach(key => {
      if (flatEnglish[key] && flatHindi[key]) {
        const category = key.split('.')[0]
        
        translationDocs.push({
          key,
          category,
          english: flatEnglish[key],
          hindi: flatHindi[key],
          description: `Missing translation key - auto-imported`
        })
      }
    })

    console.log(`📊 Found ${translationDocs.length} missing translations to import`)

    if (translationDocs.length === 0) {
      console.log('✅ No missing translations found - all keys exist!')
      return
    }

    // Batch import to Sanity
    const batchSize = 50
    let imported = 0

    for (let i = 0; i < translationDocs.length; i += batchSize) {
      const batch = translationDocs.slice(i, i + batchSize)
      
      const sanityDocs = batch.map(doc => ({
        _type: 'translation',
        _id: `translation-${doc.key.replace(/\./g, '-')}`,
        ...doc
      }))

      console.log(`📤 Importing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(translationDocs.length/batchSize)}...`)

      const transaction = client.transaction()
      sanityDocs.forEach(doc => {
        transaction.createOrReplace(doc)
      })

      await transaction.commit()
      imported += batch.length
      
      console.log(`✅ Progress: ${imported}/${translationDocs.length} translations imported`)
    }

    console.log('\n🎉 SUCCESS! All missing translations imported to Sanity!')
    console.log('🔗 Now run: npm run generate-translations')
    
  } catch (error) {
    console.error('❌ Error importing missing translations:', error.message)
    process.exit(1)
  }
}

// Helper function to flatten nested objects
function flattenObject(obj, prefix = '') {
  const flattened = {}
  
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    const newKey = prefix ? `${prefix}.${key}` : key
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value, newKey))
    } else if (typeof value === 'string') {
      flattened[newKey] = value
    }
  })
  
  return flattened
}

// Execute the import
importMissingTranslations().catch(console.error)
