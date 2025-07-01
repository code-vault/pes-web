// middleware.ts - DEBUG VERSION
import createIntlMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request: NextRequest) {
  console.log('🔍 Processing:', request.nextUrl.pathname);
  const response = intlMiddleware(request);
  console.log('📤 Response:', response?.status || 'passthrough');
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/']
};