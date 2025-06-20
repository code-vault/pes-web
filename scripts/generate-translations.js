import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
});

// Helper function to set nested object property
function setNestedProperty(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
}

async function generateTranslationFiles() {
  try {
    console.log('🔄 Fetching translations from Sanity...');
    
    // Fetch all translations from Sanity
    const translations = await client.fetch(`
      *[_type == "translation"] | order(key asc) {
        key,
        english,
        hindi,
        variables
      }
    `);

    console.log(`📦 Found ${translations.length} translations`);

    // Initialize translation objects
    const enTranslations = {};
    const hiTranslations = {};

    // Process each translation
    translations.forEach(({ key, english, hindi, variables }) => {
      // Process variables in text (e.g., "Hello {firstName}" -> "Hello {firstName}")
      let processedEnglish = english;
      let processedHindi = hindi;

      if (variables && variables.length > 0) {
        // Keep variables as-is for next-intl compatibility
        console.log(`📝 Key "${key}" has variables:`, variables);
      }

      // Set nested properties
      setNestedProperty(enTranslations, key, processedEnglish);
      setNestedProperty(hiTranslations, key, processedHindi);
    });

    // Ensure messages directory exists
    const messagesDir = path.join(process.cwd(), 'messages');
    if (!fs.existsSync(messagesDir)) {
      fs.mkdirSync(messagesDir, { recursive: true });
    }

    // Write translation files
    const enPath = path.join(messagesDir, 'en.json');
    const hiPath = path.join(messagesDir, 'hi.json');

    fs.writeFileSync(enPath, JSON.stringify(enTranslations, null, 2));
    fs.writeFileSync(hiPath, JSON.stringify(hiTranslations, null, 2));

    console.log('✅ Translation files generated successfully!');
    console.log(`📄 English: ${enPath}`);
    console.log(`📄 Hindi: ${hiPath}`);

    // Generate summary report
    const categories = [...new Set(translations.map(t => t.key.split('.')[0]))];
    console.log('\n📊 Translation Summary:');
    categories.forEach(category => {
      const count = translations.filter(t => t.key.startsWith(category)).length;
      console.log(`   ${category}: ${count} keys`);
    });

  } catch (error) {
    console.error('❌ Error generating translations:', error);
    process.exit(1);
  }
}

// Run the script
generateTranslationFiles();