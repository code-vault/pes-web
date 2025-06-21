'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface MediaReference {
  title: string
  type: 'image' | 'video'
  altText: string
  category: string
  url: string
  sizes?: {
    thumbnail: string
    medium: string
    large: string
    original: string
  }
}

interface MediaRefs {
  [key: string]: MediaReference | MediaRefs
}

interface MediaImageProps {
  mediaKey: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export default function MediaImage({ 
  mediaKey, 
  width = 800, 
  height = 600, 
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: MediaImageProps) {
  const [mediaRefs, setMediaRefs] = useState<MediaRefs | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/media-refs.json')
      .then(res => res.json())
      .then(data => {
        setMediaRefs(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load media references')
        setLoading(false)
        console.error('Media refs error:', err)
      })
  }, [])

  if (loading) {
    return (
      <div className={`bg-gray-200 animate-pulse ${className}`} style={{ width, height }}>
        <div className="w-full h-full bg-gray-300 rounded"></div>
      </div>
    )
  }

  if (error || !mediaRefs) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-gray-500">Image not available</span>
      </div>
    )
  }

  // Navigate to nested media reference
  const media = getNestedValue(mediaRefs, mediaKey) as MediaReference

  if (!media || media.type !== 'image') {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-gray-500">Image not found</span>
      </div>
    )
  }

  // Choose appropriate image size based on requested dimensions
  let imageUrl = media.url
  if (media.sizes) {
    if (width <= 400) imageUrl = media.sizes.thumbnail
    else if (width <= 800) imageUrl = media.sizes.medium
    else if (width <= 1200) imageUrl = media.sizes.large
    else imageUrl = media.sizes.original
  }

  return (
    <Image
      src={imageUrl}
      alt={media.altText}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      style={{ objectFit: 'cover' }}
    />
  )
}

// Helper function to get nested values from object
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}