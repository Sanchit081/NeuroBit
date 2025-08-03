import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Enhanced Productivity Tools
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Supercharge Your{' '}
            <span className="text-gradient">Productivity</span>
            <br />
            with Smart Digital Tools
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Designed for students, creators, and young professionals. 
            Get AI-enhanced Notion templates, GPT tools, and automation utilities 
            that actually work.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link to="/templates" className="btn-primary flex items-center">
              View Templates
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/products" className="btn-secondary flex items-center">
              Explore Products
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-3">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Happy Users</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">3x</h3>
              <p className="text-gray-600">Productivity Boost</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
              <p className="text-gray-600">AI Support</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 