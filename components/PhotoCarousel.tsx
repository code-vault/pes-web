'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/lib/sanity'

const builder = imageUrlBuilder(client)

interface ProjectImage {
  image: any
  alt?: string
  caption?: string
}

interface PhotoCarouselProps {
  images: ProjectImage[]
  title: string
  onClose: () => void
}

export default function PhotoCarousel({ images, title, onClose }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const currentImage = images[currentIndex]
  
  // Handle both Sanity images and external URLs
  let imageUrl = ''
  try {
    if (typeof currentImage.image === 'string') {
      // External URL
      imageUrl = currentImage.image
    } else if (currentImage.image?.asset?.url) {
      // External URL in object format
      imageUrl = currentImage.image.asset.url
    } else {
      // Sanity image object
      imageUrl = builder
        .image(currentImage.image)
        .width(1200)
        .height(800)
        .fit('max')
        .format('webp')
        .url()
    }
  } catch (err) {
    console.warn('Failed to process carousel image:', err)
    imageUrl = '' // Fallback empty URL
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === 'Escape') onClose()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length])

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        aria-label="Close carousel"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Main Image Container */}
      <div className="flex-1 flex items-center justify-center max-w-4xl w-full relative">
        <Image
          src={imageUrl}
          alt={currentImage.alt || title}
          width={1200}
          height={800}
          className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl"
          priority
          quality={90}
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}
      </div>

      {/* Image Caption */}
      {currentImage.caption && (
        <div className="mt-4 text-center text-white/80 text-sm px-4">
          {currentImage.caption}
        </div>
      )}

      {/* Thumbnail Strip */}
      <div className="mt-6 flex gap-2 overflow-x-auto max-w-4xl w-full px-4 pb-2">
        {images.map((img, index) => {
          const thumbUrl = builder
            .image(img.image)
            .width(100)
            .height(80)
            .fit('crop')
            .format('webp')
            .url()

          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 relative rounded overflow-hidden transition-all ${
                index === currentIndex
                  ? 'ring-2 ring-orange-500 scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`Go to image ${index + 1}`}
              style={{ width: '100px', height: '80px' }}
            >
              <Image
                src={thumbUrl}
                alt={img.alt || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          )
        })}
      </div>

      {/* Counter */}
      {images.length > 1 && (
        <div className="mt-4 text-white/60 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}
