import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';

// Your shared layout components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingClickToCall from '@/components/FloatingClickToCall';

// Toast Provider
import { ToastProvider } from '@/components/ui/toast';
import IntlProvider from '@/components/IntlProvider';


// Font optimization
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Improves font loading performance
  preload: true
});

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

// Generate static params for both locales
export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'hi'}];
}

// Dynamic metadata based on locale
// Dynamic metadata based on locale

function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const ret: any = {};
  keys.forEach(key => {
    ret[key] = obj[key];
  });
  return ret;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  // const messages = await getMessages({locale});
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const metadata = messages.metadata as Record<string, string>;
  
  return {
    title: {
      template: `%s | ${locale === 'hi' ? 'पूर्वोदय एनर्जी सॉल्यूशंस' : 'Purvodaya Energy Solutions'}`,
      default: metadata.title,
    },
    description: metadata.description,
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    robots: 'index, follow',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
  };
}

// This is the Root Layout Component
export default async function LocaleLayout({
  children,
  params
}: Props) {
  const {locale} = await params;
  
  // Validate that the incoming `locale` parameter is valid
  const locales = ['en', 'hi'];
  if (!locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // const messages = await getMessages({locale});
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir="ltr">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
      </head>
      <body className={inter.className}>
                <IntlProvider locale={locale} messages={messages}>
          <ToastProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
            <FloatingClickToCall />
          </ToastProvider>
        </IntlProvider>
      </body>
    </html>
  );
}