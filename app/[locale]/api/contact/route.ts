import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+91|91)?[\s-]?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Email Templates
const getAdminEmailTemplate = (formData: ContactFormData) => {
  const isHindi = formData.language === 'hi';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>${isHindi ? 'नई सोलर इंक्वायरी' : 'New Solar Inquiry'}</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #f97316, #f59e0b); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .info-card { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .label { font-weight: bold; color: #374151; }
            .value { color: #6b7280; margin-left: 10px; }
            .priority { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🌞 ${isHindi ? 'नई सोलर इंक्वायरी!' : 'New Solar Inquiry!'}</h1>
            <p>${isHindi ? 'एक नया ग्राहक सोलर इंस्टॉलेशन में रुचि रखता है' : 'A new customer is interested in solar installation'}</p>
        </div>
        
        <div class="content">
            <div class="priority">
                <h3>⚡ ${isHindi ? 'तुरंत फॉलो-अप करें!' : 'Follow up immediately!'}</h3>
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
                <p><span class="label">${isHindi ? 'सबमिट किया गया:' : 'Submitted:'}</span><span class="value">${new Date(formData.submittedAt).toLocaleString()}</span></p>
                <p><span class="label">${isHindi ? 'स्रोत:' : 'Source:'}</span><span class="value">${formData.source}</span></p>
            </div>
        </div>
        
        <div class="footer">
            <p>${isHindi ? 'पूर्वोदय एनर्जी सॉल्यूशंस - लीड मैनेजमेंट सिस्टम' : 'Purvodaya Energy Solutions - Lead Management System'}</p>
        </div>
    </body>
    </html>
  `;
};

const getCustomerEmailTemplate = (formData: ContactFormData) => {
  const isHindi = formData.language === 'hi';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>${isHindi ? 'आपकी सोलर इंक्वायरी प्राप्त हुई' : 'Your Solar Inquiry Received'}</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #f97316, #f59e0b); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9fafb; }
            .welcome { background: white; padding: 20px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .next-steps { background: #ecfdf5; border: 1px solid #10b981; padding: 20px; border-radius: 12px; margin: 20px 0; }
            .contact-info { background: white; padding: 20px; border-radius: 12px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #6b7280; }
            .button { display: inline-block; background: linear-gradient(135deg, #f97316, #f59e0b); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 5px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🌞 ${isHindi ? 'धन्यवाद, ' + formData.firstName + '!' : 'Thank you, ' + formData.firstName + '!'}</h1>
            <p>${isHindi ? 'आपकी सोलर इंक्वायरी सफलतापूर्वक प्राप्त हुई है' : 'Your solar inquiry has been successfully received'}</p>
        </div>
        
        <div class="content">
            <div class="welcome">
                <h2>${isHindi ? 'आपकी सौर यात्रा शुरू हो गई है!' : 'Your Solar Journey Begins!'}</h2>
                <p>${isHindi ? 
                  'हमें खुशी है कि आपने स्वच्छ, नवीकरणीय ऊर्जा में रुचि दिखाई है। हमारी विशेषज्ञ टीम आपकी आवश्यकताओं के अनुसार एक कस्टम सोलर समाधान तैयार करेगी।' : 
                  'We\'re excited that you\'re interested in clean, renewable energy. Our expert team will prepare a custom solar solution tailored to your needs.'
                }</p>
            </div>
            
            <div class="next-steps">
                <h3>📋 ${isHindi ? 'अगले कदम:' : 'Next Steps:'}</h3>
                <ul>
                    <li>${isHindi ? '✅ आपकी जानकारी की समीक्षा (1-2 घंटे)' : '✅ Review your information (1-2 hours)'}</li>
                    <li>${isHindi ? '📞 हमारे विशेषज्ञ आपको कॉल करेंगे (24 घंटे के भीतर)' : '📞 Our expert will call you (within 24 hours)'}</li>
                    <li>${isHindi ? '🏠 मुफ्त साइट सर्वे शेड्यूल करना' : '🏠 Schedule free site survey'}</li>
                    <li>${isHindi ? '💰 कस्टम कोटेशन तैयार करना' : '💰 Prepare custom quotation'}</li>
                </ul>
            </div>
            
            <div class="contact-info">
                <h3>${isHindi ? 'तुरंत सहायता चाहिए?' : 'Need Immediate Assistance?'}</h3>
                <p>${isHindi ? 'हमसे संपर्क करने में संकोच न करें:' : 'Don\'t hesitate to contact us:'}</p>
                
                <a href="tel:+919876543210" class="button">📞 ${isHindi ? 'अभी कॉल करें' : 'Call Now'}</a>
                <a href="https://wa.me/919876543210" class="button">💬 WhatsApp</a>
                
                <p style="margin-top: 20px;">
                    <strong>${isHindi ? 'फोन:' : 'Phone:'}</strong> +91 98765 43210<br>
                    <strong>${isHindi ? 'ईमेल:' : 'Email:'}</strong> info@purvodayaenergy.com<br>
                    <strong>${isHindi ? 'समय:' : 'Hours:'}</strong> ${isHindi ? 'सोमवार-शनिवार 9AM-6PM' : 'Mon-Sat 9AM-6PM'}
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p>${isHindi ? 'धन्यवाद,' : 'Thank you,'}<br>
            <strong>${isHindi ? 'पूर्वोदय एनर्जी सॉल्यूशंस टीम' : 'Purvodaya Energy Solutions Team'}</strong></p>
            <p style="font-size: 12px; color: #9ca3af;">
                ${isHindi ? 'यह एक स्वचालित ईमेल है। कृपया इसका उत्तर न दें।' : 'This is an automated email. Please do not reply.'}
            </p>
        </div>
    </body>
    </html>
  `;
};

// Send emails function
async function sendEmails(formData: ContactFormData) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, skipping email send');
    return;
  }

  const adminEmail = {
    to: process.env.EMAIL_TO || 'leads@purvodayaenergy.com',
    from: process.env.EMAIL_FROM || 'noreply@purvodayaenergy.com',
    subject: `🌞 New Solar Lead: ${formData.firstName} ${formData.lastName} (${formData.bill ? formData.bill + ' monthly bill' : 'No bill info'})`,
    html: getAdminEmailTemplate(formData)
  };

  const customerEmail = {
    to: formData.email,
    from: process.env.EMAIL_FROM || 'noreply@purvodayaenergy.com',
    subject: formData.language === 'hi' 
      ? `धन्यवाद ${formData.firstName}! आपकी सोलर इंक्वायरी प्राप्त हुई` 
      : `Thank you ${formData.firstName}! Your Solar Inquiry Received`,
    html: getCustomerEmailTemplate(formData)
  };

  try {
    // Send admin notification
    await sgMail.send(adminEmail);
    console.log('Admin notification sent successfully');

    // Send customer confirmation
    await sgMail.send(customerEmail);
    console.log('Customer confirmation sent successfully');

  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't throw error - we don't want to fail the API call if email fails
  }
}

