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
import PerformanceMonitor from '@/components/PerformanceMonitor';

// Toast Provider
import { ToastProvider } from '@/components/ui/toast';

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
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const messages = await getMessages({locale});
  const metadata = messages.metadata as any;
  
  return {
    title: {
      template: `%s | ${locale === 'hi' ? 'पूर्वोदय एनर्जी सॉल्यूशंस' : 'Purvodaya Energy Solutions'}`,
      default: metadata.title,
    },
    description: metadata.description,
    // Performance optimizations
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    robots: 'index, follow',
    // Preload critical resources
    other: {
      'preload': '/fonts/inter.woff2 as font type=font/woff2 crossorigin',
    }
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
  // side is the easiest way to get started
  const messages = await getMessages({locale});

  return (
    <html lang={locale} dir={locale === 'hi' ? 'ltr' : 'ltr'}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/images/hero-bg.webp" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        
        {/* Optimize third-party scripts */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {/* Performance Monitor - only in development */}
          {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
          
          {/* WRAP EVERYTHING WITH TOASTPROVIDER */}
          <ToastProvider>
            {/* This UI is shared across ALL pages */}
            <Header />

            <main>
              {children}
            </main>
            
            {/* This UI is also shared across ALL pages */}
            <Footer />

            {/* Floating Click-to-Call Button - appears on all pages */}
            <FloatingClickToCall />
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}