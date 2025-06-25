// 🚀 BULLETPROOF TRANSLATION KEY EXTRACTOR
// This script scans your entire codebase and extracts ALL translation keys
// Save this as: scripts/extract-translation-keys.js

import { existsSync, readdirSync, statSync, readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';

// Configuration
const CONFIG = {
  // Directories to scan for translation keys
  scanDirs: [
    'app',
    'components', 
    'pages',
    'src'
  ],
  // File extensions to scan
  extensions: ['.tsx', '.ts', '.jsx', '.js'],
  // Translation patterns to look for
  patterns: [
    // useTranslations('namespace')
    /useTranslations\(['"`]([^'"`]+)['"`]\)/g,
    // t('key') or t(`key`)
    /\bt\(['"`]([^'"`]+)['"`]\)/g,
    // t("key") with various quote types
    /\bt\(["'`]([^"'`]+)["'`]/g,
    // getTranslations('namespace')
    /getTranslations\(['"`]([^'"`]+)['"`]\)/g,
  ],
  // Output files
  outputFiles: {
    en: 'messages/en.json',
    hi: 'messages/hi.json'
  }
};

class TranslationKeyExtractor {
  constructor() {
    this.foundKeys = new Set();
    this.namespaces = new Set();
    this.keyStructure = {};
  }

  // Main extraction function
  async extractAllKeys() {
    console.log('🔍 Scanning codebase for translation keys...');
    
    for (const dir of CONFIG.scanDirs) {
      if (existsSync(dir)) {
        await this.scanDirectory(dir);
      }
    }
    
    console.log(`✅ Found ${this.foundKeys.size} unique translation keys`);
    console.log(`📁 Found ${this.namespaces.size} namespaces`);
    
    return this.buildTranslationStructure();
  }

  // Recursively scan directory
  async scanDirectory(dirPath) {
    const items = readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and .next directories
        if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(item)) {
          await this.scanDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        // Check if file has valid extension
        if (CONFIG.extensions.some(ext => fullPath.endsWith(ext))) {
          await this.scanFile(fullPath);
        }
      }
    }
  }

  // Scan individual file for translation keys
  async scanFile(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      console.log(`📄 Scanning: ${filePath}`);
      
      // Extract namespace usage patterns
      this.extractNamespaces(content);
      
      // Extract translation key usage patterns
      this.extractTranslationKeys(content);
      
    } catch (error) {
      console.warn(`⚠️  Could not read file: ${filePath}`, error.message);
    }
  }

  // Extract namespaces from useTranslations('namespace') calls
  extractNamespaces(content) {
    const namespacePattern = /useTranslations\(['"`]([^'"`]+)['"`]\)/g;
    let match;
    
    while ((match = namespacePattern.exec(content)) !== null) {
      const namespace = match[1];
      this.namespaces.add(namespace);
      console.log(`📝 Found namespace: ${namespace}`);
    }
  }

  // Extract translation keys from t('key') calls
  extractTranslationKeys(content) {
    for (const pattern of CONFIG.patterns) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);
      
      while ((match = regex.exec(content)) !== null) {
        const key = match[1];
        if (key && !key.includes('${') && !key.includes('`')) {
          this.foundKeys.add(key);
          console.log(`🔑 Found key: ${key}`);
        }
      }
    }
  }

  // Build nested structure from flat keys
  buildTranslationStructure() {
    const structure = {};
    
    // Convert flat keys to nested structure
    for (const key of this.foundKeys) {
      this.setNestedValue(structure, key, this.generatePlaceholderText(key));
    }
    
    // Add common structures based on found namespaces
    for (const namespace of this.namespaces) {
      if (!structure[namespace]) {
        structure[namespace] = {};
      }
    }
    
    return structure;
  }

  // Set nested value in object using dot notation
  setNestedValue(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[keys[keys.length - 1]] = value;
  }

  // Generate placeholder text for keys
  generatePlaceholderText(key) {
    // Convert camelCase/kebab-case to readable text
    return key
      .split('.')
      .pop() // Get last part of the key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
      .replace(/^\w/, c => c.toUpperCase()) // Capitalize first letter
      .trim();
  }
}

// Enhanced structure builder for common patterns
class StructureEnhancer {
  static enhance(baseStructure) {
    const enhanced = { ...baseStructure };
    
    // Add common page structures
    const commonPages = ['about', 'services', 'gallery', 'testimonials', 'contact', 'faq'];
    commonPages.forEach(page => {
      if (!enhanced[`${page}Page`]) {
        enhanced[`${page}Page`] = {
          title: `${page.charAt(0).toUpperCase() + page.slice(1)} Page`,
          subtitle: `Welcome to our ${page} page`,
          backToHome: 'Back to Home'
        };
      }
    });

    // Add common component structures
    if (!enhanced.header) {
      enhanced.header = {
        companyName: 'Purvodaya Energy Solutions',
        home: 'Home',
        about: 'About',
        services: 'Services',
        contact: 'Contact',
        getQuote: 'Get Free Quote'
      };
    }

    if (!enhanced.footer) {
      enhanced.footer = {
        copyright: '© 2024 Purvodaya Energy Solutions. All rights reserved.',
        contact: {
          phone: '+91 98765 43210',
          email: 'info@purvodayaenergy.com'
        }
      };
    }

    return enhanced;
  }
}

// Main execution function
async function main() {
  try {
    console.log('🚀 Starting Translation Key Extraction...\n');
    
    const extractor = new TranslationKeyExtractor();
    const extractedStructure = await extractor.extractAllKeys();
    
    // Enhance with common patterns
    const enhancedStructure = StructureEnhancer.enhance(extractedStructure);
    
    // Generate files
    await generateTranslationFiles(enhancedStructure);
    
    console.log('\n✅ Translation extraction completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   • Keys found: ${extractor.foundKeys.size}`);
    console.log(`   • Namespaces: ${extractor.namespaces.size}`);
    console.log(`   • Files generated: ${Object.keys(CONFIG.outputFiles).length}`);
    
  } catch (error) {
    console.error('❌ Error during extraction:', error);
    process.exit(1);
  }
}

// Generate translation files
async function generateTranslationFiles(structure) {
  console.log('\n📝 Generating translation files...');
  
  // Ensure messages directory exists
  const messagesDir = dirname(CONFIG.outputFiles.en);
  if (!existsSync(messagesDir)) {
    mkdirSync(messagesDir, { recursive: true });
  }
  
  // Generate English file
  const enContent = JSON.stringify(structure, null, 2);
  writeFileSync(CONFIG.outputFiles.en, enContent);
  console.log(`✅ Generated: ${CONFIG.outputFiles.en}`);
  
  // Generate Hindi file (copy structure with Hindi placeholders)
  const hiStructure = translateStructureToHindi(structure);
  const hiContent = JSON.stringify(hiStructure, null, 2);
  writeFileSync(CONFIG.outputFiles.hi, hiContent);
  console.log(`✅ Generated: ${CONFIG.outputFiles.hi}`);
}

// Translate structure to Hindi (placeholder function)
function translateStructureToHindi(structure) {
  // For now, copy the English structure
  // In a real implementation, you'd integrate with a translation service
  return JSON.parse(JSON.stringify(structure));
}

// Add missing key checker
class MissingKeyChecker {
  static checkMissingKeys(extractedKeys, existingTranslations) {
    const missing = [];
    
    for (const key of extractedKeys) {
      if (!this.hasNestedKey(existingTranslations, key)) {
        missing.push(key);
      }
    }
    
    return missing;
  }
  
  static hasNestedKey(obj, key) {
    const keys = key.split('.');
    let current = obj;
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return false;
      }
    }
    
    return true;
  }
}

// Export for use in other scripts
export default {
  TranslationKeyExtractor,
  StructureEnhancer,
  MissingKeyChecker,
  CONFIG
};

// Run if called directly
// if (require.main === module) {

// }

if (import.meta.url.endsWith(process.argv[1])) {
    main();
}