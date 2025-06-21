'use client'
import { useState, useEffect } from 'react'
import { Play } from 'lucide-react'

interface MediaReference {
  title: string
  type: 'image' | 'video'
  altText: string
  category: string
  url: string
}

interface MediaRefs {
  [key: string]: MediaReference | MediaRefs
}

interface MediaVideoProps {
  mediaKey: string
  width?: number
  height?: number
  className?: string
  autoPlay?: boolean
  controls?: boolean
  muted?: boolean
  loop?: boolean
  poster?: string
}

export default function MediaVideo({ 
  mediaKey, 
  width = 800, 
  height = 450,
  className = '',
  autoPlay = false,
  controls = true,
  muted = true,
  loop = false,
  poster
}: MediaVideoProps) {
  const [mediaRefs, setMediaRefs] = useState<MediaRefs | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

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
        <div className="w-full h-full bg-gray-300 rounded flex items-center justify-center">
          <Play className="h-12 w-12 text-gray-400" />
        </div>
      </div>
    )
  }

  if (error || !mediaRefs) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-gray-500">Video not available</span>
      </div>
    )
  }

  // Navigate to nested media reference
  const media = getNestedValue(mediaRefs, mediaKey) as MediaReference

  if (!media || media.type !== 'video') {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-gray-500">Video not found</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <video
        src={media.url}
        width={width}
        height={height}
        autoPlay={autoPlay}
        controls={controls}
        muted={muted}
        loop={loop}
        poster={poster}
        className="w-full h-full object-cover rounded"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        Your browser does not support the video tag.
      </video>
      
      {!isPlaying && !autoPlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded">
          <div className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all duration-200 cursor-pointer">
            <Play className="h-8 w-8 text-gray-800 ml-1" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to get nested values from object
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}