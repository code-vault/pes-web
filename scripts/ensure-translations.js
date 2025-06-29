// scripts/ensure-translations.js
import { existsSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Minimal translation structure for production build
const minimalTranslations = {
  "metadata": {
    "title": "Purvodaya Energy Solutions - Solar Installation Services",
    "description": "Leading solar energy solutions provider in India."
  },
  "header": {
    "companyName": "Purvodaya Energy Solutions",
    "logo": {
      "main": "Purvodaya",
      "tagline": "Energy Solutions"
    },
    "about": "About",
    "services": "Services",
    "gallery": "Gallery", 
    "testimonials": "Testimonials",
    "contact": "Contact",
    "getQuote": "Get Quote",
    "topBar": {
      "phone": "+91 98765 43210",
      "email": "info@purvodayaenergy.com"
    },
    "social": {
      "facebook": "Follow us on Facebook",
      "linkedin": "Connect on LinkedIn",
      "instagram": "Follow us on Instagram",
      "twitter": "Follow us on Twitter"
    },
    "languageSwitcher": {
      "toggle": "Switch language",
      "current": "EN"
    },
    "mobileMenu": {
      "toggle": "Toggle mobile menu"
    }
  },
  "hero": {
    "badge": "⚡ Go Solar Today",
    "title": "Switch to Clean Solar Energy & Save Money",
    "subtitle": "Join 2,500+ satisfied customers who have reduced their electricity bills by up to 90% with our premium solar solutions.",
    "save": "Save 90%",
    "saveBills": "On electricity bills",
    "warranty": "25 Years",
    "warrantyText": "Complete warranty",
    "clean": "Clean Energy",
    "cleanEnergy": "Zero emissions",
    "getQuoteBtn": "Get Free Quote",
    "watchDemo": "Watch Demo",
    "calculator": {
      "title": "Savings Calculator",
      "currentBill": "Current Monthly Bill",
      "withSolar": "With Solar",
      "monthlySavings": "Monthly Savings",
      "annualSavings": "Annual Savings",
      "yearSavings": "25-Year Savings"
    },
    "demoModal": {
      "title": "Solar Energy Demo",
      "comingSoon": "Demo Video Coming Soon",
      "description": "Watch how our solar installations work and see real customer savings.",
      "closeButton": "Close demo",
      "features": {
        "0": {
          "title": "Installation Process",
          "description": "See how we install"
        },
        "1": {
          "title": "Quality Materials", 
          "description": "Premium components"
        },
        "2": {
          "title": "Cost Savings",
          "description": "Real customer results"
        }
      },
      "cta": {
        "question": "Ready to start saving with solar?",
        "button": "Get Your Quote"
      }
    }
  },
  "services": {
    "badge": "Our Services",
    "title": "Solar Solutions for Every Need",
    "subtitle": "From residential rooftops to large industrial installations, we provide customized solar energy solutions that deliver maximum savings and efficiency.",
    "residential": {
      "title": "Residential Solar",
      "description": "Custom solar solutions for homes. Reduce your electricity bills by up to 90% with our premium residential solar installations."
    },
    "commercial": {
      "title": "Commercial Solar",
      "description": "Scalable solar systems for businesses. Cut operational costs and demonstrate your commitment to sustainability."
    },
    "industrial": {
      "title": "Industrial Solar",
      "description": "Large-scale solar installations for industrial facilities. Maximize energy independence and reduce operational expenses."
    },
    "viewAll": "View All Services"
  },
  "about": {
    "badge": "About Us",
    "title": "Leading the Solar Revolution in India",
    "subtitle": "With over 12 years of experience and 2,500+ successful installations, we are India's trusted partner for clean, renewable energy solutions.",
    "stats": {
      "customers": "Happy Customers",
      "installed": "Capacity Installed",
      "experience": "Years Experience",
      "co2Saved": "kg CO₂ Saved"
    },
    "learnMore": "Learn More About Us"
  },
  "gallery": {
    "badge": "Our Work",
    "title": "Solar Installation Gallery",
    "subtitle": "Explore our completed projects and see the quality craftsmanship that goes into every solar installation.",
    "viewFullGallery": "View Full Gallery"
  },
  "testimonials": {
    "badge": "Customer Reviews",
    "title": "What Our Customers Say",
    "subtitle": "Real stories from real customers who have transformed their energy costs with our solar solutions.",
    "readAllReviews": "Read All Reviews",
    "reviews": {
      "0": {
        "name": "Rajesh Kumar",
        "location": "Mumbai, Maharashtra",
        "text": "Our electricity bill went from ₹25,000 to just ₹2,500 per month! The installation was professional and completed in just 2 days. Excellent service and great savings.",
        "project": "8kW Residential",
        "savings": "₹2,70,000/year"
      },
      "1": {
        "name": "Priya Sharma",
        "location": "Delhi, NCR",
        "text": "Best investment we ever made! The team was knowledgeable, the installation was quick, and we're already seeing massive savings on our bills.",
        "project": "12kW Commercial",
        "savings": "₹4,20,000/year"
      },
      "2": {
        "name": "Amit Patel",
        "location": "Ahmedabad, Gujarat",
        "text": "Professional service from start to finish. The solar system has been working flawlessly for 2 years now. Highly recommend Purvodaya Energy!",
        "project": "6kW Residential",
        "savings": "₹1,80,000/year"
      }
    }
  },
  "contact": {
    "badge": "Get In Touch",
    "title": "Ready to Start Saving?",
    "subtitle": "Get your free solar consultation today and discover how much you can save with our premium solar solutions.",
    "form": {
      "name": "Full Name",
      "phone": "Phone Number",
      "email": "Email Address",
      "message": "Message",
      "namePlaceholder": "Enter your full name",
      "phonePlaceholder": "+91 98765 43210",
      "emailPlaceholder": "your@email.com",
      "messagePlaceholder": "Tell us about your requirements...",
      "submit": "Send Message",
      "sending": "Sending...",
      "success": "Thank you! We'll contact you within 24 hours.",
      "error": "Sorry, there was an issue. Please try again."
    },
    "info": {
      "phone": "+91 98765 43210",
      "email": "info@purvodayaenergy.com",
      "address": "Solar Avenue, Green City, Mumbai, Maharashtra 400001",
      "hours": "Mon-Sat: 9AM-6PM"
    }
  },
  "footer": {
    "description": "Leading solar energy solutions provider in India with over 12 years of experience and 2,500+ successful installations.",
    "services": {
      "title": "Services",
      "residential": "Residential Solar",
      "commercial": "Commercial Solar",
      "industrial": "Industrial Solar",
      "audits": "Energy Audits",
      "maintenance": "Maintenance",
      "storage": "Battery Storage"
    },
    "quickLinks": {
      "title": "Quick Links",
      "about": "About Us",
      "services": "Services",
      "gallery": "Gallery",
      "testimonials": "Testimonials",
      "financing": "Financing Options",
      "warranties": "Warranties",
      "contact": "Contact"
    },
    "getInTouch": {
      "title": "Get In Touch",
      "quote": {
        "title": "Get Free Quote",
        "description": "Ready to start saving?",
        "button": "Get Started"
      }
    },
    "contact": {
      "phone": "+91 98765 43210",
      "email": "info@purvodayaenergy.com",
      "address": "Solar Avenue, Green City, Mumbai, Maharashtra 400001"
    },
    "social": {
      "facebook": "Follow us on Facebook",
      "twitter": "Follow us on Twitter",
      "linkedin": "Connect on LinkedIn",
      "instagram": "Follow us on Instagram"
    },
    "legal": {
      "privacy": "Privacy Policy",
      "terms": "Terms of Service",
      "cookies": "Cookie Policy"
    },
    "copyright": "© 2024 Purvodaya Energy Solutions. All rights reserved."
  },
  "aboutPage": {
    "backToHome": "Back to Home",
    "title": "About Purvodaya Energy Solutions",
    "subtitle": "Leading the solar revolution in India with innovative, sustainable energy solutions."
  },
  "servicesPage": {
    "backToHome": "Back to Home",
    "title": "Our Solar Services",
    "subtitle": "Comprehensive solar energy solutions tailored to your specific needs."
  },
  "galleryPage": {
    "backToHome": "Back to Home",
    "title": "Installation Gallery",
    "subtitle": "Browse our portfolio of completed solar installations.",
    "projects": {
      "0": {
        "title": "Residential Rooftop - Mumbai",
        "category": "Residential"
      },
      "1": {
        "title": "Commercial Installation Process",
        "category": "Commercial"
      },
      "2": {
        "title": "Industrial Solar Farm - Gujarat",
        "category": "Industrial"
      },
      "3": {
        "title": "Before & After Comparison",
        "category": "Transformation"
      },
      "4": {
        "title": "Installation Time-lapse",
        "category": "Process"
      },
      "5": {
        "title": "Maintenance & Cleaning",
        "category": "Maintenance"
      }
    },
    "additionalProjects": {
      "0": {"title": "Delhi Residential Complex", "category": "Residential"},
      "1": {"title": "Pune Office Building", "category": "Commercial"},
      "2": {"title": "Chennai Factory Installation", "category": "Industrial"},
      "3": {"title": "Bangalore Villa Project", "category": "Residential"},
      "4": {"title": "Hyderabad Shopping Mall", "category": "Commercial"},
      "5": {"title": "Kolkata Manufacturing Unit", "category": "Industrial"},
      "6": {"title": "Jaipur Heritage Home", "category": "Residential"},
      "7": {"title": "Goa Resort Installation", "category": "Commercial"},
      "8": {"title": "Lucknow Warehouse", "category": "Industrial"},
      "9": {"title": "Chandigarh Apartment", "category": "Residential"},
      "10": {"title": "Indore Business Park", "category": "Commercial"},
      "11": {"title": "Vadodara Chemical Plant", "category": "Industrial"}
    }
  },
  "testimonialsPage": {
    "backToHome": "Back to Home",
    "title": "Customer Stories & Reviews",
    "subtitle": "Real experiences from real customers."
  },
  "faqPage": {
    "backToHome": "Back to Home",
    "title": "Frequently Asked Questions",
    "subtitle": "Get answers to common questions."
  },
  "aiChatbot": {
    "buttonTitle": "Chat with AI Solar Assistant",
    "chatIndicator": "Ask AI about solar",
    "headerTitle": "Purvodaya AI Solar Expert",
    "headerSubtitle": "Instant Solar Answers",
    "inputPlaceholder": "Ask about solar costs, savings, installation...",
    "poweredBy": "Powered by AI • Purvodaya Energy",
    "quickTopics": "Quick topics:",
    "quickReplies": {
      "cost": "💰 Solar Costs",
      "subsidy": "🏛️ Government Subsidies",
      "installation": "🔧 Installation Process",
      "financing": "💳 Financing Options",
      "types": "⚡ System Types",
      "savings": "📊 Savings Calculator"
    },
    "greetings": {
      "0": "👋 Hello! I'm your AI solar assistant. Ask me anything about solar energy!",
      "1": "🌞 Welcome to Purvodaya Energy! I can help you with solar costs, subsidies, and more.",
      "2": "⚡ Hi there! Ready to explore solar energy? I have answers about pricing and savings!"
    },
    "responses": {
      "cost": "💰 **Solar System Costs in India:**\n\n• **Residential (1-10kW):** ₹40,000 - ₹80,000 per kW\n• **Commercial (10kW+):** ₹35,000 - ₹65,000 per kW",
      "subsidy": "🏛️ **Government Subsidies Available:**\n\n• **Central Subsidy:** Up to ₹18,000 per kW (max 3kW)\n• **State Subsidies:** Additional 10-30% in many states",
      "installation": "🔧 **Solar Installation Process:**\n\n**Step 1:** Site Survey & Design (1-2 days)\n**Step 2:** Permits & Approvals (7-15 days)",
      "financing": "💳 **Solar Financing Options:**\n\n**1. Cash Purchase** ✅ Best ROI\n**2. Solar Loan** 🏦 2-6% interest",
      "types": "⚡ **Solar System Types:**\n\n**🔌 On-Grid (Grid-Tied)**\n• Connected to electricity grid",
      "savings": "📊 **Solar Savings Calculator:**\n\n**Example 5kW System:**\n• Monthly Generation: ~750 units"
    },
    "fallback": {
      "0": "I'd be happy to help you with that! For detailed information, please contact our experts at +91 98765 43210.",
      "1": "That's a great question! Our specialists can provide detailed information. Would you like to schedule a consultation?",
      "2": "I want to make sure you get accurate information. Our consultants can give you specific details."
    },
    "leadCapture": {
      "0": "🎯 **Ready to get started?** Our experts can provide a free assessment. Interested?",
      "1": "💡 **Want to see your savings potential?** We offer free energy audits!"
    }
  }
};

async function ensureTranslations() {
  console.log('🔍 Checking for translation files...');
  
  const messagesDir = join(process.cwd(), 'messages');
  const enPath = join(messagesDir, 'en.json');
  const hiPath = join(messagesDir, 'hi.json');
  
  // Ensure messages directory exists
  if (!existsSync(messagesDir)) {
    console.log('📁 Creating messages directory...');
    mkdirSync(messagesDir, { recursive: true });
  }
  
  // Check and create English translations
  if (!existsSync(enPath)) {
    console.log('📄 Creating en.json with minimal translations...');
    writeFileSync(enPath, JSON.stringify(minimalTranslations, null, 2));
  } else {
    console.log('✅ en.json exists');
  }
  
  // Check and create Hindi translations (copy of English for now)
  if (!existsSync(hiPath)) {
    console.log('📄 Creating hi.json with minimal translations...');
    writeFileSync(hiPath, JSON.stringify(minimalTranslations, null, 2));
  } else {
    console.log('✅ hi.json exists');
  }
  
  console.log('✅ Translation files are ready for build');
}

// Execute
ensureTranslations().catch(console.error);