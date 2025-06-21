// purvodaya-energy-website/scripts/import-existing-translations.js
import { client } from '../lib/sanity'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

async function importExistingTranslations() {
  console.log('📥 Importing existing translations to Sanity...')
  
  try {
    // Read existing translation files
    const enPath = join(process.cwd(), 'messages', 'en.json')
    const hiPath = join(process.cwd(), 'messages', 'hi.json')
    
    if (!existsSync(enPath) || !existsSync(hiPath)) {
      throw new Error('Translation files not found. Make sure en.json and hi.json exist in messages folder.')
    }

    const englishTranslations = JSON.parse(readFileSync(enPath, 'utf8'))
    const hindiTranslations = JSON.parse(readFileSync(hiPath, 'utf8'))

    // Flatten nested objects into key-value pairs
    const flatEnglish = flattenObject(englishTranslations)
    const flatHindi = flattenObject(hindiTranslations)

    // Create translation documents
    const translationDocs = []

    Object.keys(flatEnglish).forEach(key => {
      const category = key.split('.')[0] // First part of key is category
      
      translationDocs.push({
        key,
        category,
        english: flatEnglish[key],
        hindi: flatHindi[key] || flatEnglish[key], // Fallback to English if Hindi missing
        description: `Auto-imported from existing translation files`
      })
    })

    console.log(`📊 Found ${translationDocs.length} translations to import`)

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

      // Create or replace documents
      const transaction = client.transaction()
      sanityDocs.forEach(doc => {
        transaction.createOrReplace(doc)
      })

      await transaction.commit()
      imported += batch.length
      
      console.log(`✅ Imported ${imported}/${translationDocs.length} translations`)
    }

    console.log('🎉 All translations imported successfully!')
    console.log('🔗 Access your Sanity Studio at: https://your-project-id.sanity.studio')
    
  } catch (error) {
    console.error('❌ Error importing translations:', error)
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
      // Recursively flatten nested objects
      Object.assign(flattened, flattenObject(value, newKey))
    } else if (typeof value === 'string') {
      flattened[newKey] = value
    }
  })
  
  return flattened
}

// Execute the import
importExistingTranslations().catch(console.error)