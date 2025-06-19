"use client";
import { useState, useEffect } from 'react';
import { Phone, X, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

const FloatingClickToCall = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsApp = () => {
    const message = locale === 'hi' 
      ? 'नमस्ते! मुझे सोलर इंस्टॉलेशन के बारे में जानकारी चाहिए।'
      : 'Hello! I would like information about solar installation.';
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@purvodayaenergy.com?subject=Solar Installation Inquiry';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Options */}
      {isExpanded && (
        <div className="mb-4 space-y-3 animate-in slide-in-from-bottom duration-300">
          {/* WhatsApp Button */}
          <Button
            onClick={handleWhatsApp}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
            title={locale === 'hi' ? 'WhatsApp पर संदेश भेजें' : 'Send WhatsApp Message'}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>

          {/* Email Button */}
          <Button
            onClick={handleEmail}
            className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
            title={locale === 'hi' ? 'ईमेल भेजें' : 'Send Email'}
          >
            <Mail className="h-6 w-6" />
          </Button>

          {/* Direct Call Button */}
          <Button
            onClick={handleCall}
            className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
            title={locale === 'hi' ? 'तुरंत कॉल करें' : 'Call Now'}
          >
            <Phone className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Main CTA Button */}
      <div className="relative">
        <Button
          onClick={toggleExpanded}
          className={`w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group ${
            isExpanded ? 'rotate-45' : ''
          }`}
          title={locale === 'hi' ? 'संपर्क विकल्प' : 'Contact Options'}
        >
          {isExpanded ? (
            <X className="h-7 w-7 transition-transform duration-300" />
          ) : (
            <Phone className="h-7 w-7 animate-pulse" />
          )}
        </Button>

        {/* Pulse Animation Ring */}
        {!isExpanded && (
          <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-20"></div>
        )}

        {/* Notification Badge */}
        {!isExpanded && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        )}
      </div>

      {/* Tooltip */}
      {!isExpanded && (
        <div className="absolute bottom-20 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {locale === 'hi' ? 'मुफ्त परामर्श के लिए कॉल करें' : 'Call for Free Consultation'}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default FloatingClickToCall;