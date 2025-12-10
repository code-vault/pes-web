import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { validateContactForm, sanitizeInput } from '@/lib/security';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Initialize SendGrid only if API key is available
let emailConfigured = false;
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  emailConfigured = true;
}

type RouteContext = {
  params: Promise<{ locale: string }>;
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  bill?: string;
  additional?: string;
  submittedAt: string;
  language: string;
  source: string;
}

// Rate limiting function
function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 requests per 15 minutes

  const current = rateLimitStore.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
}

// Input sanitization
const sanitizeInput = (input: string): string => {
  return input.trim()
    .replace(/[<>]/g, '') // Remove potential HTML
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .slice(0, 1000); // Limit length
};

// Enhanced validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+91|91)?[\s-]?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]{1,50}$/;
  return nameRegex.test(name);
};

// Honeypot check (add hidden field in frontend)
const checkHoneypot = (data: any): boolean => {
  return !data.website && !data.url; // These fields should be empty
};

// Simple email templates (fallback for when SendGrid is not configured)
const getSimpleEmailContent = (formData: ContactFormData) => {
  return `
New Solar Inquiry Received - ${new Date().toLocaleDateString()}

Customer Details:
- Name: ${formData.firstName} ${formData.lastName}
- Phone: ${formData.phone}
- Email: ${formData.email}
- Address: ${formData.address}
- Monthly Bill: ${formData.bill || 'Not provided'}
- Additional Info: ${formData.additional || 'None'}
- Language: ${formData.language}
- Source: ${formData.source}
- Submitted: ${new Date(formData.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please follow up within 24 hours!

---
Purvodaya Energy Solutions Lead Management System
  `;
};

