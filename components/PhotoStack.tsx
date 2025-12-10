'use client'

import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/lib/sanity'
import { useState } from 'react'

const builder = imageUrlBuilder(client)

interface ProjectImage {
  image: any
  alt?: string
  caption?: string
}

interface PhotoStackProps {
  images: ProjectImage[]
  title: string
  onClick: () => void
  className?: string
}

export default function PhotoStack({ images, title, onClick, className = '' }: PhotoStackProps) {
  const [isHovering, setIsHovering] = useState(false)

  if (!images || images.length === 0) {
    return null
  }

  // Show first 3 images in the stack
  const displayImages = images.slice(0, 3)

  return (
    <div
      className={`relative cursor-pointer group ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick()
        }
      }}
      aria-label={`View ${title} gallery with ${images.length} photos`}
    >
      {/* Stacked Cards Effect */}
      <div className="relative w-full aspect-video rounded-lg shadow-2xl hover:shadow-xl transition-shadow duration-300">
        {displayImages.map((img, index) => {
          // Handle both Sanity images and external URLs
          let imageUrl = ''
          try {
            if (typeof img.image === 'string') {
              // External URL
              imageUrl = img.image
            } else if (img.image?.asset?.url) {
              // External URL in object format
              imageUrl = img.image.asset.url
            } else {
              // Sanity image object
              imageUrl = builder
                .image(img.image)
                .width(400)
                .height(300)
                .fit('crop')
                .format('webp')
                .url()
            }
          } catch (err) {
            console.warn(`Failed to process image ${index}:`, err)
            return null
          }

          return (
            <div
              key={index}
              className="absolute w-full h-full rounded-lg overflow-hidden transition-all duration-300"
              style={{
                transform: isHovering && images.length > 1
                  ? `translateY(${index * 4}px) translateX(${index * 4}px)` 
                  : 'none',
                zIndex: displayImages.length - index,
                boxShadow: isHovering && images.length > 1
                  ? `0 ${4 + index * 3}px ${12 + index * 4}px rgba(0, 0, 0, 0.5)`
                  : '0 4px 8px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Image
                src={imageUrl}
                alt={img.alt || `${title} - Photo ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )
        })}

        {/* Overlay with Project Name on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 z-20">
          <div className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full">
            <span className="text-xs font-semibold">{title}</span>
          </div>
        </div>

        {/* Badge for Stack - Image Count (only show when multiple images) */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.length} Images
          </div>
        )}
      </div>
    </div>
  )
}


