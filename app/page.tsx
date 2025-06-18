import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

// This is the functional component that defines the UI for the '/' route.
// It's a Server Component by default, which is perfect for this.
export default function HomePage() {
  return (
    // We use a React Fragment <> because the main layout is already handled
    // by the <body> and <main> tags in app/layout.tsx.
    <>
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}