// Main API handler
export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { locale } = await context.params;
    
    // Parse the request body
    const rawData = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address'];
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
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(rawData.email)) {
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
      email: sanitizeInput(rawData.email),
      phone: sanitizeInput(rawData.phone),
      address: sanitizeInput(rawData.address),
      bill: rawData.bill ? sanitizeInput(rawData.bill) : '',
      additional: rawData.additional ? sanitizeInput(rawData.additional) : '',
      submittedAt: rawData.submittedAt || new Date().toISOString(),
      language: locale,
      source: rawData.source || 'website_contact_form'
    };

    console.log('Contact form submission received:', {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      language: formData.language,
      timestamp: formData.submittedAt
    });

    // Send emails (admin notification + customer confirmation)
    await sendEmails(formData);

    // Success response
    return NextResponse.json({ 
      message: locale === 'hi' 
        ? `धन्यवाद ${formData.firstName}! आपका संदेश सफलतापूर्वक प्राप्त हुआ है। हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।`
        : `Thank you ${formData.firstName}! Your message has been received successfully. Our team will contact you within 24 hours.`,
      success: true,
      data: {
        submissionId: `PES-${Date.now()}`,
        estimatedResponseTime: '24 hours'
      }
    });

  } catch (error) {
    console.error('Contact API Error:', error);
    
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
      emailConfigured: !!process.env.SENDGRID_API_KEY,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'API health check failed'
    }, { status: 500 });
  }
}