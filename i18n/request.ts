import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.warn(`Could not load messages for locale ${locale}`);
    messages = (await import(`../messages/en.json`)).default;
  }

  return {
    locale,          // THIS WAS MISSING!
    messages,
    timeZone: 'Asia/Kolkata'
  };
});
