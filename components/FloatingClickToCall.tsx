"use client";
import { useState, useEffect, useRef } from 'react';
import { X, Bot, Send, User, Sparkles, MessageSquare } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

const AIChatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isBot: boolean, timestamp: Date}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const t = useTranslations('aiChatbot');

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

  // Enhanced keyword detection
  const detectIntent = (message: string) => {
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

  const getBotResponse = (userMessage: string) => {
    const intent = detectIntent(userMessage);
    
    if (intent !== 'fallback') {
      return t(`responses.${intent}`);
    }
    
    // Get random fallback response
    const fallbackIndex = Math.floor(Math.random() * 3);
    return t(`fallback.${fallbackIndex}`);
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
          const leadCapture = Math.floor(Math.random() * 2);
          const leadMsg = t(`leadCapture.${leadCapture}`);
          addMessage(leadMsg, true);
        }, 2000);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (keyword: string) => {
    const quickReplyText = t(`quickReplies.${keyword}`);
    handleSendMessage(quickReplyText);
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      const greetingIndex = Math.floor(Math.random() * 3);
      const greeting = t(`greetings.${greetingIndex}`);
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

  const quickRepliesData = [
    { text: t('quickReplies.cost'), keyword: 'cost' },
    { text: t('quickReplies.subsidy'), keyword: 'subsidy' },
    { text: t('quickReplies.installation'), keyword: 'installation' },
    { text: t('quickReplies.financing'), keyword: 'financing' },
    { text: t('quickReplies.types'), keyword: 'types' },
    { text: t('quickReplies.savings'), keyword: 'savings' }
  ];

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
          title={t('buttonTitle')}
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
            💬 {t('chatIndicator')}
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
                  {t('headerTitle')}
                  <Sparkles size={16} style={{ opacity: 0.8 }} />
                </h3>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
                  ⚡ {t('headerSubtitle')}
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
                  {t('quickTopics')}
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {quickRepliesData.slice(0, 6).map((reply, index) => (
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
                placeholder={t('inputPlaceholder')}
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
              {t('poweredBy')}
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