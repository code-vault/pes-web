import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';
import FAQSection from '@/components/FAQSection';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function FAQPage({params}: Props) {
  const {locale} = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {locale === 'hi' ? 'होम पर वापस जाएं' : 'Back to Home'}
            </Button>
          </Link>
        </div>
        
        <FAQSection />
      </div>
    </div>
  );
}