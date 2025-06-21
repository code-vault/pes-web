import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

// Helper for generating image URLs
const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

// Helper to get optimized image URL
function getImageUrl(source, width = 800, height = 600) {
  return urlFor(source)
    .width(width)
    .height(height)
    .format('webp')
    .url()
}

// Export using ES modules syntax
export { client, urlFor, getImageUrl }

// For backward compatibility, also export as default
export default {
  client,
  urlFor,
  getImageUrl
}