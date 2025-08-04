import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Menu, X, User, LogOut, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

const Header = ({ onGetStarted, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

          {/* CTA Button or User Profile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-4"
          >
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-md overflow-hidden">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-purple-600 transition-colors duration-200">
                    {user.displayName ? user.displayName.split(' ')[0] : 'User'}
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                    <Link 
                      to="/about" 
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Info className="w-4 h-4" />
                      <span>About</span>
                    </Link>
                    <button 
                      onClick={() => {
                        auth.signOut();
                        setIsProfileOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={handleGetStarted} 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium hover:scale-105"
              >
                Get Started
              </button>
            )}
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
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 px-2 py-2 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-md overflow-hidden">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">
                      {user.displayName ? user.displayName.split(' ')[0] : 'User'}
                    </span>
                  </div>
                  <Link 
                    to="/about" 
                    className="flex items-center space-x-2 px-2 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Info className="w-4 h-4" />
                    <span>About</span>
                  </Link>
                  <button 
                    onClick={() => {
                      auth.signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-2 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 w-full text-left rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleGetStarted} 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-full text-center py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                >
                  Get Started
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
