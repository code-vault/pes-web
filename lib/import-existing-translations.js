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

// Helper to flatten nested objects
function flattenObject(obj, prefix = '') {
  const flattened = {};
  
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      flattened[newKey] = value;
    }
  }
  
  return flattened;
}

async function importExistingTranslations() {
  try {
    // Read existing translation files
    const enPath = path.join(process.cwd(), 'messages', 'en.json');
    const hiPath = path.join(process.cwd(), 'messages', 'hi.json');
    
    const enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const hiTranslations = JSON.parse(fs.readFileSync(hiPath, 'utf8'));
    
    // Flatten the objects
    const flatEnglish = flattenObject(enTranslations);
    const flatHindi = flattenObject(hiTranslations);
    
    console.log(`📦 Found ${Object.keys(flatEnglish).length} translation keys`);
    
    // Create documents for Sanity
    const documents = [];
    
    for (const key in flatEnglish) {
      if (flatHindi[key]) {
        const category = key.split('.')[0];
        
        documents.push({
          _type: 'translation',
          _id: `translation-${key.replace(/\./g, '-')}`,
          key,
          category,
          english: flatEnglish[key],
          hindi: flatHindi[key],
          context: `Imported from existing translation files`
        });
      }
    }
    
    console.log(`🔄 Uploading ${documents.length} translations to Sanity...`);
    
    // Batch upload to Sanity
    const transaction = client.transaction();
    documents.forEach(doc => transaction.createOrReplace(doc));
    
    await transaction.commit();
    
    console.log('✅ All translations imported successfully!');
    
  } catch (error) {
    console.error('❌ Error importing translations:', error);
  }
}

// Run with: node lib/import-existing-translations.js
importExistingTranslations();