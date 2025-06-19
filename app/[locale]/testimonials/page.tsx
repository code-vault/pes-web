
import { Star, Quote, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Residential Customer",
      rating: 5,
      text: "SolarTech Pro exceeded our expectations! The installation was seamless, and we're already seeing 80% reduction in our electricity bills. The team was professional and knowledgeable throughout the entire process.",
      gradient: "from-blue-500 to-cyan-500",
      project: "5kW Residential System",
      savings: "$1,200/year"
    },
    {
      name: "Mike Chen",
      location: "Business Owner",
      rating: 5,
      text: "Outstanding service from start to finish. They handled all the permits and paperwork, and the installation was completed on schedule. Our commercial facility is now saving thousands monthly on energy costs.",
      gradient: "from-green-500 to-emerald-500",
      project: "50kW Commercial System",
      savings: "$8,500/year"
    },
    {
      name: "Lisa Rodriguez",
      location: "Homeowner",
      rating: 5,
      text: "I was hesitant about solar, but SolarTech Pro made the process so easy. Their financing options made it affordable, and the system has been performing better than promised. Highly recommend!",
      gradient: "from-purple-500 to-violet-500",
      project: "7kW Residential System",
      savings: "$1,680/year"
    },
    {
      name: "David Thompson",
      location: "Property Manager",
      rating: 5,
      text: "We've worked with SolarTech Pro on multiple properties. Their attention to detail and customer service is unmatched. Every installation has been flawless, and maintenance support is excellent.",
      gradient: "from-orange-500 to-red-500",
      project: "Multiple Commercial Projects",
      savings: "$25,000/year"
    },
    {
      name: "Amanda Foster",
      location: "Residential Customer",
      rating: 5,
      text: "The solar system has transformed our home's energy efficiency. SolarTech Pro's team was incredibly professional, and they took care of everything from design to final inspection. Love our new solar panels!",
      gradient: "from-teal-500 to-cyan-500",
      project: "6kW Residential System",
      savings: "$1,440/year"
    },
    {
      name: "Robert Martinez",
      location: "Restaurant Owner",
      rating: 5,
      text: "Our restaurant's energy costs were killing our margins. SolarTech Pro designed a perfect system for our needs. Now we're saving over $2,000 monthly and showcasing our commitment to sustainability.",
      gradient: "from-indigo-500 to-blue-500",
      project: "25kW Commercial System",
      savings: "$24,000/year"
    },
    // Add more testimonials...
    ...Array.from({ length: 6 }, (_, i) => ({
      name: `Customer ${i + 7}`,
      location: i % 2 === 0 ? "Residential Customer" : "Business Owner",
      rating: 5,
      text: `Amazing experience with SolarTech Pro. The installation was smooth, and we're seeing great savings on our energy bills. Professional team and excellent customer service throughout the process.`,
      gradient: `from-${['blue', 'green', 'purple', 'orange', 'teal', 'indigo'][i % 6]}-500 to-${['cyan', 'emerald', 'violet', 'red', 'cyan', 'blue'][i % 6]}-500`,
      project: `${5 + i}kW ${i % 2 === 0 ? 'Residential' : 'Commercial'} System`,
      savings: `$${1200 + i * 200}/year`
    }))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <Link to="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Customer Testimonials
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Read what our satisfied customers have to say about their solar experience.
            Real stories from real people who made the switch to clean energy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2">
              <CardContent className="p-8 relative">
                <div className={`absolute top-4 right-4 bg-gradient-to-br ${testimonial.gradient} p-2 rounded-lg opacity-20`}>
                  <Quote className="h-6 w-6 text-white" />
                </div>

                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Project:</span>
                    <span className="font-semibold text-gray-700">{testimonial.project}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Annual Savings:</span>
                    <span className="font-semibold text-green-600">{testimonial.savings}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200/50 pt-6 mt-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-semibold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
