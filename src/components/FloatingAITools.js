import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Sparkles, Cpu, Bot, Rocket, Target, TrendingUp } from 'lucide-react';

const FloatingAITools = () => {
  const tools = [
    { icon: Brain, color: 'from-purple-400 to-pink-400', delay: 0 },
    { icon: Zap, color: 'from-yellow-400 to-orange-400', delay: 1 },
    { icon: Sparkles, color: 'from-blue-400 to-cyan-400', delay: 2 },
    { icon: Cpu, color: 'from-green-400 to-emerald-400', delay: 3 },
    { icon: Bot, color: 'from-indigo-400 to-purple-400', delay: 4 },
    { icon: Rocket, color: 'from-red-400 to-pink-400', delay: 5 },
    { icon: Target, color: 'from-teal-400 to-blue-400', delay: 6 },
    { icon: TrendingUp, color: 'from-violet-400 to-purple-400', delay: 7 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {tools.map((tool, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: tool.delay,
            ease: "easeInOut",
          }}
        >
          <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm`}>
            <tool.icon className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      ))}
      
      {/* Additional floating particles */}
      {[...Array(15)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingAITools; 