'use client'
import { useState, useEffect } from 'react'
import { Play } from 'lucide-react'
import { client } from '@/lib/sanity'

interface MediaVideoProps {
  mediaKey: string
  fallbackSrc?: string
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
  fallbackSrc,
  width = 800, 
  height = 450,
  className = '',
  autoPlay = false,
  controls = true,
  muted = true,
  loop = false,
  poster
}: MediaVideoProps) {
  const [videoData, setVideoData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

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
        
        if (result && result.type === 'video' && result.videoUrl) {
          setVideoData(result)
        } else {
          setError('Video not found or invalid type')
        }
        
        setLoading(false)
      } catch (err) {
        console.error('Error fetching video from Sanity:', err)
        setError('Failed to load video')
        setLoading(false)
      }
    }

    fetchMedia()
  }, [mediaKey])

  if (loading) {
    return (
      <div className={`bg-gray-200 animate-pulse ${className}`} style={{ width, height }}>
        <div className="w-full h-full bg-gray-300 rounded flex items-center justify-center">
          <Play className="h-12 w-12 text-gray-400" />
        </div>
      </div>
    )
  }

  if ((error || !videoData) && fallbackSrc) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <video
          src={fallbackSrc}
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

  if (error || !videoData) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-gray-500">Video not available</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <video
        src={videoData.videoUrl}
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