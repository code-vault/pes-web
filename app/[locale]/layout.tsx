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
// CORRECTED IMPORT - Use the actual FloatingClickToCall component
import FloatingClickToCall from '@/components/FloatingClickToCall';

// Toast Provider
import { ToastProvider } from '@/components/ui/toast';

// Font optimization
const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
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