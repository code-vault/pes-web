import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // COMPLETELY BYPASS LINTING AND TYPE CHECKING FOR DEPLOYMENT
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
    esmExternals: 'loose',
  },

  // Basic image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: [
      'images.unsplash.com',
      'img.youtube.com',
      'cdn.sanity.io',
      'commondatastorage.googleapis.com'
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression
  compress: true,

  // Disable powered by header
  poweredByHeader: false,

  // Environment variables
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },

  // Basic security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Basic redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);