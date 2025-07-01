"use client";
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Shield, Zap, AlertCircle, Loader, ArrowLeft, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    bill: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Office locations from translations
  const offices = [
    {
      name: t('offices.basti.name'),
      shortName: t('offices.basti.shortName'),
      address: t('offices.basti.address'),
      phone: t('offices.basti.phone'),
      email: t('offices.basti.email'),
      hours: t('offices.basti.hours'),
      mapUrl: "https://maps.google.com/?q=Basti,Uttar+Pradesh",
      isHeadquarters: true,
      color: "from-orange-500 to-amber-500"
    },
    {
      name: t('offices.gorakhpur.name'),
      shortName: t('offices.gorakhpur.shortName'), 
      address: t('offices.gorakhpur.address'),
      phone: t('offices.gorakhpur.phone'),
      email: t('offices.gorakhpur.email'),
      hours: t('offices.gorakhpur.hours'),
      mapUrl: "https://maps.google.com/?q=Gorakhpur,Uttar+Pradesh",
      isHeadquarters: false,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: t('offices.santKabirNagar.name'),
      shortName: t('offices.santKabirNagar.shortName'),
      address: t('offices.santKabirNagar.address'),
      phone: t('offices.santKabirNagar.phone'),
      email: t('offices.santKabirNagar.email'),
      hours: t('offices.santKabirNagar.hours'),
      mapUrl: "https://maps.google.com/?q=Sant+Kabir+Nagar,Uttar+Pradesh",
      isHeadquarters: false,
      color: "from-green-500 to-emerald-500"
    }
  ];

  // Validation functions
  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+91|91)?[\s-]?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('form.validation.firstNameRequired');
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('form.validation.lastNameRequired');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('form.validation.phoneRequired');
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t('form.validation.phoneInvalid');
    }

    // Optional email validation
    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = t('form.validation.emailInvalid');
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

  const handleSubmit = async () => {
    if (!validateForm()) {
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
          source: 'contact_page_form'
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setSubmitMessage(result.message || t('form.messages.success', { name: formData.firstName }));
        
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            bill: '',
            message: ''
          });
          setErrors({});
          setSubmitMessage('');
        }, 5000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitMessage(t('form.messages.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('backToHome')}
              </Button>
            </Link>
            
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
                <span className="text-sm font-semibold text-orange-600">{t('getInTouch')}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                {t('contactTitle')}
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('contactSubtitle')}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Office Locations */}
        <ScrollReveal direction="up" delay={300}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('ourOfficeLocations')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offices.map((office, index) => (
                <Card key={index} className={`hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2 ${office.isHeadquarters ? 'ring-2 ring-orange-500' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`bg-gradient-to-br ${office.color} p-3 rounded-xl mr-4`}>
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{office.shortName}</h3>
                        {office.isHeadquarters && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                            {t('offices.headquarters')}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">{office.address}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <a href={`tel:${office.phone}`} className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                          {office.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-gray-700 hover:text-orange-500 transition-colors">
                          {office.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-purple-500 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{office.hours}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => window.open(office.mapUrl, '_blank')}
                      className="w-full mt-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white transition-all duration-300"
                      size="sm"
                    >
                      {t('offices.viewOnMaps')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Form - Left Side */}
          <div className="order-2 lg:order-1">
            <ScrollReveal direction="left" delay={500}>
              <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden h-full">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{t('form.sendMessage')}</h3>
                  <p className="text-orange-100">{t('form.subtitle')}</p>
                </div>
                
                <CardContent className="p-8 flex-1">
                  <div className="space-y-6">
                    {/* Name Fields - Split into First and Last */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('form.fields.firstName.label')} <span className="text-red-500">{t('form.labels.required')}</span>
                        </label>
                        <Input 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder={t('form.fields.firstName.placeholder')} 
                          className={`h-12 text-base border-2 rounded-xl ${
                            errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-400'
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
                          {t('form.fields.lastName.label')} <span className="text-red-500">{t('form.labels.required')}</span>
                        </label>
                        <Input 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder={t('form.fields.lastName.placeholder')} 
                          className={`h-12 text-base border-2 rounded-xl ${
                            errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-400'
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
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('form.fields.phone.label')} <span className="text-red-500">{t('form.labels.required')}</span>
                      </label>
                      <Input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('form.fields.phone.placeholder')} 
                        className={`h-12 text-base border-2 rounded-xl ${
                          errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-400'
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

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('form.fields.email.label')} <span className="text-gray-400 text-xs">{t('form.labels.optional')}</span>
                      </label>
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('form.fields.email.placeholder')} 
                        className={`h-12 text-base border-2 rounded-xl ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-400'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Monthly Bill Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('form.fields.bill.label')} <span className="text-gray-400 text-xs">{t('form.labels.optional')}</span>
                      </label>
                      <Input 
                        name="bill"
                        value={formData.bill}
                        onChange={handleChange}
                        placeholder={t('form.fields.bill.placeholder')} 
                        className="h-12 text-base border-2 rounded-xl border-gray-200 focus:border-orange-400"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('form.fields.message.label')} <span className="text-gray-400 text-xs">{t('form.labels.optional')}</span>
                      </label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t('form.fields.message.placeholder')}
                        rows={4}
                        className="text-base border-2 rounded-xl resize-none border-gray-200 focus:border-orange-400"
                      />
                    </div>

                    {/* Submit Message */}
                    {submitMessage && (
                      <div className={`p-4 rounded-xl ${
                        submitMessage.includes('Thank you') || submitMessage.includes('धन्यवाद') 
                          ? 'bg-green-50 text-green-800 border border-green-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        {submitMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] h-14 text-lg font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="mr-2 h-5 w-5 animate-spin" />
                          {t('form.buttons.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          {t('form.buttons.sendMessage')}
                        </>
                      )}
                    </button>

                    {/* Trust Message */}
                    <div className="text-center pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-2">
                        <CheckCircle className="inline h-4 w-4 mr-1 text-green-500" />
                        {t('form.trust.responseTime')}
                      </p>
                      
                      <div className="flex justify-center items-center space-x-4 text-xs text-gray-400">
                        <span>✓ {t('form.trust.noSpam')}</span>
                        <span>✓ {t('form.trust.freeConsultation')}</span>
                        <span>✓ {t('form.trust.licensedProfessionals')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Right Side - Information */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8 h-full flex flex-col">
              <ScrollReveal direction="right" delay={700}>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                    {t('rightSide.titleFull', { region: t('rightSide.region') })}
                  </h2>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('rightSide.subtitle')}
                  </p>
                </div>
              </ScrollReveal>

              {/* Benefits */}
              <ScrollReveal direction="right" delay={900}>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose Purvodaya Energy?</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{t('rightSide.benefits.save.title')}</h4>
                        <p className="text-gray-600 text-sm">{t('rightSide.benefits.save.description')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                        <Shield className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{t('rightSide.benefits.warranty.title')}</h4>
                        <p className="text-gray-600 text-sm">{t('rightSide.benefits.warranty.description')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                        <Zap className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{t('rightSide.benefits.installation.title')}</h4>
                        <p className="text-gray-600 text-sm">{t('rightSide.benefits.installation.description')}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                        <Building className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Local presence & support</h4>
                        <p className="text-gray-600 text-sm">Three offices across Eastern UP for better customer service</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Emergency Contact */}
              <ScrollReveal direction="right" delay={1100}>
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-3">{t('rightSide.immediateHelp.title')}</h3>
                  <p className="text-orange-100 mb-4 text-sm">
                    Call our headquarters for urgent solar inquiries or technical support.
                  </p>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => window.location.href = `tel:${t('contactInfo.phone')}`}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 transition-all duration-300 w-full"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      {t('rightSide.immediateHelp.callOffice')}: {t('contactInfo.phone')}
                    </Button>
                    <p className="text-orange-100 text-xs text-center">
                      {t('rightSide.immediateHelp.hours')} | {t('contactInfo.emergencyNote')}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}