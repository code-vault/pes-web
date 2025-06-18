"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20' 
        : 'bg-white/70 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-2 rounded-xl shadow-lg">
              <Sun className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              SolarTech Pro
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105">Home</Link>
            <Link href="#services" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105">Services</Link>
            <Link href="#about" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105">About</Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105">Reviews</Link>
            <Link href="#contact" className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:scale-105">Contact</Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-6">
              Get Free Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 rounded-b-2xl shadow-xl">
              <Link href="#home" className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium">Home</Link>
              <Link href="#services" className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium">Services</Link>
              <Link href="#about" className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium">About</Link>
              <Link href="#testimonials" className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium">Reviews</Link>
              <Link href="#contact" className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 rounded-lg transition-all font-medium">Contact</Link>
              <div className="px-3 py-2">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg">
                  Get Free Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
