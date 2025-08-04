import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Menu, X, User, LogOut, Info, Settings, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

const Header = ({ onGetStarted, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
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
              <div className="relative" ref={dropdownRef}>
                <motion.button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 focus:outline-none group bg-white/50 hover:bg-white/80 rounded-xl px-3 py-2 transition-all duration-200 border border-gray-200/50 hover:border-purple-200 hover:shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-md overflow-hidden ring-2 ring-white">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                      {user.displayName ? user.displayName.split(' ')[0] : 'User'}
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-24">
                      {user.email}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isProfileOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
                  </motion.div>
                </motion.button>
                
                {/* Enhanced Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl py-2 z-50 border border-gray-100 overflow-hidden backdrop-blur-sm"
                      style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg overflow-hidden">
                            {user.photoURL ? (
                              <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {user.displayName || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link 
                          to="/about" 
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-all duration-200 group"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                            <Info className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium">About</span>
                            <p className="text-xs text-gray-500">Learn more about NeuroBit</p>
                          </div>
                        </Link>
                        
                        <Link 
                          to="/products" 
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-all duration-200 group"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                            <Settings className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium">Products</span>
                            <p className="text-xs text-gray-500">Explore AI tools</p>
                          </div>
                        </Link>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 my-2"></div>

                      {/* Sign Out */}
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full text-left group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                          <LogOut className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium">Sign Out</span>
                          <p className="text-xs text-gray-500">Sign out of your account</p>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-2 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 w-full text-left rounded-lg"
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
