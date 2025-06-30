interface StructuredDataProps {
  locale: string;
  pageType?: 'home' | 'about' | 'services' | 'contact' | 'testimonials' | 'gallery';
}

export default function StructuredData({ locale, pageType = 'home' }: StructuredDataProps) {
  // Use dynamic base URL with fallback
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                  (typeof window !== 'undefined' ? window.location.origin : 'https://purvodayaenergy.com');
  
  // Organization Schema
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Purvodaya Energy Solutions",
    alternateName: locale === 'hi' ? "पूर्वोदय एनर्जी सॉल्यूशंस" : undefined,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.jpg`,
    description: locale === 'hi' 
      ? "पूर्वी उत्तर प्रदेश में अग्रणी सौर ऊर्जा समाधान प्रदाता - आवासीय और वाणिज्यिक सौर पैनल स्थापना"
      : "Leading solar energy solutions provider in Eastern Uttar Pradesh - Residential and commercial solar panel installation",
    foundingDate: "2012",
    areaServed: [
      {
        "@type": "State",
        name: "Uttar Pradesh"
      }
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 26.7606,
        longitude: 83.3732
      },
      geoRadius: "150000"
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-98765-43210",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
        serviceUrl: `${baseUrl}/contact`
      },
      {
        "@type": "ContactPoint",
        email: "basti@purvodayaenergy.com",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"]
      }
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Near Bus Stand",
        addressLocality: "Basti",
        addressRegion: "Uttar Pradesh",
        postalCode: "272002",
        addressCountry: "IN"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Civil Lines",
        addressLocality: "Gorakhpur",
        addressRegion: "Uttar Pradesh", 
        postalCode: "273001",
        addressCountry: "IN"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Khalilabad",
        addressLocality: "Sant Kabir Nagar",
        addressRegion: "Uttar Pradesh",
        postalCode: "272175", 
        addressCountry: "IN"
      }
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.7606,
      longitude: 83.3732
    },
    sameAs: [
      "https://facebook.com/purvodayaenergy",
      "https://linkedin.com/company/purvodaya-energy",
      "https://twitter.com/purvodayaenergy"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2500",
      bestRating: "5",
      worstRating: "1"
    }
  };

  // Local Business Schema for each office
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: "Purvodaya Energy Solutions",
    image: [`${baseUrl}/business-image.jpg`, `${baseUrl}/solar-installation.jpg`],
    telephone: "+91-98765-43210",
    email: "basti@purvodayaenergy.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Bus Stand",
      addressLocality: "Basti",
      addressRegion: "Uttar Pradesh",
      postalCode: "272002",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.7606,
      longitude: 83.3732
    },
    openingHours: ["Mo-Sa 09:00-18:00"],
    priceRange: "₹₹₹",
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer", "UPI"],
    currenciesAccepted: "INR",
    areaServed: [
      {
        "@type": "State",
        name: "Uttar Pradesh"
      }
    ]
  };

  // Service Schema
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#service`,
    name: locale === 'hi' ? "सौर ऊर्जा स्थापना सेवाएं" : "Solar Energy Installation Services",
    description: locale === 'hi' 
      ? "आवासीय और वाणिज्यिक सौर पैनल स्थापना, रखरखाव और ऊर्जा ऑडिट सेवाएं"
      : "Residential and commercial solar panel installation, maintenance, and energy audit services",
    provider: {
      "@id": `${baseUrl}/#organization`
    },
    areaServed: "IN",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solar Energy Solutions",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === 'hi' ? "आवासीय सौर स्थापना" : "Residential Solar Installation",
            description: locale === 'hi' ? "घरों के लिए कस्टम सौर समाधान" : "Custom solar solutions for homes"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === 'hi' ? "वाणिज्यिक सौर स्थापना" : "Commercial Solar Installation",
            description: locale === 'hi' ? "व्यवसायों के लिए स्केलेबल सौर समाधान" : "Scalable solar solutions for businesses"
          }
        }
      ]
    }
  };

  // FAQ Schema (for home page)
  const faqData = pageType === 'home' ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: locale === 'hi' ? "सौर सिस्टम की लागत कितनी है?" : "How much does a solar system cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: locale === 'hi' 
            ? "सौर सिस्टम की लागत आकार और आवश्यकताओं के आधार पर अलग होती है। आवासीय सिस्टम (1-10kW) की लागत आमतौर पर ₹40,000-₹80,000 प्रति kW होती है।"
            : "Solar system costs vary based on size and requirements. Residential systems (1-10kW) typically cost ₹40,000-₹80,000 per kW."
        }
      },
      {
        "@type": "Question",
        name: locale === 'hi' ? "सौर पैनलों से मैं कितनी बचत कर सकता हूं?" : "How much can I save with solar panels?",
        acceptedAnswer: {
          "@type": "Answer",
          text: locale === 'hi'
            ? "अधिकांश ग्राहक अपने बिजली बिलों पर 70-90% की बचत करते हैं। एक उचित आकार के सौर सिस्टम के साथ आप ₹10,000-₹13,000 प्रति माह बचा सकते हैं।"
            : "Most customers save 70-90% on their electricity bills. With a properly sized solar system, you could save ₹10,000-₹13,000 per month."
        }
      }
    ]
  } : null;

  // Breadcrumb Schema
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === 'hi' ? "होम" : "Home",
        item: `${baseUrl}/${locale}`
      },
      ...(pageType !== 'home' ? [{
        "@type": "ListItem",
        position: 2,
        name: pageType === 'about' ? (locale === 'hi' ? 'हमारे बारे में' : 'About') :
               pageType === 'services' ? (locale === 'hi' ? 'सेवाएं' : 'Services') :
               pageType === 'contact' ? (locale === 'hi' ? 'संपर्क' : 'Contact') :
               pageType === 'testimonials' ? (locale === 'hi' ? 'समीक्षाएं' : 'Testimonials') :
               pageType === 'gallery' ? (locale === 'hi' ? 'गैलरी' : 'Gallery') : pageType,
        item: `${baseUrl}/${locale}/${pageType}`
      }] : [])
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqData)
          }}
        />
      )}
    </>
  );
}