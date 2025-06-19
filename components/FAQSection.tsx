"use client";
import { useState, useEffect } from 'react';
import { Phone, X, MessageCircle, Bot } from 'lucide-react';
import { useLocale } from 'next-intl';

const FloatingClickToCall = () => {
  const [showChat, setShowChat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    console.log('FloatingClickToCall component mounted');
    const timer = setTimeout(() => {
      setIsVisible(true);
      console.log('FloatingClickToCall is now visible');
    }, 1000); // Reduced to 1 second for testing
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    console.log('Button clicked!', { showChat, isVisible });
    setShowChat(true);
  };

  const handleWhatsApp = () => {
    const message = locale === 'hi' 
      ? 'नमस्ते! मुझे सोलर इंस्टॉलेशन के बारे में जानकारी चाहिए।'
      : 'Hello! I would like information about solar installation.';
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  console.log('Rendering FloatingClickToCall', { isVisible, showChat });

  if (!isVisible) {
    console.log('Component not visible yet');
    return null;
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Simple floating button */}
      <button
        onClick={handleButtonClick}
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(to right, #10b981, #059669)',
          border: 'none',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <MessageCircle size={24} />
      </button>

      {/* Simple chat modal */}
      {showChat && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            width: '300px',
            height: '400px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            border: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10000
          }}
        >
          {/* Chat header */}
          <div
            style={{
              background: 'linear-gradient(to right, #3b82f6, #2563eb)',
              color: 'white',
              padding: '16px',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={20} />
              <div>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
                  {locale === 'hi' ? 'पूर्वोदय AI असिस्टेंट' : 'Purvodaya AI Assistant'}
                </h3>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
                  {locale === 'hi' ? 'ऑनलाइन' : 'Online'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat content */}
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Bot message */}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  background: '#f3f4f6',
                  padding: '12px',
                  borderRadius: '12px',
                  maxWidth: '80%',
                  fontSize: '14px',
                  color: '#374151'
                }}
              >
                {locale === 'hi' 
                  ? '👋 नमस्ते! मैं आपको सोलर एनर्जी के बारे में जानकारी देने में मदद कर सकता हूं!'
                  : '👋 Hello! I can help you learn about solar energy solutions!'
                }
              </div>
            </div>

            {/* Quick action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              <button
                onClick={handleCall}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                📞 {locale === 'hi' ? 'कॉल करें' : 'Call Now'}
              </button>
              
              <button
                onClick={handleWhatsApp}
                style={{
                  background: '#22c55e',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                💬 {locale === 'hi' ? 'WhatsApp पर चैट करें' : 'Chat on WhatsApp'}
              </button>

              <button
                onClick={() => {
                  const response = locale === 'hi' 
                    ? 'सोलर सिस्टम की लागत ₹40,000 से ₹80,000 प्रति kW होती है। मुफ्त कोटेशन के लिए हमें कॉल करें!'
                    : 'Solar systems cost ₹40,000 to ₹80,000 per kW. Call us for a free quote!';
                  alert(response);
                }}
                style={{
                  background: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                💰 {locale === 'hi' ? 'सोलर की लागत?' : 'Solar Cost?'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingClickToCall;