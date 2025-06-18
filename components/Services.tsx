
import { Home, Building, Factory, Wrench, Calculator, HeadphonesIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      Icon: Home,
      title: "Residential Solar",
      description: "Custom solar solutions for homes. Reduce your electricity bills and increase property value with our premium residential installations.",
      features: ["Roof-mounted systems", "Ground-mount options", "Battery storage", "Smart monitoring"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      Icon: Building,
      title: "Commercial Solar",
      description: "Scalable solar solutions for businesses. Cut operational costs and demonstrate environmental responsibility with commercial solar.",
      features: ["Large-scale installations", "Energy storage", "Power purchase agreements", "Tax incentives"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      Icon: Factory,
      title: "Industrial Solar",
      description: "High-capacity solar systems for industrial facilities. Maximize energy savings with robust, industrial-grade solar solutions.",
      features: ["Megawatt installations", "Grid-tie systems", "Energy management", "Performance monitoring"],
      gradient: "from-purple-500 to-violet-500"
    },
    {
      Icon: Calculator,
      title: "Energy Audits",
      description: "Comprehensive energy assessments to optimize your solar investment. Identify savings opportunities and system requirements.",
      features: ["Site assessment", "Energy analysis", "ROI calculations", "Custom proposals"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      Icon: Wrench,
      title: "Maintenance & Repair",
      description: "Keep your solar system performing at peak efficiency with our professional maintenance and repair services.",
      features: ["System cleaning", "Performance optimization", "Component replacement", "Warranty support"],
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      Icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Round-the-clock monitoring and support for your solar system. Peace of mind with our comprehensive service guarantee.",
      features: ["Remote monitoring", "Technical support", "Emergency repairs", "System optimization"],
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-lg mb-6">
            <span className="text-sm font-semibold text-orange-600">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Complete Solar Solutions
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
            From initial consultation to ongoing maintenance, we provide comprehensive solar services 
            for residential, commercial, and industrial customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/60 backdrop-blur-sm hover:-translate-y-2 overflow-hidden">
              <CardHeader className="pb-4">
                <div className={`bg-gradient-to-br ${service.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900 group-hover:text-gray-800 transition-colors">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
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
    </section>
  );
};

export default Services;
