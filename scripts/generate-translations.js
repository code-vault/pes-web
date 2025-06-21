// Change this line:
// import { client } from '../lib/sanity'

// To this:
const { client } = require('../lib/sanity.js')

// Also change the rest of the file to use CommonJS:
const fs = require('fs')
const path = require('path')

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
    const messagesDir = path.join(process.cwd(), 'messages')
    if (!fs.existsSync(messagesDir)) {
      fs.mkdirSync(messagesDir, { recursive: true })
    }

    // Write translation files
    fs.writeFileSync(
      path.join(messagesDir, 'en.json'),
      JSON.stringify(englishTranslations, null, 2)
    )

    fs.writeFileSync(
      path.join(messagesDir, 'hi.json'),
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