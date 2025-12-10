'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

interface MediaImageProps {
  mediaKey: string
  fallbackSrc?: string
  fallbackAlt?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
}

export default function MediaImage({ 
  mediaKey, 
  fallbackSrc,
  fallbackAlt = 'Image',
  width = 800, 
  height = 600, 
  className = '',
  priority = false,
  quality = 75,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: MediaImageProps) {
  const [imageData, setImageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMedia() {
      try {
        // Fetch directly from Sanity in real-time
        const query = `*[_type == "mediaAsset" && key == $key][0]{
          title,
          type,
          altText,
          category,
          file,
          videoUrl
        }`
        
        const result = await client.fetch(query, { key: mediaKey })
        
        if (result && result.type === 'image' && result.file) {
          setImageData(result)
        } else {
          setError('Media not found or invalid type')
        }
        
        setLoading(false)
      } catch (err) {
        console.error('Error fetching media from Sanity:', err)
        setError('Failed to load media')
        setLoading(false)
      }
    }

    fetchMedia()
  }, [mediaKey])

  if (loading) {
    return (
      <div className={`bg-gray-200 animate-pulse ${className}`} style={{ width, height }}>
        <div className="w-full h-full bg-gray-300 rounded"></div>
      </div>
    )
  }

  if ((error || !imageData) && fallbackSrc) {
    return (
      <Image
        src={fallbackSrc}
        alt={fallbackAlt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        quality={quality}
        sizes={sizes}
        style={{ objectFit: 'cover' }}
      />
    )
  }

  if (error || !imageData) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    )
  }

  const imageUrl = builder.image(imageData.file)
    .width(width)
    .height(height)
    .format('webp')
    .quality(quality)
    .url()

  return (
    <Image
      src={imageUrl}
      alt={imageData.altText || imageData.title || fallbackAlt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      sizes={sizes}
      style={{ objectFit: 'cover' }}
    />
  )
}