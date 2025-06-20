"use client";
import { useState, useEffect, useRef } from 'react';
import { X, Bot, Send, User, Sparkles, MessageSquare } from 'lucide-react';
import { useLocale } from 'next-intl';

// Chatbot Knowledge Base
const solarKnowledge = {
  en: {
    greetings: [
      "Hello! I'm your Solar Energy Assistant. I can help you with costs, subsidies, installation, financing, and technical questions. What would you like to know?",
      "Hi there! I'm here to help you understand solar energy solutions. Ask me about costs, government subsidies, installation types, or savings!",
      "Welcome! I can answer questions about solar costs, installation process, government subsidies, financing options, and more. How can I help?"
    ],
    
    quickReplies: [
      { text: "💰 Solar Costs", keyword: "cost" },
      { text: "🏛️ Government Subsidies", keyword: "subsidy" },
      { text: "🔧 Installation Process", keyword: "installation" },
      { text: "💳 Financing Options", keyword: "financing" },
      { text: "⚡ System Types", keyword: "types" },
      { text: "📊 Savings Calculator", keyword: "savings" }
    ],

    responses: {
      cost: [
        "💰 **Solar System Costs in India:**\n\n• **Residential (1-10kW):** ₹40,000-₹80,000 per kW\n• **Commercial (10kW+):** ₹35,000-₹65,000 per kW\n• **5kW home system:** ₹2-4 lakhs (after subsidies)\n• **10kW system:** ₹4-7 lakhs (after subsidies)\n\n*Prices include panels, inverter, installation & 5-year warranty*\n\nWould you like a personalized quote? 📋"
      ],
      
      subsidy: [
        "🏛️ **Government Subsidies Available:**\n\n• **Central Subsidy:** Up to ₹18,000 per kW (max 3kW)\n• **State Subsidies:** Additional 10-30% in many states\n• **Net Metering:** Sell excess power back to grid\n• **Tax Benefits:** 30% depreciation for businesses\n• **Low-interest loans:** 2-6% interest rates\n\n**Example:** 5kW system costs ₹3L → After subsidy ₹1.8L\n\nWhich state are you in? I can check specific subsidies! 🗺️"
      ],
      
      installation: [
        "🔧 **Solar Installation Process:**\n\n**Step 1:** Site Survey & Design (1-2 days)\n**Step 2:** Permits & Approvals (7-15 days)\n**Step 3:** Equipment Procurement (3-7 days)\n**Step 4:** Installation (1-3 days)\n**Step 5:** Grid Connection & Testing (2-5 days)\n**Step 6:** Net Metering Setup (7-30 days)\n\n⏱️ **Total Time:** 3-8 weeks\n🏠 **Roof Requirements:** 100 sq ft per kW\n\nNeed a site assessment? We offer free surveys! 📋"
      ],
      
      financing: [
        "💳 **Solar Financing Options:**\n\n**1. Cash Purchase** ✅ Best ROI, immediate ownership\n**2. Solar Loan** 🏦 2-6% interest, 5-15 year terms\n**3. Lease/PPA** 📄 ₹0 down, pay monthly\n**4. NBFC Financing** 💰 Up to 80% funding\n\n**EMI Example:**\n₹5L system → ₹8,500/month for 5 years\nSavings: ₹12,000/month\n**Net Benefit:** ₹3,500/month from day 1! 📈\n\nWant to calculate your EMI? 🧮"
      ],
      
      types: [
        "⚡ **Solar System Types:**\n\n**🔌 On-Grid (Grid-Tied)**\n• Connected to electricity grid\n• Sell excess power back\n• No battery backup\n• Cost: ₹40-60k per kW\n• Best for: Reliable grid areas\n\n**🔋 Off-Grid (Standalone)**\n• Complete independence\n• Battery backup included\n• Works during power cuts\n• Cost: ₹80-120k per kW\n• Best for: Remote areas\n\n**⚡🔋 Hybrid System**\n• Best of both worlds\n• Grid connection + batteries\n• Backup during outages\n• Cost: ₹70-100k per kW\n• Best for: Urban areas with power cuts\n\nWhich type interests you? 🤔"
      ],
      
      savings: [
        "📊 **Solar Savings Calculator:**\n\n**Example 5kW System:**\n• Monthly Generation: 750 units\n• Current Bill: ₹15,000/month\n• With Solar: ₹2,000/month\n• **Monthly Savings: ₹13,000** 💰\n• **Annual Savings: ₹1,56,000** 📈\n• **25-year Savings: ₹39 lakhs** 🎯\n\n**Payback Period:** 3-4 years\n**ROI:** 25-30% annually\n\nTo calculate YOUR savings, I need:\n• Monthly electricity bill amount\n• Location (for sunlight hours)\n• Roof space available\n\nShall we calculate your potential savings? 🧮"
      ],
      
      technical: [
        "🔬 **Technical Information:**\n\n**Panel Types:**\n• Monocrystalline: 20-22% efficiency, premium\n• Polycrystalline: 18-20% efficiency, economical\n• Bifacial: 25% more power, latest technology\n\n**Inverter Types:**\n• String Inverters: Cost-effective\n• Power Optimizers: Better performance\n• Microinverters: Maximum efficiency\n\n**System Specifications:**\n• Warranty: 25 years on panels, 5-12 years on inverters\n• Performance: 80% efficiency after 25 years\n• Maintenance: Minimal, cleaning 2-4 times/year\n\nAny specific technical questions? ⚙️"
      ],
      
      maintenance: [
        "🧹 **Solar Maintenance Guide:**\n\n**Monthly:** Visual inspection\n**Quarterly:** Panel cleaning (more in dusty areas)\n**Annually:** Professional checkup\n\n**Cleaning Tips:**\n• Early morning or evening\n• Use soft brush and water\n• Avoid harsh chemicals\n• Professional cleaning available\n\n**Monitoring:**\n• Mobile app for performance tracking\n• Alert system for issues\n• Remote monitoring included\n\n**Costs:** ₹2-5k annually\n**Performance impact:** 15-20% loss if not cleaned\n\nWant to know about our maintenance packages? 🔧"
      ]
    },

    fallback: [
      "I understand you're asking about solar energy! While I might not have the exact answer, I can help with costs, subsidies, installation, financing, system types, or savings calculations. Could you try asking about one of these topics?",
      "That's a great question! I specialize in solar costs, government subsidies, installation process, financing options, system types (on-grid/off-grid/hybrid), and savings calculations. Could you rephrase your question using one of these topics?",
      "I'm here to help with solar energy questions! I can provide detailed information about pricing, government incentives, installation procedures, financing, technical specifications, and potential savings. What specific aspect would you like to know about?"
    ],

    leadCapture: [
      "I'd love to provide you with a personalized quote! Could you share:\n• Your location\n• Monthly electricity bill\n• Available roof space\n\nOr would you prefer our expert to call you? 📞",
      "To give you accurate information, I'll need a few details. Would you like to:\n• Get a quick online estimate\n• Schedule a free site visit\n• Speak with our solar consultant\n\nWhat works best for you? 🤔"
    ]
  },

  hi: {
    greetings: [
      "नमस्ते! मैं आपका सोलर एनर्जी असिस्टेंट हूं। मैं लागत, सब्सिडी, इंस्टॉलेशन, फाइनेंसिंग और तकनीकी सवालों में आपकी मदद कर सकता हूं। आप क्या जानना चाहते हैं?",
      "हैलो! मैं सोलर एनर्जी सॉल्यूशन्स समझाने के लिए यहां हूं। मुझसे लागत, सरकारी सब्सिडी, इंस्टॉलेशन के प्रकार या बचत के बारे में पूछें!",
      "स्वागत है! मैं सोलर लागत, इंस्टॉलेशन प्रक्रिया, सरकारी सब्सिडी, फाइनेंसिंग विकल्प और बहुत कुछ के बारे में सवालों का जवाब दे सकता हूं। मैं कैसे मदद कर सकता हूं?"
    ],

    quickReplies: [
      { text: "💰 सोलर लागत", keyword: "cost" },
      { text: "🏛️ सरकारी सब्सिडी", keyword: "subsidy" },
      { text: "🔧 इंस्टॉलेशन प्रक्रिया", keyword: "installation" },
      { text: "💳 फाइनेंसिंग विकल्प", keyword: "financing" },
      { text: "⚡ सिस्टम के प्रकार", keyword: "types" },
      { text: "📊 बचत कैलकुलेटर", keyword: "savings" }
    ],

    responses: {
      cost: [
        "💰 **भारत में सोलर सिस्टम की लागत:**\n\n• **आवासीय (1-10kW):** ₹40,000-₹80,000 प्रति kW\n• **व्यावसायिक (10kW+):** ₹35,000-₹65,000 प्रति kW\n• **5kW घरेलू सिस्टम:** ₹2-4 लाख (सब्सिडी के बाद)\n• **10kW सिस्टम:** ₹4-7 लाख (सब्सिडी के बाद)\n\n*कीमतों में पैनल, इन्वर्टर, इंस्टॉलेशन और 5 साल की वारंटी शामिल है*\n\nक्या आपको व्यक्तिगत कोटेशन चाहिए? 📋"
      ],
      
      subsidy: [
        "🏛️ **उपलब्ध सरकारी सब्सिडी:**\n\n• **केंद्रीय सब्सिडी:** ₹18,000 प्रति kW तक (अधिकतम 3kW)\n• **राज्य सब्सिडी:** कई राज्यों में अतिरिक्त 10-30%\n• **नेट मीटरिंग:** अतिरिक्त बिजली ग्रिड को बेचें\n• **टैक्स लाभ:** व्यवसायों के लिए 30% डेप्रिसिएशन\n• **कम ब्याज लोन:** 2-6% ब्याज दरें\n\n**उदाहरण:** 5kW सिस्टम लागत ₹3L → सब्सिडी के बाद ₹1.8L\n\nआप किस राज्य में हैं? मैं विशिष्ट सब्सिडी चेक कर सकता हूं! 🗺️"
      ],
      
      installation: [
        "🔧 **सोलर इंस्टॉलेशन प्रक्रिया:**\n\n**चरण 1:** साइट सर्वे और डिज़ाइन (1-2 दिन)\n**चरण 2:** परमिट और अनुमोदन (7-15 दिन)\n**चरण 3:** उपकरण खरीदारी (3-7 दिन)\n**चरण 4:** इंस्टॉलेशन (1-3 दिन)\n**चरण 5:** ग्रिड कनेक्शन और टेस्टिंग (2-5 दिन)\n**चरण 6:** नेट मीटरिंग सेटअप (7-30 दिन)\n\n⏱️ **कुल समय:** 3-8 सप्ताह\n🏠 **छत की आवश्यकता:** 100 वर्ग फुट प्रति kW\n\nसाइट असेसमेंट चाहिए? हम मुफ्त सर्वे करते हैं! 📋"
      ],
      
      financing: [
        "💳 **सोलर फाइनेंसिंग विकल्प:**\n\n**1. नकद खरीदारी** ✅ सबसे अच्छा ROI, तत्काल स्वामित्व\n**2. सोलर लोन** 🏦 2-6% ब्याज, 5-15 साल की अवधि\n**3. लीज/PPA** 📄 ₹0 डाउन पेमेंट, मासिक भुगतान\n**4. NBFC फाइनेंसिंग** 💰 80% तक फंडिंग\n\n**EMI उदाहरण:**\n₹5L सिस्टम → ₹8,500/माह 5 साल के लिए\nबचत: ₹12,000/माह\n**शुद्ध लाभ:** पहले दिन से ₹3,500/माह! 📈\n\nअपनी EMI कैलकुलेट करना चाहते हैं? 🧮"
      ],
      
      types: [
        "⚡ **सोलर सिस्टम के प्रकार:**\n\n**🔌 ऑन-ग्रिड (ग्रिड-टाइड)**\n• बिजली ग्रिड से जुड़ा\n• अतिरिक्त बिजली वापस बेचें\n• बैटरी बैकअप नहीं\n• लागत: ₹40-60k प्रति kW\n• सबसे अच्छा: विश्वसनीय ग्रिड क्षेत्रों के लिए\n\n**🔋 ऑफ-ग्रिड (स्टैंडअलोन)**\n• पूर्ण स्वतंत्रता\n• बैटरी बैकअप शामिल\n• बिजली कटौती के दौरान काम करता है\n• लागत: ₹80-120k प्रति kW\n• सबसे अच्छा: दूरदराज के क्षेत्रों के लिए\n\n**⚡🔋 हाइब्रिड सिस्टम**\n• दोनों दुनिया का सबसे अच्छा\n• ग्रिड कनेक्शन + बैटरी\n• आउटेज के दौरान बैकअप\n• लागत: ₹70-100k प्रति kW\n• सबसे अच्छा: बिजली कटौती वाले शहरी क्षेत्रों के लिए\n\nकौन सा प्रकार आपकी रुचि का है? 🤔"
      ],
      
      savings: [
        "📊 **सोलर बचत कैलकुलेटर:**\n\n**उदाहरण 5kW सिस्टम:**\n• मासिक उत्पादन: 750 यूनिट\n• वर्तमान बिल: ₹15,000/माह\n• सोलर के साथ: ₹2,000/माह\n• **मासिक बचत: ₹13,000** 💰\n• **वार्षिक बचत: ₹1,56,000** 📈\n• **25-साल की बचत: ₹39 लाख** 🎯\n\n**पेबैक अवधि:** 3-4 साल\n**ROI:** सालाना 25-30%\n\nआपकी बचत कैलकुलेट करने के लिए, मुझे चाहिए:\n• मासिक बिजली बिल की राशि\n• स्थान (धूप के घंटों के लिए)\n• उपलब्ध छत की जगह\n\nक्या हम आपकी संभावित बचत कैलकुलेट करें? 🧮"
      ]
    },

    fallback: [
      "मैं समझ गया कि आप सोलर एनर्जी के बारे में पूछ रहे हैं! हो सकता है मेरे पास सटीक जवाब न हो, लेकिन मैं लागत, सब्सिडी, इंस्टॉलेशन, फाइनेंसिंग, सिस्टम प्रकार या बचत गणना में मदद कर सकता हूं। क्या आप इन विषयों में से किसी के बारे में पूछ सकते हैं?",
      "यह एक बेहतरीन सवाल है! मैं सोलर लागत, सरकारी सब्सिडी, इंस्टॉलेशन प्रक्रिया, फाइनेंसिंग विकल्प, सिस्टम प्रकार (ऑन-ग्रिड/ऑफ-ग्रिड/हाइब्रिड), और बचत गणना में विशेषज्ञ हूं। क्या आप इन विषयों में से किसी का उपयोग करके अपना सवाल दोबारा पूछ सकते हैं?"
    ],

    leadCapture: [
      "मुझे आपको व्यक्तिगत कोटेशन देना पसंद होगा! क्या आप साझा कर सकते हैं:\n• आपका स्थान\n• मासिक बिजली बिल\n• उपलब्ध छत की जगह\n\nया आप चाहते हैं कि हमारे विशेषज्ञ आपको कॉल करें? 📞",
      "आपको सटीक जानकारी देने के लिए, मुझे कुछ विवरण चाहिए। क्या आप चाहेंगे:\n• तुरंत ऑनलाइन अनुमान लगाना\n• मुफ्त साइट विज़िट शेड्यूल करना\n• हमारे सोलर सलाहकार से बात करना\n\nआपके लिए क्या सबसे अच्छा है? 🤔"
    ]
  }
};

