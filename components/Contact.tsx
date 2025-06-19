"use client";
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations, useLocale } from 'next-intl';

const Contact = () => {
  const t = useTranslations('contact');
  const locale = useLocale();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(`/${locale}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        setSubmitMessage(result.message);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          bill: '',
          additional: ''
        });
      } else {
        setSubmitMessage(result.message);
      }
    } catch (error) {
      setSubmitMessage(locale === 'hi' ? 'कुछ गलत हुआ। कृपया पुनः प्रयास करें।' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          {/* Contact Form */}
          <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl text-gray-900 font-bold">{t('form.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.firstName')}
                    </label>
                    <Input 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t('form.placeholder.firstName')} 
                      className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors" 
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
                      className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors" 
                      required
                    />
                  </div>
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
                    className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors" 
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
                    className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors" 
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('form.address')}
                  </label>
                  <Input 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={t('form.placeholder.address')} 
                    className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors" 
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('form.bill')}
                  </label>
                  <Input 
                    name="bill"
                    value={formData.bill}
                    onChange={handleChange}
                    placeholder={t('form.placeholder.bill')} 
                    className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors" 
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
                    className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors"
                  />
                </div>

                {submitMessage && (
                  <div className={`p-4 rounded-lg ${submitMessage.includes('success') || submitMessage.includes('सफलतापूर्वक') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {submitMessage}
                  </div>
                )}

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 py-3 text-lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? (locale === 'hi' ? 'भेजा जा रहा है...' : 'Submitting...') : t('form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-2xl shadow-lg">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('info.call.title')}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{t('info.call.description')}</p>
                    <p className="text-2xl font-bold text-orange-600 mb-1">{t('info.call.phone')}</p>
                    <p className="text-lg text-gray-600">{t('info.call.phoneNumber')}</p>
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
                    <p className="text-xl font-semibold text-gray-900">{t('info.email.address')}</p>
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

export default Contact;