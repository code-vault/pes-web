// scripts/import-existing-translations.js
import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'fs'
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
  }
}

// Load environment variables
loadEnvFile()

// Debug: Check environment variables
console.log('\n🔍 Environment Variables Check:')
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✅ Found' : '❌ Missing')
console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET ? '✅ Found' : '❌ Missing')
console.log('SANITY_API_TOKEN:', process.env.SANITY_API_TOKEN ? '✅ Found' : '❌ Missing')

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('\n❌ ERROR: Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  console.log('\n👉 SOLUTION: Create a .env.local file in your project root:')
  console.log('```')
  console.log('NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id')
  console.log('NEXT_PUBLIC_SANITY_DATASET=production')
  console.log('SANITY_API_TOKEN=your-sanity-api-token')
  console.log('```')
  console.log('\n📚 Need help? Follow these steps:')
  console.log('1. Go to https://sanity.io/manage')
  console.log('2. Create or select your project')
  console.log('3. Copy the Project ID from the dashboard')
  console.log('4. Go to API tab → Create API Token with Editor permissions')
  console.log('5. Create .env.local file with the values above')
  process.exit(1)
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.error('\n❌ ERROR: Missing NEXT_PUBLIC_SANITY_DATASET')
  console.log('👉 Add this to your .env.local file:')
  console.log('   NEXT_PUBLIC_SANITY_DATASET=production')
  process.exit(1)
}

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || undefined
})

console.log('\n🔧 Sanity Client Configuration:')
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
console.log('API Token:', process.env.SANITY_API_TOKEN ? '✅ Configured' : '⚠️  Not configured (read-only mode)')

async function importExistingTranslations() {
  console.log('\n📥 Starting translation import...')
  
  try {
    // Test Sanity connection first
    console.log('🔍 Testing Sanity connection...')
    const testQuery = '*[_type == "translation"][0..1]'
    await client.fetch(testQuery)
    console.log('✅ Sanity connection successful!')

    // Read existing translation files
    const enPath = join(process.cwd(), 'messages', 'en.json')
    const hiPath = join(process.cwd(), 'messages', 'hi.json')
    
    console.log('\n📖 Looking for translation files...')
    console.log('English file:', existsSync(enPath) ? '✅ Found' : '❌ Missing')
    console.log('Hindi file:', existsSync(hiPath) ? '✅ Found' : '❌ Missing')
    
    if (!existsSync(enPath) || !existsSync(hiPath)) {
      throw new Error(`
❌ Translation files not found!

Expected files:
- ${enPath}
- ${hiPath}

Make sure these files exist before running the import.
      `)
    }

    const englishTranslations = JSON.parse(readFileSync(enPath, 'utf8'))
    const hindiTranslations = JSON.parse(readFileSync(hiPath, 'utf8'))

    // Flatten nested objects into key-value pairs
    const flatEnglish = flattenObject(englishTranslations)
    const flatHindi = flattenObject(hindiTranslations)

    // Create translation documents
    const translationDocs = []

    Object.keys(flatEnglish).forEach(key => {
      const category = key.split('.')[0]
      
      translationDocs.push({
        key,
        category,
        english: flatEnglish[key],
        hindi: flatHindi[key] || flatEnglish[key],
        description: `Auto-imported from existing translation files`
      })
    })

    console.log(`\n📊 Found ${translationDocs.length} translations to import`)

    // Check if we have write permissions
    if (!process.env.SANITY_API_TOKEN) {
      console.log('\n⚠️  WARNING: No API token provided')
      console.log('Running in read-only mode. To import translations, you need:')
      console.log('1. Create an API token in your Sanity dashboard with Editor permissions')
      console.log('2. Add SANITY_API_TOKEN=your-token to your .env.local file')
      console.log('3. Re-run this script')
      return
    }

    // Batch import to Sanity
    const batchSize = 50
    let imported = 0

    console.log('\n📤 Starting import process...')

    for (let i = 0; i < translationDocs.length; i += batchSize) {
      const batch = translationDocs.slice(i, i + batchSize)
      
      const sanityDocs = batch.map(doc => ({
        _type: 'translation',
        _id: `translation-${doc.key.replace(/\./g, '-')}`,
        ...doc
      }))

      console.log(`📤 Importing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(translationDocs.length/batchSize)}...`)

      // Create or replace documents
      const transaction = client.transaction()
      sanityDocs.forEach(doc => {
        transaction.createOrReplace(doc)
      })

      await transaction.commit()
      imported += batch.length
      
      console.log(`✅ Progress: ${imported}/${translationDocs.length} translations imported`)
    }

    console.log('\n🎉 SUCCESS! All translations imported successfully!')
    console.log(`🔗 Access your Sanity Studio at: https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.sanity.studio`)
    console.log('\n📝 Next steps:')
    console.log('1. Visit your Sanity Studio to verify the translations')
    console.log('2. Set up webhooks to auto-sync changes')
    console.log('3. Run "npm run generate-translations" to pull updates')
    
  } catch (error) {
    console.error('\n❌ Error importing translations:', error.message)
    
    if (error.message.includes('Unauthorized')) {
      console.log('\n🔑 Authentication Issue:')
      console.log('- Check your SANITY_API_TOKEN in .env.local')
      console.log('- Make sure the token has Editor or Admin permissions')
      console.log('- Verify the token is not expired')
    }
    
    if (error.message.includes('projectId')) {
      console.log('\n🔧 Configuration Issue:')
      console.log('- Check your NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
      console.log('- Verify the project ID is correct')
      console.log('- Make sure .env.local file exists in project root')
    }
    
    console.log('\n🆘 Need help?')
    console.log('1. Verify your .env.local file exists and has correct values')
    console.log('2. Check your Sanity project settings')
    console.log('3. Or skip Sanity for now and continue with static translations')
    
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
importExistingTranslations().catch(console.error)