// middleware.ts - Simplified version
import createIntlMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createIntlMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(hi|en)/:path*']
};