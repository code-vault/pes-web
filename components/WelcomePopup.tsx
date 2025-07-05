"use client";
import { useState, useEffect } from 'react';
import { X, Zap, Gift, CheckCircle, Clock, ArrowRight, ExternalLink, Phone, FileText, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

interface WelcomePopupProps {
  onClose?: () => void;
}

const WelcomePopup = ({ onClose }: WelcomePopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentBenefit, setCurrentBenefit] = useState(0);

  // Benefits carousel
  const benefits = [
    { text: "₹78,000 Central Government Subsidy", icon: Gift, color: "text-green-600" },
    { text: "Additional UP State Incentives", icon: Zap, color: "text-blue-600" },
    { text: "Zero Down Payment Options", icon: CheckCircle, color: "text-orange-600" },
    { text: "Complete Paperwork Assistance", icon: FileText, color: "text-purple-600" }
  ];

  useEffect(() => {
    // Show popup after 3 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 30; // Reset to 30 seconds
        }
        return prev - 1;
      });
    }, 1000);

    // Benefits carousel
    const benefitTimer = setInterval(() => {
      setCurrentBenefit(prev => (prev + 1) % benefits.length);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(benefitTimer);
    };
  }, [isVisible, benefits.length]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleGetSubsidy = () => {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-500"
      onClick={(e) => {
        // Close if clicking on backdrop
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-3xl w-full max-w-xl max-h-[90vh] overflow-hidden relative animate-in slide-in-from-bottom duration-700">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 border border-gray-200"
          aria-label="Close popup"
        >
          <X className="h-5 w-5 text-gray-700 hover:text-gray-900" />
        </button>

        {/* Header with Animation - Increased padding */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-5 text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-yellow-300/30 rounded-full blur-lg animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10 text-center">
            {/* Government Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/40 rounded-full px-3 py-1 mb-3">
              <Sparkles className="h-3 w-3 mr-1 text-yellow-300" />
              <span className="text-xs font-bold">Government Approved</span>
            </div>

            <h2 className="text-xl font-black mb-2 leading-tight">
              🎉 You're Eligible for
            </h2>
            <div className="text-2xl font-black text-yellow-300 mb-2 animate-pulse">
              ₹78,000+ FREE SUBSIDY
            </div>
            <p className="text-sm opacity-90 font-semibold">
              PM Surya Ghar + UP State Benefits
            </p>
          </div>
        </div>

        {/* Main Content - Slightly increased padding */}
        <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
          
          {/* Urgency Timer - Compact */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-red-500 animate-pulse flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900 text-sm">Limited Time!</p>
                <p className="text-xs text-gray-700">
                  Secure benefits in 
                  <span className="font-bold text-red-600 mx-1">
                    {timeLeft}s
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Animated Benefits Showcase - Compact */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-3 rounded-xl border border-blue-200">
            <div className="flex items-center justify-center mb-2">
              <div className="flex items-center space-x-2 transition-all duration-500">
                {React.createElement(benefits[currentBenefit].icon, {
                  className: `h-5 w-5 ${benefits[currentBenefit].color}`
                })}
                <span className="text-sm font-bold text-gray-800">
                  {benefits[currentBenefit].text}
                </span>
              </div>
            </div>
            
            {/* Progress dots */}
            <div className="flex justify-center space-x-1">
              {benefits.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentBenefit ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Government Schemes - Simplified */}
          <div className="space-y-3">
            
            {/* Central Government - Compact */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Gift className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-bold text-sm text-gray-900">PM Surya Ghar</span>
                </div>
                <a 
                  href="https://pmsuryaghar.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>• Up to ₹78,000 Direct Subsidy</div>
                <div>• 300 Units FREE Monthly</div>
              </div>
            </div>

            {/* UP State Government - Compact */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="font-bold text-sm text-gray-900">UPNEDA Scheme</span>
                </div>
                <a 
                  href="https://www.upneda.org.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>• Additional State Incentives</div>
                <div>• Fast Track Approvals</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons - Compact */}
          <div className="space-y-2">
            <Button 
              onClick={handleGetSubsidy}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Gift className="mr-2 h-4 w-4" />
              Claim ₹78,000+ Subsidy
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => window.location.href = 'tel:+919876543210'}
                variant="outline"
                className="border border-orange-500 text-orange-600 hover:bg-orange-50 text-xs py-2"
              >
                <Phone className="mr-1 h-3 w-3" />
                Call Now
              </Button>
              
              <Button 
                onClick={() => window.open('https://wa.me/919876543210?text=I%20want%20to%20know%20about%20government%20solar%20subsidies', '_blank')}
                variant="outline"
                className="border border-green-500 text-green-600 hover:bg-green-50 text-xs py-2"
              >
                <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Trust Indicators - Compact */}
          <div className="text-center pt-2 border-t border-gray-200">
            <div className="flex justify-center items-center space-x-3 text-xs text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                <span>Expert Help</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component to integrate with your main app
export const WelcomePopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in the last 24 hours
    const lastShown = localStorage.getItem('welcome-popup-shown');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (!lastShown || now - parseInt(lastShown) > oneDay) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    // Store timestamp to avoid showing again for 24 hours
    localStorage.setItem('welcome-popup-shown', Date.now().toString());
  };

  return (
    <>
      {children}
      {showPopup && <WelcomePopup onClose={handleClosePopup} />}
    </>
  );
};

export default WelcomePopup;