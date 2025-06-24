import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Purvodaya Energy Solutions',
    short_name: 'Purvodaya Solar',
    description: 'Premium solar solutions for residential, commercial, and industrial needs',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f97316',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}