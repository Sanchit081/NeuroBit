import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, TrendingUp, Zap, Brain, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          {/* Enhanced Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-medium mb-8 border border-purple-200 shadow-lg backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
            AI-Enhanced Productivity Tools
          </motion.div>

          {/* Enhanced Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Supercharge Your{' '}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Productivity
            </span>
            <br />
            <span className="text-gray-800">with Smart Digital Tools</span>
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            Designed for students, creators, and young professionals. 
            Get AI-enhanced Notion templates, GPT tools, and automation utilities 
            that actually work.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/templates" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg">
                View Templates
                <ArrowRight className="w-6 h-6 ml-3" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/products" className="inline-flex items-center px-8 py-4 bg-white text-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg border-2 border-gray-200 hover:border-purple-300">
                Explore Products
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div 
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl mx-auto mb-4 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">500+</h3>
              <p className="text-gray-600 font-medium">Happy Users</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl mx-auto mb-4 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">3x</h3>
              <p className="text-gray-600 font-medium">Productivity Boost</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl mx-auto mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">24/7</h3>
              <p className="text-gray-600 font-medium">AI Support</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 