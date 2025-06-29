// i18n/routing.ts - Simplified
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'hi'],
  defaultLocale: 'en'
});

export type Locale = (typeof routing.locales)[number];