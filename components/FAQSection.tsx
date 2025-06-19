"use client";
import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, Zap, Home, CreditCard, Wrench, Shield, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations, useLocale } from 'next-intl';

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const locale = useLocale();

  const categories = [
    { id: 'all', name: locale === 'hi' ? 'सभी' : 'All', icon: HelpCircle },
    { id: 'installation', name: locale === 'hi' ? 'स्थापना' : 'Installation', icon: Home },
    { id: 'cost', name: locale === 'hi' ? 'लागत' : 'Cost & Savings', icon: CreditCard },
    { id: 'maintenance', name: locale === 'hi' ? 'रखरखाव' : 'Maintenance', icon: Wrench },
    { id: 'technology', name: locale === 'hi' ? 'तकनीक' : 'Technology', icon: Zap },
    { id: 'warranty', name: locale === 'hi' ? 'वारंटी' : 'Warranty', icon: Shield }
  ];

  const faqData = [
    // Installation FAQs
    {
      id: 1,
      category: 'installation',
      question: locale === 'hi' ? 'सोलर पैनल स्थापित करने में कितना समय लगता है?' : 'How long does it take to install solar panels?',
      answer: locale === 'hi' 
        ? 'आवासीय स्थापना आमतौर पर 1-3 दिन लेती है, जबकि वाणिज्यिक परियोजनाओं में 1-2 सप्ताह लग सकते हैं। यह सिस्टम के आकार और जटिलता पर निर्भर करता है।'
        : 'Residential installations typically take 1-3 days, while commercial projects may take 1-2 weeks. This depends on the system size and complexity.'
    },
    {
      id: 2,
      category: 'installation',
      question: locale === 'hi' ? 'क्या मुझे किसी परमिट की आवश्यकता है?' : 'Do I need any permits for installation?',
      answer: locale === 'hi'
        ? 'हां, लेकिन चिंता न करें! हम सभी आवश्यक परमिट और कागजी कार्रवाई का ख्याल रखते हैं। यह हमारी सेवा में शामिल है।'
        : 'Yes, but don\'t worry! We handle all the necessary permits and paperwork. This is included in our service.'
    },
    {
      id: 3,
      category: 'installation',
      question: locale === 'hi' ? 'क्या सोलर पैनल मेरी छत को नुकसान पहुंचाएंगे?' : 'Will solar panels damage my roof?',
      answer: locale === 'hi'
        ? 'बिल्कुल नहीं! हम उन्नत माउंटिंग सिस्टम का उपयोग करते हैं जो आपकी छत की अखंडता को बनाए रखता है। हमारे पास पूर्ण बीमा कवरेज भी है।'
        : 'Absolutely not! We use advanced mounting systems that preserve your roof\'s integrity. We also have full insurance coverage.'
    },

    // Cost & Savings FAQs  
    {
      id: 4,
      category: 'cost',
      question: locale === 'hi' ? 'सोलर सिस्टम की लागत कितनी है?' : 'How much does a solar system cost?',
      answer: locale === 'hi'
        ? 'आवासीय सिस्टम की लागत ₹40,000 से ₹80,000 प्रति किलोवाट होती है। वास्तविक लागत आपकी ऊर्जा आवश्यकताओं और छत के प्रकार पर निर्भर करती है।'
        : 'Residential systems cost between ₹40,000 to ₹80,000 per kilowatt. The actual cost depends on your energy needs and roof type.'
    },
    {
      id: 5,
      category: 'cost',
      question: locale === 'hi' ? 'मैं कितना बचा सकता हूं?' : 'How much can I save on my electricity bills?',
      answer: locale === 'hi'
        ? 'हमारे ग्राहक आमतौर पर अपने बिजली बिलों में 70-90% की कमी देखते हैं। कुछ मामलों में, आप अतिरिक्त बिजली भी ग्रिड को बेच सकते हैं।'
        : 'Our customers typically see 70-90% reduction in their electricity bills. In some cases, you can even sell excess electricity back to the grid.'
    },
    {
      id: 6,
      category: 'cost',
      question: locale === 'hi' ? 'क्या वित्तपोषण विकल्प उपलब्ध हैं?' : 'Are financing options available?',
      answer: locale === 'hi'
        ? 'हां! हम 0% डाउन पेमेंट, आसान EMI विकल्प, और सब्सिडी सहायता प्रदान करते हैं। हमारे वित्त विशेषज्ञ आपके लिए सबसे अच्छा विकल्प खोजेंगे।'
        : 'Yes! We offer 0% down payment, easy EMI options, and subsidy assistance. Our finance experts will find the best option for you.'
    },

    // Maintenance FAQs
    {
      id: 7,
      category: 'maintenance',
      question: locale === 'hi' ? 'सोलर पैनलों का रखरखाव कैसे करें?' : 'How do I maintain solar panels?',
      answer: locale === 'hi'
        ? 'सोलर पैनल कम रखरखाव वाले होते हैं। नियमित सफाई और वार्षिक निरीक्षण पर्याप्त है। हम व्यापक रखरखाव पैकेज भी प्रदान करते हैं।'
        : 'Solar panels are low-maintenance. Regular cleaning and annual inspections are sufficient. We also offer comprehensive maintenance packages.'
    },
    {
      id: 8,
      category: 'maintenance',
      question: locale === 'hi' ? 'क्या होगा अगर पैनल टूट जाए?' : 'What happens if a panel breaks?',
      answer: locale === 'hi'
        ? 'हमारी 25-साल की व्यापक वारंटी सभी दोषों और क्षति को कवर करती है। हम 24-48 घंटों के भीतर मुफ्त प्रतिस्थापन प्रदान करते हैं।'
        : 'Our 25-year comprehensive warranty covers all defects and damage. We provide free replacement within 24-48 hours.'
    },

    // Technology FAQs
    {
      id: 9,
      category: 'technology',
      question: locale === 'hi' ? 'बादल के दिनों में सोलर पैनल कैसे काम करते हैं?' : 'How do solar panels work on cloudy days?',
      answer: locale === 'hi'
        ? 'सोलर पैनल बादल के दिनों में भी काम करते हैं, हालांकि कम क्षमता पर। आधुनिक पैनल बिखरी हुई धूप का भी उपयोग कर सकते हैं।'
        : 'Solar panels work on cloudy days too, though at reduced capacity. Modern panels can utilize diffused sunlight as well.'
    },
    {
      id: 10,
      category: 'technology',
      question: locale === 'hi' ? 'सोलर पैनल की जीवनकाल कितनी है?' : 'What is the lifespan of solar panels?',
      answer: locale === 'hi'
        ? 'उच्च गुणवत्ता वाले सोलर पैनल 25-30 साल या उससे अधिक चल सकते हैं। हम 25 साल की प्रदर्शन गारंटी प्रदान करते हैं।'
        : 'High-quality solar panels last 25-30 years or more. We provide a 25-year performance guarantee.'
    },

    // Warranty FAQs
    {
      id: 11,
      category: 'warranty',
      question: locale === 'hi' ? 'आपकी वारंटी में क्या शामिल है?' : 'What does your warranty cover?',
      answer: locale === 'hi'
        ? 'हमारी व्यापक वारंटी में उत्पाद दोष, स्थापना कार्य, प्रदर्शन गारंटी, और मुफ्त रखरखाव शामिल है। यह 25 साल तक वैध है।'
        : 'Our comprehensive warranty covers product defects, installation work, performance guarantee, and free maintenance. It\'s valid for 25 years.'
    },
    {
      id: 12,
      category: 'warranty',
      question: locale === 'hi' ? 'वारंटी क्लेम कैसे करें?' : 'How do I claim warranty?',
      answer: locale === 'hi'
        ? 'बस हमें कॉल करें या ऑनलाइन सर्विस रिक्वेस्ट भेजें। हमारी टीम 24 घंटे के भीतर प्रतिक्रिया देगी और आवश्यक सहायता प्रदान करेगी।'
        : 'Simply call us or submit an online service request. Our team will respond within 24 hours and provide necessary assistance.'
    }
  ];

  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
            <span className="text-sm font-semibold text-orange-600">
              {locale === 'hi' ? 'सामान्य प्रश्न' : 'FAQ'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {locale === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {locale === 'hi' 
              ? 'सोलर एनर्जी के बारे में आपके सभी सवालों के जवाब यहाँ हैं'
              : 'Find answers to all your solar energy questions here'
            }
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder={locale === 'hi' ? 'प्रश्न खोजें...' : 'Search questions...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors rounded-2xl"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                    : 'bg-white/70 hover:bg-white border-gray-200/50 hover:border-orange-300'
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-xl p-8 text-center">
              <div className="text-gray-500">
                <HelpCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">
                  {locale === 'hi' 
                    ? 'कोई प्रश्न नहीं मिले। कृपया अलग खोजशब्द का प्रयास करें।'
                    : 'No questions found. Please try different search terms.'
                  }
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id} className="bg-white/60 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <Button
                      variant="ghost"
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-6 text-left justify-between hover:bg-orange-50/50 transition-all duration-300 h-auto"
                    >
                      <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-orange-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )}
                    </Button>
                    
                    {expandedFAQ === faq.id && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-4 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-2xl max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                {locale === 'hi' ? 'अभी भी प्रश्न हैं?' : 'Still Have Questions?'}
              </h3>
              <p className="text-orange-100 mb-6">
                {locale === 'hi' 
                  ? 'हमारे विशेषज्ञों से सीधे बात करें और मुफ्त परामर्श प्राप्त करें'
                  : 'Talk to our experts directly and get a free consultation'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+919876543210">
                  <Button className="bg-white text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <Phone className="mr-2 h-5 w-5" />
                    {locale === 'hi' ? 'अभी कॉल करें' : 'Call Now'}
                  </Button>
                </a>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 transition-all duration-300">
                  {locale === 'hi' ? 'मुफ्त कोटेशन प्राप्त करें' : 'Get Free Quote'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;