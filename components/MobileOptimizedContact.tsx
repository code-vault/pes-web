"use client";
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check, User, Home, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations, useLocale } from 'next-intl';

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

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Property Details', icon: Home },
    { id: 3, title: 'Energy Usage', icon: CreditCard }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address) {
      setSubmitMessage(locale === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/${locale}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          language: locale
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setSubmitMessage(
          locale === 'hi' 
            ? '🎉 धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है। हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।'
            : '🎉 Thank you! Your message has been sent successfully. Our team will contact you within 24 hours.'
        );
        // Reset form
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
      } else {
        setSubmitMessage(
          locale === 'hi'
            ? '❌ क्षमा करें, कुछ गलत हुआ। कृपया पुनः प्रयास करें या हमें +91 98765 43210 पर कॉल करें।'
            : '❌ Sorry, something went wrong. Please try again or call us at +91 98765 43210.'
        );
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitMessage(
        locale === 'hi' 
          ? '❌ नेटवर्क त्रुटि। कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।'
          : '❌ Network error. Please check your internet connection and try again.'
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
                  {t('form.firstName')}
                </label>
                <Input 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t('form.placeholder.firstName')} 
                  className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors h-12 text-base" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.lastName')}
                </label>
                <Input 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t('form.placeholder.lastName')} 
                  className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors h-12 text-base" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.email')}
                </label>
                <Input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('form.placeholder.email')} 
                  className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors h-12 text-base" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.phone')}
                </label>
                <Input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('form.placeholder.phone')} 
                  className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors h-12 text-base" 
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('form.address')}
              </label>
              <Textarea 
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={t('form.placeholder.address')} 
                className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors min-h-[80px] text-base" 
                required
              />
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
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
            <span className="text-sm font-semibold text-orange-600">{t('badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Mobile-Optimized Multi-Step Form */}
          <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl text-gray-900 font-bold">{t('form.title')}</CardTitle>
              
              {/* Progress Steps - Mobile Optimized */}
              <div className="flex justify-between items-center mt-6">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                      currentStep >= step.id 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
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
                      <div className={`hidden sm:block w-12 h-0.5 mx-4 ${
                        currentStep > step.id ? 'bg-orange-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()} className="space-y-6">
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
                    >
                      {locale === 'hi' ? 'पिछला' : 'Previous'}
                    </Button>
                  )}
                  
                  {currentStep < 3 ? (
                    <Button 
                      type="button"
                      onClick={nextStep}
                      disabled={currentStep === 1 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone)}
                      className={`bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                        currentStep === 1 ? 'w-full' : 'flex-1'
                      }`}
                    >
                      {locale === 'hi' ? 'अगला चरण' : 'Next Step'}
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-12 text-base ${
                        currentStep === 1 ? 'w-full' : 'flex-1'
                      }`}
                    >
                      <Send className="mr-2 h-5 w-5" />
                      {isSubmitting ? t('form.submitting') : t('form.submit')}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Click-to-Call Card */}
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-6">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{t('info.call.title')}</h3>
                    <p className="text-green-100 mb-4 leading-relaxed">{t('info.call.description')}</p>
                    <a 
                      href="tel:+919876543210"
                      className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Phone className="mr-3 h-5 w-5" />
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-to-br from-blue-400 to-cyan-500 p-4 rounded-2xl shadow-lg">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('info.email.title')}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{t('info.email.description')}</p>
                    <a 
                      href="mailto:info@purvodayaenergy.com"
                      className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {t('info.email.address')}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-to-br from-purple-400 to-violet-500 p-4 rounded-2xl shadow-lg">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('info.visit.title')}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{t('info.visit.description')}</p>
                    <p className="text-lg text-gray-900 leading-relaxed whitespace-pre-line">
                      {t('info.visit.address')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-amber-500 text-white border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{t('info.hours.title')}</h3>
                    <div className="space-y-2 text-orange-100">
                      <p>{t('info.hours.schedule.weekdays')}</p>
                      <p>{t('info.hours.schedule.saturday')}</p>
                      <p>{t('info.hours.schedule.sunday')}</p>
                      <p className="text-white font-semibold mt-4">{t('info.hours.schedule.emergency')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileOptimizedContact;