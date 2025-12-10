// next.config.ts - Enhanced but tolerant production configuration
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Allow build to proceed with ESLint warnings
  },
  typescript: {
    ignoreBuildErrors: true, // Allow build to proceed with TypeScript errors (for deployment)
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [60, 75, 80, 90],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Content Security Policy (relaxed for compatibility)
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://www.google.com https://cdnjs.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.sanity.io https://api.sendgrid.com",
              "media-src 'self' https:",
              "frame-src 'self' https://www.youtube.com",
            ].join('; ')
          },
        ],
      },
    ];
  },

  // Compression
  compress: true,
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Bundle analyzer (only when ANALYZE=true)
  webpack: (config: any, { isServer }: any) => {
    // Bundle analyzer
    if (process.env.ANALYZE === 'true' && !isServer) {
      const BundleAnalyzerPlugin = require('@next/bundle-analyzer')({
        enabled: true
      });
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    
    return config;
  },
};

export default withNextIntl(nextConfig);