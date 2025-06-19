
import { Award, Users, Zap, Leaf, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

const AboutPage = () => {
  const stats = [
    { icon: Users, number: "2,500+", label: "Happy Customers", gradient: "from-blue-500 to-cyan-500" },
    { icon: Zap, number: "15MW+", label: "Solar Installed", gradient: "from-orange-500 to-amber-500" },
    { icon: Award, number: "12+", label: "Years Experience", gradient: "from-purple-500 to-violet-500" },
    { icon: Leaf, number: "50M+", label: "lbs CO₂ Saved", gradient: "from-green-500 to-emerald-500" }
  ];

  const highlights = [
    {
      icon: CheckCircle,
      title: "Licensed & Insured",
      description: "Fully certified solar installers with comprehensive insurance coverage for your peace of mind."
    },
    {
      icon: CheckCircle,
      title: "Premium Equipment",
      description: "Top-tier solar panels and components from industry-leading manufacturers like Tesla, SunPower, and LG."
    },
    {
      icon: CheckCircle,
      title: "25-Year Warranty",
      description: "Comprehensive warranty coverage on all installations and components with full performance guarantees."
    },
    {
      icon: CheckCircle,
      title: "Transparent Pricing",
      description: "No hidden fees, no pressure sales - just honest, upfront pricing with detailed cost breakdowns."
    }
  ];

  const timeline = [
    { year: "2012", title: "Company Founded", description: "Started with a vision to make solar accessible to everyone" },
    { year: "2015", title: "1,000 Installations", description: "Reached our first major milestone in residential solar" },
    { year: "2018", title: "Commercial Expansion", description: "Expanded into commercial and industrial solar solutions" },
    { year: "2021", title: "Battery Storage", description: "Added comprehensive energy storage solutions" },
    { year: "2024", title: "Industry Leader", description: "Recognized as the top solar installer in the region" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <Link to="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            About SolarTech Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Leading the solar revolution since 2012, transforming how homes and businesses
            power their future with clean, renewable energy.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl text-center">
              <div className={`bg-gradient-to-br ${stat.gradient} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              SolarTech Pro was born from a simple belief: everyone deserves access to clean, affordable energy.
              Founded in 2012 by a team of renewable energy engineers, we've grown from a small startup to
              the region's most trusted solar installation company.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our mission goes beyond just installing solar panels. We're building a sustainable future,
              one installation at a time. Every project we complete brings us closer to a world powered
              entirely by renewable energy.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we're proud to have helped thousands of families and businesses make the switch to solar,
              saving millions in energy costs and preventing tons of CO₂ emissions.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-bold">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-lg flex-shrink-0">
                  <highlight.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">{highlight.title}</h4>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