// Enhanced email templates for SendGrid
const getAdminEmailTemplate = (formData: ContactFormData) => {
  const isHindi = formData.language === 'hi';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${isHindi ? 'नई सोलर इंक्वायरी' : 'New Solar Inquiry'}</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
            .header { background: linear-gradient(135deg, #f97316, #f59e0b); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .info-card { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .label { font-weight: bold; color: #374151; }
            .value { color: #6b7280; margin-left: 10px; }
            .priority { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            .urgent { color: #dc2626; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🌞 ${isHindi ? 'नई सोलर इंक्वायरी!' : 'New Solar Inquiry!'}</h1>
                <p>${isHindi ? 'एक नया ग्राहक सोलर इंस्टॉलेशन में रुचि रखता है' : 'A new customer is interested in solar installation'}</p>
            </div>
            
            <div class="content">
                <div class="priority">
                    <h3 class="urgent">⚡ ${isHindi ? 'तुरंत फॉलो-अप करें!' : 'Follow up immediately!'}</h3>
                    <p>${isHindi ? 'यह एक गर्म लीड है - 24 घंटे के भीतर संपर्क करें' : 'This is a warm lead - contact within 24 hours'}</p>
                </div>
                
                <div class="info-card">
                    <h3>${isHindi ? 'ग्राहक जानकारी' : 'Customer Information'}</h3>
                    <p><span class="label">${isHindi ? 'नाम:' : 'Name:'}</span><span class="value">${formData.firstName} ${formData.lastName}</span></p>
                    <p><span class="label">${isHindi ? 'ईमेल:' : 'Email:'}</span><span class="value">${formData.email}</span></p>
                    <p><span class="label">${isHindi ? 'फोन:' : 'Phone:'}</span><span class="value">${formData.phone}</span></p>
                    <p><span class="label">${isHindi ? 'पता:' : 'Address:'}</span><span class="value">${formData.address}</span></p>
                </div>
                
                <div class="info-card">
                    <h3>${isHindi ? 'परियोजना विवरण' : 'Project Details'}</h3>
                    <p><span class="label">${isHindi ? 'मासिक बिल:' : 'Monthly Bill:'}</span><span class="value">${formData.bill || (isHindi ? 'प्रदान नहीं किया गया' : 'Not provided')}</span></p>
                    <p><span class="label">${isHindi ? 'अतिरिक्त जानकारी:' : 'Additional Info:'}</span><span class="value">${formData.additional || (isHindi ? 'कोई नहीं' : 'None')}</span></p>
                    <p><span class="label">${isHindi ? 'भाषा प्राथमिकता:' : 'Language Preference:'}</span><span class="value">${formData.language === 'hi' ? 'हिंदी' : 'English'}</span></p>
                </div>
                
                <div class="info-card">
                    <h3>${isHindi ? 'सबमिशन विवरण' : 'Submission Details'}</h3>
                    <p><span class="label">${isHindi ? 'सबमिट किया गया:' : 'Submitted:'}</span><span class="value">${new Date(formData.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span></p>
                    <p><span class="label">${isHindi ? 'स्रोत:' : 'Source:'}</span><span class="value">${formData.source}</span></p>
                </div>
            </div>
            
            <div class="footer">
                <p>${isHindi ? 'पूर्वोदय एनर्जी सॉल्यूशंस - लीड मैनेजमेंट सिस्टम' : 'Purvodaya Energy Solutions - Lead Management System'}</p>
                <p>Generated at: ${new Date().toISOString()}</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Send emails function with better error handling
async function sendEmails(formData: ContactFormData) {
  if (!emailConfigured) {
    console.log('📧 Email not configured - logging submission to console only');
    console.log('📋 Contact Details:', {
      customer: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      bill: formData.bill,
      language: formData.language,
      timestamp: formData.submittedAt
    });
    return;
  }

  const adminEmail = {
    to: process.env.EMAIL_TO || 'leads@purvodayaenergy.com',
    from: process.env.EMAIL_FROM || 'noreply@purvodayaenergy.com',
    subject: `🌞 New Solar Lead: ${formData.firstName} ${formData.lastName} (${formData.bill ? formData.bill + ' monthly bill' : 'No bill info'})`,
    html: getAdminEmailTemplate(formData)
  };

  try {
    // Send admin notification
    await sgMail.send(adminEmail);
    console.log('✅ Admin notification sent successfully');

    // Optionally send customer confirmation
    // (You can enable this later when you want customer confirmations)
    
  } catch (emailError) {
    console.error('❌ Email sending failed:', emailError);
    // Don't throw error - we don't want to fail the API call if email fails
  }
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

// Main API handler
export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { locale } = await context.params;
    
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    
    // Apply rate limiting
    if (!rateLimit(clientIP)) {
      return NextResponse.json(
        { 
          message: locale === 'hi' 
            ? 'बहुत अधिक अनुरोध। कृपया 15 मिनट बाद पुनः प्रयास करें।'
            : 'Too many requests. Please try again in 15 minutes.',
          error: 'RATE_LIMIT_EXCEEDED'
        }, 
        { status: 429 }
      );
    }
    
    // Parse the request body
    const rawData = await request.json();
    
    // Check honeypot fields
    if (!checkHoneypot(rawData)) {
      console.log('🚫 Potential spam detected - honeypot triggered');
      return NextResponse.json(
        { 
          message: locale === 'hi' 
            ? 'अमान्य सबमिशन'
            : 'Invalid submission',
          error: 'SPAM_DETECTED'
        }, 
        { status: 400 }
      );
    }
    
    // Validate required fields and input
    const requiredFields = ['firstName', 'lastName', 'phone', 'address'];
    const missingFields = requiredFields.filter(field => !rawData[field]?.trim());
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          message: locale === 'hi' 
            ? `निम्नलिखित फ़ील्ड आवश्यक हैं: ${missingFields.join(', ')}`
            : `Missing required fields: ${missingFields.join(', ')}`,
          error: 'VALIDATION_ERROR',
          missingFields
        }, 
        { status: 400, headers: { 'X-Content-Type-Options': 'nosniff' } }
      );
    }

    // Validate form data structure
    const validation = validateContactForm(rawData);
    if (!validation.valid) {
      return NextResponse.json(
        { 
          message: locale === 'hi' 
            ? 'फॉर्म में त्रुटि है'
            : 'Form validation failed',
          error: 'VALIDATION_ERROR',
          errors: validation.errors
        }, 
        { status: 400, headers: { 'X-Content-Type-Options': 'nosniff' } }
      );
    }

    // Sanitize inputs to prevent XSS
    const formData: ContactFormData = {
      firstName: sanitizeInput(rawData.firstName),
      lastName: sanitizeInput(rawData.lastName),
      email: sanitizeInput(rawData.email || ''),
      phone: sanitizeInput(rawData.phone),
      address: sanitizeInput(rawData.address),
      bill: rawData.bill ? sanitizeInput(rawData.bill) : undefined,
      additional: rawData.additional ? sanitizeInput(rawData.additional) : undefined,
      submittedAt: new Date().toISOString(),
      language: locale,
      source: 'web_form'
    };
        { status: 400 }
      );
    }

    // Validate name fields
    if (!validateName(rawData.firstName) || !validateName(rawData.lastName)) {
      return NextResponse.json(
        { 
          message: locale === 'hi' 
            ? 'कृपया वैध नाम दर्ज करें'
            : 'Please enter a valid name',
          error: 'INVALID_NAME'
        }, 
        { status: 400 }
      );
    }

    // Validate email format (if provided)
    if (rawData.email && !validateEmail(rawData.email)) {
      return NextResponse.json(
        { 
          message: locale === 'hi' 
            ? 'कृपया एक वैध ईमेल पता दर्ज करें'
            : 'Please enter a valid email address',
          error: 'INVALID_EMAIL'
        }, 
        { status: 400 }
      );
    }

    // Validate phone format
    if (!validatePhone(rawData.phone)) {
      return NextResponse.json(
        { 
          message: locale === 'hi' 
            ? 'कृपया एक वैध फोन नंबर दर्ज करें'
            : 'Please enter a valid phone number',
          error: 'INVALID_PHONE'
        }, 
        { status: 400 }
      );
    }

    // Sanitize and structure the form data
    const formData: ContactFormData = {
      firstName: sanitizeInput(rawData.firstName),
      lastName: sanitizeInput(rawData.lastName),
      email: rawData.email ? sanitizeInput(rawData.email) : '',
      phone: sanitizeInput(rawData.phone),
      address: sanitizeInput(rawData.address),
      bill: rawData.bill ? sanitizeInput(rawData.bill) : '',
      additional: rawData.additional ? sanitizeInput(rawData.additional) : '',
      submittedAt: rawData.submittedAt || new Date().toISOString(),
      language: locale,
      source: rawData.source || 'website_contact_form'
    };

    console.log('📩 Contact form submission received:', {
      customer: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      bill: formData.bill,
      language: formData.language,
      ip: clientIP,
      timestamp: formData.submittedAt
    });

    // Send emails (if configured) or log to console
    await sendEmails(formData);

    // Success response
    return NextResponse.json({ 
      message: locale === 'hi' 
        ? `धन्यवाद ${formData.firstName}! आपका संदेश सफलतापूर्वक प्राप्त हुआ है। हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।`
        : `Thank you ${formData.firstName}! Your message has been received successfully. Our team will contact you within 24 hours.`,
      success: true,
      emailConfigured: emailConfigured,
      data: {
        submissionId: `PES-${Date.now()}`,
        estimatedResponseTime: '24 hours'
      }
    });

  } catch (mainError) {
    console.error('❌ Contact API Error:', mainError);
    
    const url = new URL(request.url);
    const locale = url.pathname.includes('/hi/') ? 'hi' : 'en';
    
    return NextResponse.json({ 
      message: locale === 'hi'
        ? 'क्षमा करें, एक तकनीकी समस्या हुई है। कृपया पुनः प्रयास करें या हमें +91 98765 43210 पर कॉल करें।'
        : 'Sorry, there was a technical issue. Please try again or call us at +91 98765 43210.',
      error: 'INTERNAL_SERVER_ERROR'
    }, { status: 500 });
  }
}

// Health check endpoint
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { locale } = await context.params;
    
    return NextResponse.json({
      status: 'ok',
      message: locale === 'hi' ? 'संपर्क API कार्यरत है' : 'Contact API is working',
      emailConfigured: emailConfigured,
      timestamp: new Date().toISOString(),
      timezone: 'Asia/Kolkata'
    });
  } catch (healthError) {
    console.error('Health check error:', healthError);
    return NextResponse.json({
      status: 'error',
      message: 'API health check failed'
    }, { status: 500 });
  }
}