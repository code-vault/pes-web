"use client";
import { useState, useEffect } from 'react';
import { Phone, X, MessageCircle, Mail, Bot, Send } from 'lucide-react';
import { useLocale } from 'next-intl';

const FloatingClickToCall = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const locale = useLocale();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMainClick = () => {
    console.log('Main button clicked');
    setIsExpanded(!isExpanded);
  };

  const openChat = () => {
    console.log('Opening chat');
    setShowChat(true);
    setIsExpanded(false);
    if (messages.length === 0) {
      const greeting = locale === 'hi' 
        ? 'नमस्ते! 👋 मैं पूर्वोदय एनर्जी का AI असिस्टेंट हूं। मैं आपको सोलर एनर्जी के बारे में जानकारी देने में मदद कर सकता हूं!'
        : 'Hello! 👋 I\'m Purvodaya Energy\'s AI assistant. I can help you learn about solar energy solutions!';
      setMessages([greeting]);
    }
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

  const handleEmail = () => {
    window.location.href = 'mailto:info@purvodayaenergy.com?subject=Solar Installation Inquiry';
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    setMessages(prev => [...prev, inputMessage]);
    setInputMessage('');
    
    // Auto response
    setTimeout(() => {
      const response = locale === 'hi'
        ? 'धन्यवाद! हमारे विशेषज्ञ जल्द ही आपसे संपर्क करेंगे। अधिक जानकारी के लिए +91 98765 43210 पर कॉल करें।'
        : 'Thank you! Our experts will contact you soon. For more information, call +91 98765 43210.';
      setMessages(prev => [...prev, `🤖 ${response}`]);
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main floating button container */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
        {/* Expanded options */}
        {isExpanded && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '12px', 
            marginBottom: '16px',
            animation: 'slideUp 0.3s ease-out'
          }}>
            {/* Chat Bot Button */}
            <button
              onClick={openChat}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#3b82f6',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              title={locale === 'hi' ? 'AI चैटबॉट से बात करें' : 'Chat with AI Assistant'}
            >
              <Bot size={24} />
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#22c55e',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              title={locale === 'hi' ? 'WhatsApp पर संदेश भेजें' : 'Send WhatsApp Message'}
            >
              <MessageCircle size={24} />
            </button>

            {/* Email Button */}
            <button
              onClick={handleEmail}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#f59e0b',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              title={locale === 'hi' ? 'ईमेल भेजें' : 'Send Email'}
            >
              <Mail size={24} />
            </button>

            {/* Call Button */}
            <button
              onClick={handleCall}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#ef4444',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              title={locale === 'hi' ? 'तुरंत कॉल करें' : 'Call Now'}
            >
              <Phone size={24} />
            </button>
          </div>
        )}

        {/* Main CTA Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={handleMainClick}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: isExpanded 
                ? 'linear-gradient(to right, #ef4444, #dc2626)' 
                : 'linear-gradient(to right, #10b981, #059669)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
              transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = isExpanded ? 'rotate(45deg) scale(1.1)' : 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = isExpanded ? 'rotate(45deg)' : 'scale(1)'}
            title={locale === 'hi' ? 'संपर्क विकल्प' : 'Contact Options'}
          >
            {isExpanded ? <X size={28} /> : <MessageCircle size={28} />}
          </button>

          {/* Notification Badge */}
          {!isExpanded && (
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '24px',
              height: '24px',
              background: '#3b82f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              AI
            </div>
          )}

          {/* Pulse ring */}
          {!isExpanded && (
            <div style={{
              position: 'absolute',
              inset: '0',
              borderRadius: '50%',
              border: '4px solid #10b981',
              opacity: '0.3',
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }}></div>
          )}
        </div>
      </div>

      {/* Chat Modal */}
      {showChat && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          width: '320px',
          height: '400px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          border: '1px solid #e5e7eb',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Chat Header */}
          <div style={{
            background: 'linear-gradient(to right, #3b82f6, #2563eb)',
            color: 'white',
            padding: '16px',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
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

          {/* Chat Messages */}
          <div style={{ 
            flex: 1, 
            padding: '16px', 
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((message, index) => (
              <div key={index} style={{
                background: message.startsWith('🤖') ? '#f3f4f6' : '#3b82f6',
                color: message.startsWith('🤖') ? '#374151' : 'white',
                padding: '12px',
                borderRadius: '12px',
                fontSize: '14px',
                alignSelf: message.startsWith('🤖') ? 'flex-start' : 'flex-end',
                maxWidth: '80%'
              }}>
                {message}
              </div>
            ))}

            {/* Quick action buttons */}
            {messages.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                <button
                  onClick={handleCall}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '12px'
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
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  💬 {locale === 'hi' ? 'WhatsApp चैट' : 'WhatsApp Chat'}
                </button>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} style={{ 
            padding: '16px', 
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={locale === 'hi' ? 'अपना संदेश लिखें...' : 'Type your message...'}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingClickToCall;