import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
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
            <span className="text-sm font-semibold text-orange-600">Get Started</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Ready to Go Solar?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
            Get your free solar consultation today. Our experts will assess your property 
            and provide a custom quote tailored to your energy needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl text-gray-900 font-bold">Get Your Free Quote</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input placeholder="John" className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input placeholder="Doe" className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <Input type="email" placeholder="john@example.com" className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input type="tel" placeholder="(555) 123-4567" className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Address
                </label>
                <Input placeholder="123 Main St, City, State ZIP" className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Average Monthly Electric Bill
                </label>
                <Input placeholder="$150" className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information
                </label>
                <Textarea 
                  placeholder="Tell us about your property, energy goals, or any questions you have..."
                  rows={4}
                  className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-orange-400 transition-colors"
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 py-3 text-lg">
                <Send className="mr-2 h-5 w-5" />
                Get My Free Solar Quote
              </Button>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Call Us</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">Ready to talk? Give us a call for immediate assistance.</p>
                    <p className="text-2xl font-bold text-orange-600 mb-1">(555) SOLAR-NOW</p>
                    <p className="text-lg text-gray-600">(555) 765-2766</p>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Email Us</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">Send us an email and we'll respond within 24 hours.</p>
                    <p className="text-xl font-semibold text-gray-900">info@solartechpro.com</p>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Visit Our Office</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">Come see our solar displays and meet our team.</p>
                    <p className="text-lg text-gray-900 leading-relaxed">
                      1234 Solar Avenue<br />
                      Green City, CA 90210
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
                    <h3 className="text-2xl font-bold mb-3">Business Hours</h3>
                    <div className="space-y-2 text-orange-100">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                      <p className="text-white font-semibold mt-4">Emergency service available 24/7</p>
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
