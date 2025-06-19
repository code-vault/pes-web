import {setRequestLocale} from 'next-intl/server';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Gallery from '@/components/Gallery';

type Props = {
  params: Promise<{locale: string}>;
};

// This is the functional component that defines the UI for the '/' route.
export default async function HomePage({params}: Props) {
  const {locale} = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  return (
    // We use a React Fragment <> because the main layout is already handled
    // by the <body> and <main> tags in app/[locale]/layout.tsx.
    <>
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}