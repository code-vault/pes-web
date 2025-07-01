import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ToastProvider } from '@/components/ui/toast';
import IntlProvider from '@/components/IntlProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingClickToCall from '@/components/FloatingClickToCall';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'hi'}];
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const metadata = messages.metadata as Record<string, string>;
  
  return {
    title: {
      template: `%s | ${locale === 'hi' ? 'पूर्वोदय एनर्जी सॉल्यूशंस' : 'Purvodaya Energy Solutions'}`,
      default: metadata.title,
    },
    description: metadata.description,
    // ... other metadata
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const {locale} = await params;
  
  const locales = ['en', 'hi'];
  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className}>
        <IntlProvider locale={locale} messages={messages}>
        <ToastProvider>
          <Header />              {/* ← Make sure this is here */}
          <main>{children}</main>
          <Footer />              {/* ← And this */}
          <FloatingClickToCall /> {/* ← And this */}
        </ToastProvider>
      </IntlProvider>
      </body>
    </html>
  );
}
