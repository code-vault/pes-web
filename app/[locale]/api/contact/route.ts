import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ locale: string }>;
};

// This function will handle all requests made to /api/contact
export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { locale } = await context.params;
    
    // The form data sent from the frontend will be in the request body.
    const formData = await request.json();
    console.log('API received form data:', formData);
    console.log('Locale:', locale);

    // --- YOUR SECURE BACKEND LOGIC GOES HERE ---
    // For example, you would send an email or save to a database.
    // You can use the locale to send emails in the appropriate language
    // We'll just simulate a success for now.
    // ------------------------------------------

    // Send a success response back to the frontend.
    return NextResponse.json({ 
      message: locale === 'hi' 
        ? 'फॉर्म सफलतापूर्वक जमा किया गया!' 
        : 'Form submitted successfully!' 
    });

  } catch (error) {
    console.error('API Error:', error);
    
    // For error responses, we need to get locale from URL if params fail
    const url = new URL(request.url);
    const locale = url.pathname.includes('/hi/') ? 'hi' : 'en';
    
    // Send an error response back to the frontend.
    return NextResponse.json({ 
      message: locale === 'hi'
        ? 'आंतरिक सर्वर त्रुटि'
        : 'Internal Server Error' 
    }, { status: 500 });
  }
}