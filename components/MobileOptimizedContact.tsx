"use client";
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check, User, Home, CreditCard, AlertCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations, useLocale } from 'next-intl';
import ScrollReveal from '@/components/ScrollReveal';

const MobileOptimizedContact = () => {
  const t = useTranslations('contact');
  const locale = useLocale();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    bill: '',
    additional: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, title: locale === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Info', icon: User },
    { id: 2, title: locale === 'hi' ? 'संपत्ति विवरण' : 'Property Details', icon: Home },
    { id: 3, title: locale === 'hi' ? 'ऊर्जा उपयोग' : 'Energy Usage', icon: CreditCard }
  ];

  // Contact info cards data
  const contactCards = [
    {
      icon: Phone,
      title: t('info.call.title'),
      description: t('info.call.description'),
      action: "tel:+919876543210",
      actionText: locale === 'hi' ? 'विशेषज्ञ को कॉल करें' : 'Call Expert',
      gradient: "from-green-500 to-emerald-600",
      delay: 200
    },
    {
      icon: Mail,
      title: t('info.email.title'),
      description: t('info.email.description'),
      action: "mailto:info@purvodayaenergy.com?subject=Solar Installation Inquiry",
      actionText: locale === 'hi' ? 'ईमेल करें' : 'Email Us',
      gradient: "from-blue-400 to-cyan-500",
      delay: 400
    },
    {
      icon: MapPin,
      title: t('info.visit.title'),
      description: t('info.visit.description'),
      gradient: "from-purple-400 to-violet-500",
      delay: 600
    },
    {
      icon: Clock,
      title: t('info.hours.title'),
      description: t('info.hours.schedule.weekdays'),
      gradient: "from-orange-500 to-amber-500",
      delay: 800
    }
  ];

  // Trust indicators data
  const trustIndicators = [
    {
      icon: Check,
      title: locale === 'hi' ? 'लाइसेंसयुक्त' : 'Licensed',
      description: locale === 'hi' ? 'पूर्ण प्रमाणन' : 'Fully Certified',
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: Clock,
      title: locale === 'hi' ? 'साल वारंटी' : 'Year Warranty',
      number: "25",
      description: locale === 'hi' ? 'व्यापक कवरेज' : 'Comprehensive Coverage',
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: Phone,
      title: "24/7",
      description: locale === 'hi' ? 'ग्राहक सहायता' : 'Customer Support',
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: CreditCard,
      title: "₹0",
      description: locale === 'hi' ? 'डाउन पेमेंट' : 'Down Payment',
      gradient: "from-purple-400 to-violet-500"
    }
  ];

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+91|91)?[\s-]?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = locale === 'hi' ? 'पहला नाम आवश्यक है' : 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = locale === 'hi' ? 'अंतिम नाम आवश्यक है' : 'Last name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = locale === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = locale === 'hi' ? 'वैध ईमेल दर्ज करें' : 'Please enter a valid email';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = locale === 'hi' ? 'फोन नंबर आवश्यक है' : 'Phone number is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = locale === 'hi' ? 'वैध फोन नंबर दर्ज करें' : 'Please enter a valid phone number';
      }
    }

    if (step === 2) {
      if (!formData.address.trim()) {
        newErrors.address = locale === 'hi' ? 'पता आवश्यक है' : 'Address is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2)) {
      setSubmitMessage(
        locale === 'hi' 
          ? '❌ कृपया सभी आवश्यक फ़ील्ड भरें और पिछले चरणों की जांच करें।'
          : '❌ Please fill in all required fields and check previous steps.'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(`/${locale}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          language: locale,
          source: 'website_contact_form'
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setSubmitMessage(
          locale === 'hi' 
            ? `🎉 धन्यवाद ${formData.firstName}! आपका संदेश सफलतापूर्वक भेजा गया है। हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।`
            : `🎉 Thank you ${formData.firstName}! Your message has been sent successfully. Our team will contact you within 24 hours.`
        );
        
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            bill: '',
            additional: ''
          });
          setCurrentStep(1);
          setErrors({});
          setSubmitMessage('');
        }, 5000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitMessage(
        locale === 'hi' 
          ? '❌ क्षमा करें, कुछ गलत हुआ। कृपया पुनः प्रयास करें या हमें +91 98765 43210 पर कॉल करें।'
          : '❌ Sorry, something went wrong. Please try again or call us at +91 98765 43210.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.firstName')} <span className="text-red-500">*</span>
                </label>
                <Input 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t('form.placeholder.firstName')} 
                  className={`bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors h-12 text-base ${
                    errors.firstName ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.firstName}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.lastName')} <span className="text-red-500">*</span>
                </label>
                <Input 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t('form.placeholder.lastName')} 
                  className={`bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors h-12 text-base ${
                    errors.lastName ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.lastName}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.email')} <span className="text-red-500">*</span>
                </label>
                <Input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('form.placeholder.email')} 
                  className={`bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors h-12 text-base ${
                    errors.email ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.phone')} <span className="text-red-500">*</span>
                </label>
                <Input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('form.placeholder.phone')} 
                  className={`bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors h-12 text-base ${
                    errors.phone ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form.address')} <span className="text-red-500">*</span>
              </label>
              <Textarea 
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={t('form.placeholder.address')} 
                className={`bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors min-h-[80px] text-base ${
                  errors.address ? 'border-red-500 focus:border-red-500' : ''
                }`}
                required
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.address}
                </p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form.bill')}
              </label>
              <Input 
                name="bill"
                value={formData.bill}
                onChange={handleChange}
                placeholder={t('form.placeholder.bill')} 
                className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors h-12 text-base" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form.additional')}
              </label>
              <Textarea 
                name="additional"
                value={formData.additional}
                onChange={handleChange}
                placeholder={t('form.placeholder.additional')}
                rows={4}
                className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors text-base"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section with ScrollReveal */}
        <div className="text-center mb-20">
          <ScrollReveal direction="up" delay={100}>
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
              <span className="text-sm font-semibold text-orange-600">{t('badge')}</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={300}>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              {t('title')}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={500}>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              {t('subtitle')}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Enhanced Multi-Step Form with ScrollReveal */}
          <ScrollReveal direction="left" delay={700}>
            <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl text-gray-900 font-bold">{t('form.title')}</CardTitle>
                
                {/* Progress Steps */}
                <div className="flex justify-between items-center mt-6">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                        currentStep >= step.id 
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {currentStep > step.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="hidden sm:block ml-3">
                        <p className={`text-sm font-medium ${
                          currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`hidden sm:block w-12 h-0.5 mx-4 transition-colors ${
                          currentStep > step.id ? 'bg-orange-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  {renderStepContent()}

                  {submitMessage && (
                    <div className={`p-4 rounded-lg animate-in slide-in-from-top duration-300 ${
                      submitMessage.includes('🎉') || submitMessage.includes('सफलतापूर्वक') 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      <div className="flex items-start space-x-2">
                        <div className="flex-1">
                          {submitMessage}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between space-x-4">
                    {currentStep > 1 && (
                      <Button 
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="flex-1 h-12 text-base"
                        disabled={isSubmitting}
                      >
                        {locale === 'hi' ? 'पिछला' : 'Previous'}
                      </Button>
                    )}
                    
                    {currentStep < 3 ? (
                      <Button 
                        type="button"
                        onClick={nextStep}
                        className={`bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-12 text-base ${
                          currentStep === 1 ? 'w-full' : 'flex-1'
                        }`}
                      >
                        {locale === 'hi' ? 'अगला चरण' : 'Next Step'}
                      </Button>
                    ) : (
                      <Button 
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                          currentStep === 1 ? 'w-full' : 'flex-1'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="mr-2 h-5 w-5 animate-spin" />
                            {t('form.submitting')}
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            {t('form.submit')}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Contact Information Cards with ScrollReveal */}
          <div className="space-y-8">
            {contactCards.map((card, index) => (
              <ScrollReveal 
                key={index}
                direction="right" 
                delay={card.delay}
              >
                <Card className={`bg-gradient-to-br ${card.gradient} text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                        <card.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                        <p className="text-white/90 mb-4 leading-relaxed">{card.description}</p>
                        {card.action && (
                          <a 
                            href={card.action}
                            className="inline-flex items-center bg-white text-gray-800 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            <card.icon className="mr-3 h-5 w-5" />
                            {card.actionText}
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Trust Indicators with ScrollReveal */}
        <ScrollReveal direction="up" delay={1000}>
          <div className="mt-20 text-center">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {locale === 'hi' ? 'हमारे पर भरोसा क्यों करें?' : 'Why Trust Us?'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {trustIndicators.map((indicator, index) => (
                  <ScrollReveal 
                    key={index}
                    direction="scale" 
                    delay={1200 + (index * 100)}
                  >
                    <div className="text-center">
                      <div className={`bg-gradient-to-br ${indicator.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                        {indicator.number ? (
                          <span className="text-white font-bold text-lg">{indicator.number}</span>
                        ) : (
                          <indicator.icon className="h-8 w-8 text-white" />
                        )}
                      </div>
                      <p className="font-bold text-gray-900">
                        {indicator.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {indicator.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MobileOptimizedContact;