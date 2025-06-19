
import { Home, Building, Factory, Wrench, Calculator, HeadphonesIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {Link} from '@/i18n/navigation';


const ServicesPage = () => {
  const services = [
    {
      Icon: Home,
      title: "Residential Solar",
      description: "Custom solar solutions for homes. Reduce your electricity bills and increase property value with our premium residential installations.",
      features: ["Roof-mounted systems", "Ground-mount options", "Battery storage", "Smart monitoring"],
      gradient: "from-blue-500 to-cyan-500",
      detailedDescription: "Our residential solar solutions are designed to maximize your home's energy efficiency while providing significant cost savings. We handle everything from initial consultation to final installation and ongoing maintenance."
    },
    {
      Icon: Building,
      title: "Commercial Solar",
      description: "Scalable solar solutions for businesses. Cut operational costs and demonstrate environmental responsibility with commercial solar.",
      features: ["Large-scale installations", "Energy storage", "Power purchase agreements", "Tax incentives"],
      gradient: "from-green-500 to-emerald-500",
      detailedDescription: "Transform your business operations with our comprehensive commercial solar solutions. Reduce overhead costs, improve your company's sustainability profile, and take advantage of available tax incentives."
    },
    {
      Icon: Factory,
      title: "Industrial Solar",
      description: "High-capacity solar systems for industrial facilities. Maximize energy savings with robust, industrial-grade solar solutions.",
      features: ["Megawatt installations", "Grid-tie systems", "Energy management", "Performance monitoring"],
      gradient: "from-purple-500 to-violet-500",
      detailedDescription: "Our industrial solar installations are engineered for maximum efficiency and durability. We provide comprehensive energy management solutions that can handle the demanding requirements of industrial operations."
    },
    {
      Icon: Calculator,
      title: "Energy Audits",
      description: "Comprehensive energy assessments to optimize your solar investment. Identify savings opportunities and system requirements.",
      features: ["Site assessment", "Energy analysis", "ROI calculations", "Custom proposals"],
      gradient: "from-orange-500 to-red-500",
      detailedDescription: "Our detailed energy audits provide you with a complete understanding of your energy usage patterns and potential savings. We use advanced modeling software to create accurate projections and recommendations."
    },
    {
      Icon: Wrench,
      title: "Maintenance & Repair",
      description: "Keep your solar system performing at peak efficiency with our professional maintenance and repair services.",
      features: ["System cleaning", "Performance optimization", "Component replacement", "Warranty support"],
      gradient: "from-teal-500 to-cyan-500",
      detailedDescription: "Ensure your solar investment continues to deliver optimal returns with our comprehensive maintenance services. Our certified technicians provide regular inspections, cleaning, and performance optimization."
    },
    {
      Icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Round-the-clock monitoring and support for your solar system. Peace of mind with our comprehensive service guarantee.",
      features: ["Remote monitoring", "Technical support", "Emergency repairs", "System optimization"],
      gradient: "from-indigo-500 to-blue-500",
      detailedDescription: "Our 24/7 support ensures your solar system operates at peak performance around the clock. With remote monitoring and immediate response capabilities, we keep your system running smoothly."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Complete Solar Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            From consultation to installation and ongoing support, we provide end-to-end solar solutions
            tailored to your specific needs and requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className={`bg-gradient-to-br ${service.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                  {service.description}
                </CardDescription>
                <p className="text-gray-700 leading-relaxed">
                  {service.detailedDescription}
                </p>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-4 shadow-sm`}></div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
