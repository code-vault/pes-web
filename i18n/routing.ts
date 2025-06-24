// i18n/routing.ts - Already looks good, but ensure this configuration:
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'hi'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      hi: '/hmare-bare-mein'
    },
    '/services': {
      en: '/services',
      hi: '/sevayen'
    },
     '/gallery': {
      en: '/gallery',
      hi: '/gallery'
    },
    '/contact': {
      en: '/contact',
      hi: '/sampark'
    }
  }
});