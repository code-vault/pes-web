"use client";
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Shield, Zap, AlertCircle, Loader } from 'lucide-react';
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
    address: '',
    bill: '',
    additional: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Optional email validation
    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
          source: 'website_contact_form'
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setSubmitMessage(`Thank you ${formData.firstName}! We'll get back to you within 24 hours.`);
        
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            address: '',
            bill: '',
            additional: ''
          });
          setErrors({});
          setSubmitMessage('');
        }, 5000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitMessage('Sorry, there was an issue. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extract event handlers to avoid passing them as props
  const callExpert = () => window.location.href = 'tel:+919876543210';
  const sendEmail = () => window.location.href = 'mailto:info@purvodayaenergy.com?subject=Solar Installation Inquiry';

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Form */}
          <div className="order-2 lg:order-1">
            <ScrollReveal direction="left" delay={100}>
              <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Contact Us</h3>
                  <p className="text-orange-100">We'll respond to your inquiry within 24 hours</p>
                </div>
                
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Name Fields - Split into First and Last */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First name" 
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
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last name" 
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
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210" 
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
                        Email Address <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com" 
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

                    {/* Address Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Your property address" 
                        className={`h-12 text-base border-2 rounded-xl ${
                          errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-400'
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

                    {/* Monthly Bill Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Monthly Electricity Bill <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <Input 
                        name="bill"
                        value={formData.bill}
                        onChange={handleChange}
                        placeholder="₹15,000 per month" 
                        className="h-12 text-base border-2 rounded-xl border-gray-200 focus:border-orange-400"
                      />
                    </div>

                    {/* Additional Info Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Additional Information <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <Textarea 
                        name="additional"
                        value={formData.additional}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements, property type, roof space, or any specific questions..."
                        rows={4}
                        className="text-base border-2 rounded-xl resize-none border-gray-200 focus:border-orange-400"
                      />
                    </div>

                    {/* Submit Message */}
                    {submitMessage && (
                      <div className={`p-4 rounded-xl ${
                        submitMessage.includes('Thank you') 
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
                          Sending Request...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </button>

                    {/* Trust Message */}
                    <div className="text-center pt-2">
                      <p className="text-sm text-gray-500">
                        <Phone className="inline h-4 w-4 mr-1" />
                        We'll get back to you within 24 hours
                      </p>
                      
                      <div className="flex justify-center items-center space-x-4 mt-3 text-xs text-gray-400">
                        <span>✓ No spam</span>
                        <span>✓ Free consultation</span>
                        <span>✓ Licensed professionals</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <ScrollReveal direction="right" delay={300}>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg">
                  <span className="text-sm font-semibold text-orange-600">Ready to Go Solar?</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Switch to <span className="text-orange-500">Clean Energy</span> Today
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join over 2,500 satisfied customers who have made the switch to solar energy. Get your free consultation and start saving today.
                </p>
              </div>
            </ScrollReveal>

            {/* Benefits */}
            <ScrollReveal direction="right" delay={500}>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Save up to 90% on electricity bills</h3>
                    <p className="text-gray-600 text-sm">Reduce your monthly costs significantly</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">25-year warranty included</h3>
                    <p className="text-gray-600 text-sm">Complete peace of mind protection</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Zap className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Professional installation</h3>
                    <p className="text-gray-600 text-sm">Completed in 1-3 days by certified experts</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Information */}
            <ScrollReveal direction="right" delay={700}>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <button 
                    onClick={callExpert}
                    className="flex items-center space-x-3 w-full text-left hover:bg-orange-50 p-2 rounded-lg transition-colors"
                  >
                    <Phone className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">+91 98765 43210</p>
                      <p className="text-sm text-gray-600">Call us for immediate assistance</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={sendEmail}
                    className="flex items-center space-x-3 w-full text-left hover:bg-blue-50 p-2 rounded-lg transition-colors"
                  >
                    <Mail className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">info@purvodayaenergy.com</p>
                      <p className="text-sm text-gray-600">Email us your requirements</p>
                    </div>
                  </button>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">Mon-Sat: 9AM-6PM</p>
                      <p className="text-sm text-gray-600">Sunday: Emergency calls only</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-gray-900">Mumbai, Maharashtra</p>
                      <p className="text-sm text-gray-600">Visit our showroom</p>
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