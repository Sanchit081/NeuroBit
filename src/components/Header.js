import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Products', href: '/products' },
    { name: 'Templates', href: '/templates' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      // Fallback to direct navigation
      window.location.href = '/products';
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - moved more to the left */}
          <Link to="/" className="flex items-center space-x-2 -ml-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">NeuroBit</span>
                <span className="text-xs text-gray-500">by SanchitVerse</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block"
          >
            <button 
              onClick={handleGetStarted} 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium hover:scale-105"
            >
              Get Started
            </button>
          </motion.div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={handleGetStarted} 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-full text-center py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
