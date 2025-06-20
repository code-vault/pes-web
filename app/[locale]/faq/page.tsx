"use client";
import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import ScrollReveal from '@/components/ScrollReveal';

type Props = {
  params: Promise<{locale: string}>;
};

export default function FAQPage({params}: Props) {
  const locale = useLocale();
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // FAQ Data with both languages
  const faqData = locale === 'hi' ? [
    {
      question: "सोलर पैनल की लागत कितनी है?",
      answer: "सोलर पैनल की लागत सिस्टम के आकार और स्थान के आधार पर अलग होती है। भारत में, आवासीय सिस्टम की लागत आमतौर पर सब्सिडी से पहले ₹40,000-₹80,000 प्रति kW होती है। सरकारी सब्सिडी के बाद 5kW घरेलू सिस्टम की लागत लगभग ₹2-4 लाख होती है।\n\nलागत को प्रभावित करने वाले कारक:\n• सिस्टम का आकार (kW क्षमता)\n• पैनल की गुणवत्ता और प्रकार\n• इन्वर्टर तकनीक\n• इंस्टॉलेशन की जटिलता\n• स्थान और स्थानीय नियम\n\nहम विस्तृत लागत विवरण के साथ मुफ्त कोटेशन प्रदान करते हैं।"
    },
    {
      question: "सोलर एनर्जी से मैं कितनी बचत कर सकता हूं?",
      answer: "सोलर बचत आपके वर्तमान बिजली बिल और सिस्टम के आकार पर निर्भर करती है। अधिकांश ग्राहक अपने मासिक बिजली बिल में 70-90% की बचत करते हैं।\n\n5kW सिस्टम के लिए उदाहरण बचत:\n• मासिक बिल में कमी: ₹10,000-₹15,000\n• वार्षिक बचत: ₹1.2-1.8 लाख\n• 25-साल की बचत: ₹30-45 लाख\n\nपेबैक अवधि आमतौर पर 3-4 साल होती है, जिसके बाद आप 20+ साल तक मुफ्त बिजली का आनंद लेते हैं।"
    },
    {
      question: "कौन सी सरकारी सब्सिडी उपलब्ध हैं?",
      answer: "कई सरकारी प्रोत्साहन सोलर को और किफायती बनाते हैं:\n\n• केंद्र सरकार सब्सिडी: ₹18,000 प्रति kW तक (अधिकतम 3kW)\n• राज्य सब्सिडी: कई राज्यों में अतिरिक्त 10-30%\n• नेट मीटरिंग: अतिरिक्त बिजली ग्रिड को वापस बेचें\n• त्वरित मूल्यह्रास: व्यवसायों के लिए 40%\n• GST लाभ: सोलर सिस्टम पर 5% GST\n• कम ब्याज लोन: विभिन्न बैंकों से 2-6%\n\nकुल सब्सिडी लागत को 30-50% तक कम कर सकती है।"
    },
    {
      question: "सोलर इंस्टॉलेशन में कितना समय लगता है?",
      answer: "पूर्ण सोलर इंस्टॉलेशन में आमतौर पर 3-8 सप्ताह लगते हैं:\n\n• साइट सर्वे और डिज़ाइन: 1-2 दिन\n• परमिट और अनुमोदन: 7-15 दिन\n• उपकरण खरीदारी: 3-7 दिन\n• वास्तविक इंस्टॉलेशन: 1-3 दिन\n• ग्रिड कनेक्शन और टेस्टिंग: 2-5 दिन\n• नेट मीटरिंग सेटअप: 7-30 दिन\n\nहम सभी कागजी कार्रवाई संभालते हैं और सुचारू इंस्टॉलेशन सुनिश्चित करने के लिए बिजली बोर्डों के साथ समन्वय करते हैं।"
    },
    {
      question: "ऑन-ग्रिड, ऑफ-ग्रिड और हाइब्रिड सिस्टम में क्या अंतर है?",
      answer: "सोलर सिस्टम के तीन मुख्य प्रकार:\n\n**ऑन-ग्रिड (ग्रिड-टाइड):**\n• बिजली ग्रिड से जुड़ा\n• कोई बैटरी बैकअप नहीं\n• अतिरिक्त बिजली वापस बेचें\n• लागत: ₹40-60k प्रति kW\n• विश्वसनीय ग्रिड वाले क्षेत्रों के लिए सबसे अच्छा\n\n**ऑफ-ग्रिड (स्टैंडअलोन):**\n• ग्रिड से पूर्ण स्वतंत्रता\n• बैटरी बैकअप शामिल\n• बिजली कटौती के दौरान काम करता है\n• लागत: ₹80-120k प्रति kW\n• दूरदराज के क्षेत्रों के लिए सबसे अच्छा\n\n**हाइब्रिड सिस्टम:**\n• ग्रिड कनेक्शन + बैटरी बैकअप\n• दोनों दुनिया का सबसे अच्छा\n• आउटेज के दौरान बैकअप\n• लागत: ₹70-100k प्रति kW\n• बार-बार बिजली कटौती वाले शहरी क्षेत्रों के लिए सबसे अच्छा"
    },
    {
      question: "सोलर पैनल कितने समय तक चलते हैं और क्या रखरखाव की आवश्यकता है?",
      answer: "सोलर पैनल लंबे समय तक चलने के लिए बनाए गए हैं:\n\n**जीवनकाल:**\n• सोलर पैनल: 25-30 साल\n• इन्वर्टर: 10-15 साल\n• बैटरी (यदि लागू हो): 5-10 साल\n• प्रदर्शन गारंटी: 25 साल बाद 80% दक्षता\n\n**रखरखाव:**\n• मासिक: दृश्य निरीक्षण\n• त्रैमासिक: पैनल सफाई (धूल भरे क्षेत्रों में अधिक)\n• वार्षिक: पेशेवर सिस्टम चेकअप\n• मॉनिटरिंग: मोबाइल ऐप के माध्यम से 24/7\n\n**रखरखाव लागत:** सालाना ₹2,000-5,000\n**सफाई का प्रभाव:** नियमित सफाई न करने पर 15-20% प्रदर्शन हानि\n\nहम व्यापक रखरखाव पैकेज और 24/7 मॉनिटरिंग सेवाएं प्रदान करते हैं।"
    },
    {
      question: "क्या मैं सोलर पैनल बिजली वापस बेच सकता हूं?",
      answer: "हां! नेट मीटरिंग के माध्यम से आप अतिरिक्त बिजली वापस बेच सकते हैं:\n\n**नेट मीटरिंग के फायदे:**\n• दिन में अतिरिक्त बिजली ग्रिड को भेजें\n• रात में या बादल के दिनों में ग्रिड से बिजली लें\n• महीने के अंत में नेट कैलकुलेशन\n• अतिरिक्त यूनिट्स का पैसा मिले\n\n**प्रक्रिया:**\n• नेट मीटर इंस्टॉलेशन\n• बिजली बोर्ड से अनुमोदन\n• द्विदिशीय मीटरिंग\n• मासिक बिलिंग\n\nयह आपकी निवेश वापसी को तेज़ करता है!"
    },
    {
      question: "क्या सोलर पैनल बारिश और तूफान में काम करते हैं?",
      answer: "हां, सोलर पैनल सभी मौसम की स्थितियों में काम करने के लिए डिज़ाइन किए गए हैं:\n\n**मौसम प्रतिरोध:**\n• बारिश: पानी प्रतिरोधी, वास्तव में सफाई में मदद करती है\n• तूफान: 200+ kmph हवा की गति सहन कर सकते हैं\n• ओलावृष्टि: टेम्पर्ड ग्लास से सुरक्षित\n• बर्फ: -40°C तक काम करते हैं\n• गर्मी: +85°C तक प्रदर्शन बना रहता है\n\n**बादल के दिन:**\n• 10-25% बिजली उत्पादन जारी रहता है\n• ग्रिड कनेक्शन से कमी पूरी होती है\n• हाइब्रिड सिस्टम में बैटरी बैकअप\n\n**वारंटी:** सभी मौसम के नुकसान के लिए 25 साल की वारंटी।"
    }
  ] : [
    {
      question: "How much do solar panels cost?",
      answer: "Solar panel costs vary based on system size and location. In India, residential systems typically cost ₹40,000-₹80,000 per kW before subsidies. A 5kW home system costs around ₹2-4 lakhs after government subsidies.\n\nFactors affecting cost:\n• System size (kW capacity)\n• Panel quality and type\n• Inverter technology\n• Installation complexity\n• Location and local regulations\n\nWe provide free quotes with detailed cost breakdowns."
    },
    {
      question: "How much can I save with solar energy?",
      answer: "Solar savings depend on your current electricity bill and system size. Most customers save 70-90% on their monthly electricity bills.\n\nExample savings for a 5kW system:\n• Monthly bill reduction: ₹10,000-₹15,000\n• Annual savings: ₹1.2-1.8 lakhs\n• 25-year savings: ₹30-45 lakhs\n\nPayback period is typically 3-4 years, after which you enjoy free electricity for 20+ years."
    },
    {
      question: "What government subsidies are available?",
      answer: "Multiple government incentives make solar more affordable:\n\n• Central Government Subsidy: Up to ₹18,000 per kW (max 3kW)\n• State Subsidies: Additional 10-30% in many states\n• Net Metering: Sell excess power back to grid\n• Accelerated Depreciation: 40% for businesses\n• GST Benefits: 5% GST on solar systems\n• Low-interest loans: 2-6% from various banks\n\nTotal subsidies can reduce costs by 30-50%."
    },
    {
      question: "How long does solar installation take?",
      answer: "Complete solar installation typically takes 3-8 weeks:\n\n• Site survey and design: 1-2 days\n• Permits and approvals: 7-15 days\n• Equipment procurement: 3-7 days\n• Actual installation: 1-3 days\n• Grid connection and testing: 2-5 days\n• Net metering setup: 7-30 days\n\nWe handle all paperwork and coordinate with electricity boards to ensure smooth installation."
    },
    {
      question: "What's the difference between on-grid, off-grid, and hybrid systems?",
      answer: "Three main types of solar systems:\n\n**On-Grid (Grid-Tied):**\n• Connected to electricity grid\n• No battery backup\n• Sell excess power back\n• Cost: ₹40-60k per kW\n• Best for areas with reliable grid\n\n**Off-Grid (Standalone):**\n• Complete independence from grid\n• Battery backup included\n• Works during power cuts\n• Cost: ₹80-120k per kW\n• Best for remote areas\n\n**Hybrid System:**\n• Grid connection + battery backup\n• Best of both worlds\n• Backup during outages\n• Cost: ₹70-100k per kW\n• Best for urban areas with frequent power cuts"
    },
    {
      question: "How long do solar panels last and what maintenance is required?",
      answer: "Solar panels are built to last:\n\n**Lifespan:**\n• Solar panels: 25-30 years\n• Inverters: 10-15 years\n• Batteries (if applicable): 5-10 years\n• Performance guarantee: 80% efficiency after 25 years\n\n**Maintenance:**\n• Monthly: Visual inspection\n• Quarterly: Panel cleaning (more in dusty areas)\n• Annually: Professional system checkup\n• Monitoring: 24/7 via mobile app\n\n**Maintenance costs:** ₹2,000-5,000 annually\n**Cleaning impact:** 15-20% performance loss if not cleaned regularly\n\nWe provide comprehensive maintenance packages and 24/7 monitoring services."
    },
    {
      question: "Can I sell excess electricity back to the grid?",
      answer: "Yes! Through net metering, you can sell excess electricity back to the grid:\n\n**Net Metering Benefits:**\n• Send excess power to grid during the day\n• Draw power from grid at night or cloudy days\n• Net calculation at month-end\n• Get paid for extra units generated\n\n**Process:**\n• Net meter installation\n• Electricity board approval\n• Bi-directional metering\n• Monthly billing adjustments\n\nThis accelerates your return on investment and can even result in negative electricity bills!"
    },
    {
      question: "Do solar panels work during rain and storms?",
      answer: "Yes, solar panels are designed to work in all weather conditions:\n\n**Weather Resistance:**\n• Rain: Water-resistant, actually helps with cleaning\n• Storms: Can withstand 200+ kmph wind speeds\n• Hail: Protected by tempered glass\n• Snow: Functional down to -40°C\n• Heat: Performance maintained up to +85°C\n\n**Cloudy Days:**\n• 10-25% power generation continues\n• Grid connection compensates for shortfall\n• Battery backup in hybrid systems\n\n**Warranty:** 25-year warranty covers all weather-related damage."
    }
  ];

  const pageTitle = locale === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions';
  const pageSubtitle = locale === 'hi' 
    ? 'सोलर एनर्जी, इंस्टॉलेशन, लागत और बचत के बारे में सबसे अधिक पूछे जाने वाले प्रश्नों के उत्तर खोजें।'
    : 'Find answers to the most frequently asked questions about solar energy, installation, costs, and savings.';
  const backToHomeText = locale === 'hi' ? 'होम पर वापस जाएं' : 'Back to Home';
  const stillHaveQuestionsText = locale === 'hi' ? 'अभी भी प्रश्न हैं?' : 'Still have questions?';
  const contactUsText = locale === 'hi' 
    ? 'हमारे सोलर विशेषज्ञ आपकी ऊर्जा आवश्यकताओं के लिए सर्वोत्तम निर्णय लेने में आपकी सहायता के लिए यहां हैं।'
    : 'Our solar experts are here to help you make the best decision for your energy needs.';
  const callExpertText = locale === 'hi' ? 'विशेषज्ञ को कॉल करें' : 'Call Expert';
  const emailUsText = locale === 'hi' ? 'ईमेल करें' : 'Email Us';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 pt-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header with ScrollReveal */}
        <div className="mb-12">
          <ScrollReveal direction="up" delay={100}>
            <Link href="/">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backToHomeText}
              </Button>
            </Link>
          </ScrollReveal>
          
          <div className="text-center">
            <ScrollReveal direction="up" delay={300}>
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
                <HelpCircle className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-sm font-semibold text-orange-600">
                  {locale === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={500}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                {pageTitle}
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={700}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {pageSubtitle}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* FAQ Items with ScrollReveal */}
        <div className="space-y-4 mb-12">
          {faqData.map((item, index) => (
            <ScrollReveal 
              key={index}
              direction="up" 
              delay={900 + (index * 100)}
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-200"
                  aria-expanded={openItems.includes(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openItems.includes(index) ? (
                        <ChevronUp className="h-6 w-6 text-orange-500 transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-400 transition-transform duration-200" />
                      )}
                    </div>
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.includes(index) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-200/50 pt-4">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Contact Section with ScrollReveal */}
        <ScrollReveal direction="up" delay={1500}>
          <div className="text-center">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{stillHaveQuestionsText}</h3>
              <p className="text-orange-100 mb-6 text-lg">
                {contactUsText}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.href = 'tel:+919876543210'}
                  className="bg-white text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {callExpertText}
                </Button>
                <Button 
                  onClick={() => window.location.href = 'mailto:info@purvodayaenergy.com?subject=Solar Installation Inquiry'}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 transition-all duration-300"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {emailUsText}
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}