import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create the next-intl middleware
const handleI18nRouting = createMiddleware(routing);

// Security headers configuration
function getSecurityHeaders(request: NextRequest, nonce: string) {
  // Content Security Policy
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${
      process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''
    } https://www.youtube.com https://www.googletagmanager.com;
    style-src 'self' 'nonce-${nonce}' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://images.unsplash.com https://img.youtube.com https://cdn.sanity.io;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.sanity.io https://cdn.sanity.io https://api.sendgrid.com;
    media-src 'self' https://commondatastorage.googleapis.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src https://www.youtube.com https://youtube.com;
    worker-src 'self' blob:;
    manifest-src 'self';
    ${process.env.NODE_ENV === 'production' ? 'upgrade-insecure-requests;' : ''}
  `;

  // Clean up CSP header
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  return {
    // Content Security Policy
    'Content-Security-Policy': contentSecurityPolicyHeaderValue,
    // Strict Transport Security (only in production)
    ...(process.env.NODE_ENV === 'production' && {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    }),
    // XSS Protection
    'X-Content-Type-Options': 'nosniff',
    // Clickjacking Protection  
    'X-Frame-Options': 'DENY',
    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    // Permissions Policy
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
    // Cross-Origin Policies
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    // Remove powered by header
    'X-Powered-By': '',
  };
}

export default function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.includes('.') // Files with extensions
  ) {
    return NextResponse.next();
  }

  // Generate nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Get security headers
  const securityHeaders = getSecurityHeaders(request, nonce);

  // Create request headers with nonce
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  // Add security headers to request
  Object.entries(securityHeaders).forEach(([key, value]) => {
    requestHeaders.set(key, value);
  });

  // Handle internationalization routing
  const response = handleI18nRouting(
    new NextRequest(request.url, {
      headers: requestHeaders,
    })
  );

  // Add security headers to response
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add nonce to response headers for use in components
  response.headers.set('x-nonce', nonce);

  return response;
}

export const config = {
  // Match only internationalized pathnames and exclude static files
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};