import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01'
});

async function validateTranslations() {
  const translations = await client.fetch(`
    *[_type == "translation"] {
      key,
      english,
      hindi,
      variables
    }
  `);

  const issues = [];

  translations.forEach(({ key, english, hindi, variables }) => {
    // Check for missing translations
    if (!english?.trim()) {
      issues.push(`❌ Missing English translation for: ${key}`);
    }
    if (!hindi?.trim()) {
      issues.push(`❌ Missing Hindi translation for: ${key}`);
    }

    // Check for variable consistency
    if (variables && variables.length > 0) {
      variables.forEach(variable => {
        const varPattern = `{${variable}}`;
        if (english && !english.includes(varPattern)) {
          issues.push(`⚠️  Variable {${variable}} missing in English: ${key}`);
        }
        if (hindi && !hindi.includes(varPattern)) {
          issues.push(`⚠️  Variable {${variable}} missing in Hindi: ${key}`);
        }
      });
    }

    // Check for length discrepancies (Hindi might be longer)
    if (english && hindi && Math.abs(english.length - hindi.length) > 100) {
      issues.push(`📏 Large length difference in: ${key}`);
    }
  });

  if (issues.length === 0) {
    console.log('✅ All translations are valid!');
  } else {
    console.log('🚨 Translation Issues Found:');
    issues.forEach(issue => console.log(issue));
  }

  return issues.length === 0;
}

validateTranslations();