// Enhanced keyword detection
const detectIntent = (message: string, locale: string) => {
  const msg = message.toLowerCase();
  
  // Cost related keywords
  if (msg.match(/(cost|price|rate|charge|लागत|कीमत|दर|खर्च)/)) return 'cost';
  
  // Subsidy related keywords  
  if (msg.match(/(subsidy|subsidi|incentive|government|सब्सिडी|सरकारी|प्रोत्साहन)/)) return 'subsidy';
  
  // Installation related keywords
  if (msg.match(/(install|setup|process|installation|इंस्टॉल|स्थापना|प्रक्रिया)/)) return 'installation';
  
  // Financing related keywords
  if (msg.match(/(loan|finance|emi|payment|लोन|वित्त|भुगतान|किस्त)/)) return 'financing';
  
  // System types
  if (msg.match(/(grid|off.?grid|on.?grid|hybrid|type|ग्रिड|हाइब्रिड|प्रकार)/)) return 'types';
  
  // Savings related keywords
  if (msg.match(/(save|saving|benefit|profit|बचत|फायदा|लाभ)/)) return 'savings';
  
  // Technical keywords
  if (msg.match(/(technical|panel|inverter|efficiency|तकनीकी|पैनल|इन्वर्टर)/)) return 'technical';
  
  // Maintenance keywords
  if (msg.match(/(maintenance|clean|service|रखरखाव|सफाई|सेवा)/)) return 'maintenance';
  
  return 'fallback';
};

const AIChatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isBot: boolean, timestamp: Date}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    console.log('AI Chatbot mounted');
    const timer = setTimeout(() => {
      setIsVisible(true);
      console.log('AI Chatbot is now visible');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addMessage = (text: string, isBot: boolean = false) => {
    setMessages(prev => [...prev, { text, isBot, timestamp: new Date() }]);
  };

  const getBotResponse = (userMessage: string) => {
    const intent = detectIntent(userMessage, locale);
    const lang = locale === 'hi' ? 'hi' : 'en';
    const responses = solarKnowledge[lang].responses;
    
    if (responses[intent as keyof typeof responses]) {
      const responseArray = responses[intent as keyof typeof responses];
      return responseArray[Math.floor(Math.random() * responseArray.length)];
    }
    
    // Fallback response
    const fallbacks = solarKnowledge[lang].fallback;
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSendMessage = (message: string = inputMessage) => {
    if (!message.trim()) return;
    
    // Add user message
    addMessage(message, false);
    setInputMessage('');
    setShowQuickReplies(false);
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(message);
      addMessage(response, true);
      setIsTyping(false);
      
      // Show lead capture after 3 interactions
      if (messages.length > 4 && Math.random() > 0.7) {
        setTimeout(() => {
          const lang = locale === 'hi' ? 'hi' : 'en';
          const leadMsg = solarKnowledge[lang].leadCapture[Math.floor(Math.random() * solarKnowledge[lang].leadCapture.length)];
          addMessage(leadMsg, true);
        }, 2000);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (keyword: string) => {
    const lang = locale === 'hi' ? 'hi' : 'en';
    const quickReply = solarKnowledge[lang].quickReplies.find(qr => qr.keyword === keyword);
    if (quickReply) {
      handleSendMessage(quickReply.text);
    }
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      const lang = locale === 'hi' ? 'hi' : 'en';
      const greeting = solarKnowledge[lang].greetings[Math.floor(Math.random() * solarKnowledge[lang].greetings.length)];
      addMessage(greeting, true);
    }
  };

  const openChat = () => {
    console.log('Opening AI Solar Chatbot');
    setShowChat(true);
    initializeChat();
  };

  const closeChat = () => {
    setShowChat(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* AI Chatbot Button */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: '24px', 
          right: '24px', 
          zIndex: 9999,
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        <button
          onClick={openChat}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.4)';
          }}
          title={locale === 'hi' ? 'AI सोलर असिस्टेंट से बात करें' : 'Chat with AI Solar Assistant'}
        >
          {/* Animated background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            animation: 'shimmer 3s infinite linear'
          }}></div>
          
          {/* Main Bot Icon */}
          <Bot size={32} style={{ zIndex: 1 }} />
          
          {/* AI Badge */}
          <div style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '28px',
            height: '28px',
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 'bold',
            color: 'white',
            border: '3px solid white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            AI
          </div>
          
          {/* Sparkle Animation */}
          <Sparkles 
            size={16} 
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              animation: 'sparkle 2s infinite ease-in-out',
              opacity: 0.8
            }} 
          />
          
          {/* Pulse Ring */}
          <div style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            border: '2px solid rgba(102, 126, 234, 0.3)',
            animation: 'pulse-ring 2s infinite cubic-bezier(0.4, 0, 0.6, 1)'
          }}></div>
        </button>

        {/* Chat Indicator */}
        {!showChat && (
          <div style={{
            position: 'absolute',
            bottom: '80px',
            right: '0',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            opacity: 0,
            animation: 'slideInFade 0.5s ease-out 3s forwards',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            💬 {locale === 'hi' ? 'AI से पूछें' : 'Ask AI'}
          </div>
        )}
      </div>

      {/* Enhanced AI Chat Modal */}
      {showChat && (
        <div style={{
          position: 'fixed',
          bottom: '110px',
          right: '24px',
          width: '380px',
          height: '500px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          border: '1px solid #e5e7eb',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
          animation: 'slideUpFade 0.3s ease-out'
        }}>
          {/* Enhanced Chat Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              animation: 'shimmer 4s infinite linear'
            }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1 }}>
              <div style={{
                width: '44px',
                height: '44px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <Bot size={24} />
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '12px',
                  height: '12px',
                  background: '#10b981',
                  borderRadius: '50%',
                  border: '2px solid white'
                }}></div>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {locale === 'hi' ? 'पूर्वोदय AI सोलर एक्सपर्ट' : 'Purvodaya AI Solar Expert'}
                  <Sparkles size={16} style={{ opacity: 0.8 }} />
                </h3>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
                  ⚡ {locale === 'hi' ? 'तुरंत जवाब देता है' : 'Instant Solar Answers'}
                </p>
              </div>
            </div>
            <button
              onClick={closeChat}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease',
                zIndex: 1
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div style={{ 
            flex: 1, 
            padding: '20px', 
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)'
          }}>
            {messages.map((message, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: message.isBot ? 'row' : 'row-reverse',
                alignItems: 'flex-start',
                gap: '12px',
                animation: `messageSlide 0.3s ease-out ${index * 0.1}s backwards`
              }}>
                {message.isBot && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                  }}>
                    <Bot size={16} color="white" />
                  </div>
                )}
                
                <div style={{
                  background: message.isBot ? 'white' : 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: message.isBot ? '#374151' : 'white',
                  padding: '14px 16px',
                  borderRadius: message.isBot ? '18px 18px 18px 6px' : '18px 18px 6px 18px',
                  fontSize: '14px',
                  maxWidth: '75%',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-line',
                  boxShadow: message.isBot ? '0 2px 12px rgba(0,0,0,0.1)' : '0 2px 12px rgba(102, 126, 234, 0.3)',
                  border: message.isBot ? '1px solid #e5e7eb' : 'none'
                }}>
                  {message.text}
                </div>
                
                {!message.isBot && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: '#e5e7eb',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <User size={16} color="#6b7280" />
                  </div>
                )}
              </div>
            ))}

            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                animation: 'messageSlide 0.3s ease-out'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                }}>
                  <Bot size={16} color="white" />
                </div>
                <div style={{
                  background: 'white',
                  padding: '14px 16px',
                  borderRadius: '18px 18px 18px 6px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#667eea',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out'
                    }}></div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#667eea',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out 0.16s'
                    }}></div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#667eea',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out 0.32s'
                    }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Quick Reply Buttons */}
            {showQuickReplies && messages.length > 0 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '12px',
                animation: 'slideUpFade 0.5s ease-out 0.5s backwards'
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  fontWeight: '600',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <MessageSquare size={14} />
                  {locale === 'hi' ? 'त्वरित विकल्प:' : 'Quick topics:'}
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {solarKnowledge[locale === 'hi' ? 'hi' : 'en'].quickReplies.slice(0, 6).map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply.keyword)}
                      style={{
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '20px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        color: '#374151',
                        fontWeight: '500',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#374151';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                      }}
                    >
                      {reply.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Chat Input */}
          <div style={{ 
            padding: '20px', 
            borderTop: '1px solid #e5e7eb',
            background: 'white',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px'
          }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-end'
            }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={locale === 'hi' ? 'सोलर के बारे में पूछें...' : 'Ask about solar energy...'}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '25px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  background: '#f8fafc'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.background = '#f8fafc';
                }}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                style={{
                  background: inputMessage.trim() ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#e5e7eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  boxShadow: inputMessage.trim() ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none'
                }}
                onMouseOver={(e) => {
                  if (inputMessage.trim()) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = inputMessage.trim() ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none';
                }}
              >
                <Send size={18} />
              </button>
            </form>
            
            {/* Enhanced powered by indicator */}
            <div style={{
              textAlign: 'center',
              marginTop: '12px',
              fontSize: '11px',
              color: '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}>
              <Sparkles size={12} />
              {locale === 'hi' ? 'AI द्वारा संचालित' : 'Powered by AI'} • {locale === 'hi' ? 'पूर्वोदय एनर्जी' : 'Purvodaya Energy'}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        
        @keyframes slideInFade {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default AIChatbot;