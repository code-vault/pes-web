import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

// Your shared layout components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Font optimization
const inter = Inter({ subsets: ['latin'] });

// Site-wide SEO Metadata
export const metadata: Metadata = {
  title: {
    template: '%s | SolarTech Pro',
    default: 'SolarTech Pro | Your Future, Powered by the Sun',
  },
  description: 'Premium solar solutions for residential, commercial, and industrial needs. Get your free quote today!',
};

// This is the Root Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* This UI is shared across ALL pages */}
        <Header />

        <main>
          {/*
            This '{children}' prop is the magic key.
            Next.js will automatically render your page content (from app/page.tsx) here.
          */}
          {children}
        </main>
        
        {/* This UI is also shared across ALL pages */}
        <Footer />
      </body>
    </html>
  );
}