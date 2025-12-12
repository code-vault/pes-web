"use client";
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Shield, Zap, AlertCircle, Loader, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations, useLocale } from 'next-intl';
import ScrollReveal from '@/components/ScrollReveal';

const SplitLayoutContact = () => {
  const t = useTranslations('contact');
  const locale = useLocale();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    state: 'Uttar Pradesh',
    district: 'Basti',
    bill: '',
    additional: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Indian states
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // Districts by state - focusing on UP
  const districtsByState: Record<string, string[]> = {
    'Uttar Pradesh': [
      'Basti', 'Gorakhpur', 'Sant Kabir Nagar',
      'Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha',
      'Auraiya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia',
      'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Bijnor',
      'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria',
      'Etah', 'Etawah', 'Faizabad', 'Farrukhabad', 'Fatehpur',
      'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 
      'Gonda', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras',
      'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat',
      'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kushinagar', 
      'Lakhimpur Kheri', 'Lalitpur', 'Lucknow', 'Maharajganj', 
      'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut',
      'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh',
      'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal',
      'Sant Ravidas Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti',
      'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 
      'Unnao', 'Varanasi'
    ]
  };

  const getDefaultDistricts = () => {
    return ['Select District'];
  };

  // Office locations
  const offices = [
    {
      name: t('offices.basti.name'),
      shortName: t('offices.basti.shortName'),
      address: t('offices.basti.address'),
      phone: t('offices.basti.phone'),
      email: t('offices.basti.email'),
      hours: t('offices.basti.hours'),
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
      isHeadquarters: false,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+91|91)?[\s-]?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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

    if (!formData.state) {
      newErrors.state = locale === 'hi' ? 'राज्य चुनें' : 'Please select a state';
    }
    
    if (!formData.district) {
      newErrors.district = locale === 'hi' ? 'जिला चुनें' : 'Please select a district';
    }

    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = t('form.validation.emailInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'state') {
      setFormData(prev => ({
        ...prev,
        state: value,
        district: value === 'Uttar Pradesh' ? 'Basti' : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
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
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          address: `${formData.district}, ${formData.state}`,
          bill: formData.bill,
          additional: formData.additional,
          submittedAt: new Date().toISOString(),
          language: locale,
          source: 'homepage_contact_form'
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
            state: 'Uttar Pradesh',
            district: 'Basti',
            bill: '',
            additional: ''
          });
          setErrors({});
          setSubmitMessage('');
        }, 5000);
      } else {
        console.error('Form submission error:', result);
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitMessage(t('form.messages.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDistrictsForState = (state: string) => {
    return districtsByState[state] || getDefaultDistricts();
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
              <span className="text-sm font-semibold text-orange-600">{t('badge')}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t('title')}
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('visitOffices')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {offices.map((office, index) => (
                <Card key={index} className={`hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-1 ${office.isHeadquarters ? 'ring-2 ring-orange-400' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <div className={`bg-gradient-to-br ${office.color} p-2 rounded-lg mr-3`}>
                        <Building className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{office.shortName}</h4>
                        {office.isHeadquarters && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">{t('offices.hqShort')}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-3 w-3 text-gray-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{office.address}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <a href={`tel:${office.phone}`} className="text-gray-700 hover:text-orange-500 transition-colors">
                          {office.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal direction="left" delay={500}>
              <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{t('form.title')}</h3>
                  <p className="text-orange-100">{t('form.subtitle')}</p>
                </div>
                
                <CardContent className="p-8">
                  <div className="space-y-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {locale === 'hi' ? 'राज्य' : 'State'} <span className="text-red-500">{t('form.labels.required')}</span>
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`w-full h-12 text-base border-2 rounded-xl px-4 bg-white ${
                            errors.state ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-400'
                          }`}
                          required
                        >
                          {states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        {errors.state && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.state}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {locale === 'hi' ? 'जिला' : 'District'} <span className="text-red-500">{t('form.labels.required')}</span>
                        </label>
                        <select
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          className={`w-full h-12 text-base border-2 rounded-xl px-4 bg-white ${
                            errors.district ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-400'
                          }`}
                          required
                        >
                          {getDistrictsForState(formData.state).map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>
                        {errors.district && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.district}
                          </p>
                        )}
                      </div>
                    </div>

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

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('form.fields.additional.label')} <span className="text-gray-400 text-xs">{t('form.labels.optional')}</span>
                      </label>
                      <Textarea 
                        name="additional"
                        value={formData.additional}
                        onChange={handleChange}
                        placeholder={t('form.fields.additional.placeholder')}
                        rows={3}
                        className="text-base border-2 rounded-xl resize-none border-gray-200 focus:border-orange-400"
                      />
                    </div>

                    {submitMessage && (
                      <div className={`p-4 rounded-xl ${
                        submitMessage.includes('Thank you') || submitMessage.includes('धन्यवाद') 
                          ? 'bg-green-50 text-green-800 border border-green-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        {submitMessage}
                      </div>
                    )}

                    <button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] h-14 text-lg font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="mr-2 h-5 w-5 animate-spin" />
                          {t('form.buttons.sendingMessage')}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          {t('form.buttons.sendMessage')}
                        </>
                      )}
                    </button>

                    <div className="text-center pt-2">
                      <p className="text-sm text-gray-500">
                        <Phone className="inline h-4 w-4 mr-1" />
                        {t('form.trust.responseTime')}
                      </p>
                      
                      <div className="flex justify-center items-center space-x-4 mt-3 text-xs text-gray-400">
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

          <div className="order-1 lg:order-2 space-y-8">
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

            <ScrollReveal direction="right" delay={900}>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t('rightSide.benefits.save.title')}</h3>
                    <p className="text-gray-600 text-sm">{t('rightSide.benefits.save.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t('rightSide.benefits.warranty.title')}</h3>
                    <p className="text-gray-600 text-sm">{t('rightSide.benefits.warranty.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Zap className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t('rightSide.benefits.installation.title')}</h3>
                    <p className="text-gray-600 text-sm">{t('rightSide.benefits.installation.description')}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={1100}>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('rightSide.immediateHelp.title')}</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => window.location.href = `tel:${t('contactInfo.phone')}`}
                    className="flex items-center space-x-3 w-full text-left hover:bg-orange-50 p-3 rounded-lg transition-colors"
                  >
                    <Phone className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">{t('rightSide.immediateHelp.callOffice')}</p>
                      <p className="text-sm text-gray-600">{t('contactInfo.phone')}</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => window.location.href = `mailto:${t('offices.basti.email')}`}
                    className="flex items-center space-x-3 w-full text-left hover:bg-blue-50 p-3 rounded-lg transition-colors"
                  >
                    <Mail className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">{t('rightSide.immediateHelp.emailRequirements')}</p>
                      <p className="text-sm text-gray-600">{t('offices.basti.email')}</p>
                    </div>
                  </button>
                  
                  <div className="flex items-center space-x-3 p-3">
                    <Clock className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">{t('rightSide.immediateHelp.hours')}</p>
                      <p className="text-sm text-gray-600">{t('contactInfo.emergencyNote')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitLayoutContact;