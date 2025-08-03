import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Brain, 
  Palette, 
  CheckCircle, 
  ExternalLink,
  Download,
  Sparkles,
  Zap
} from 'lucide-react';

const ProductCards = () => {
  const products = [
    {
      id: 1,
      title: "Notion + GPT Kit",
      subtitle: "AI-Enhanced Templates",
      price: "₹199",
      originalPrice: "₹499",
      description: "Complete Notion workspace with AI prompts, templates, and automation workflows for students and professionals.",
      features: [
        "50+ AI-optimized templates",
        "GPT integration prompts",
        "Student study systems",
        "Project management tools",
        "Instant digital delivery"
      ],
      icon: FileText,
      color: "primary",
      gumroadLink: "https://sanchit24.gumroad.com/l/yobzgu",
      popular: true
    },
    {
      id: 2,
      title: "GPT Tools Pack",
      subtitle: "AI Productivity Suite",
      price: "₹99",
      originalPrice: "₹299",
      description: "Curated collection of GPT prompts, automation scripts, and AI tools to boost your daily productivity.",
      features: [
        "100+ GPT prompts",
        "Email automation",
        "Content creation tools",
        "Research assistants",
        "PDF guides included"
      ],
      icon: Brain,
      color: "secondary",
      gumroadLink: "https://gumroad.com/l/gpt-tools-pack",
      popular: false
    },
    {
      id: 3,
      title: "Creator Kit",
      subtitle: "Content & Growth Tools",
      price: "₹299",
      originalPrice: "₹599",
      description: "Everything creators need: content calendars, growth strategies, and monetization templates with AI assistance.",
      features: [
        "Content planning systems",
        "Growth tracking tools",
        "Monetization templates",
        "Social media automation",
        "Analytics dashboards"
      ],
      icon: Palette,
      color: "purple",
      gumroadLink: "https://gumroad.com/l/creator-kit",
      popular: false
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary-50',
          text: 'text-primary-600',
          border: 'border-primary-200',
          button: 'bg-primary-600 hover:bg-primary-700'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary-50',
          text: 'text-secondary-600',
          border: 'border-secondary-200',
          button: 'bg-secondary-600 hover:bg-secondary-700'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-600',
          border: 'border-purple-200',
          button: 'bg-purple-600 hover:bg-purple-700'
        };
      default:
        return {
          bg: 'bg-primary-50',
          text: 'text-primary-600',
          border: 'border-primary-200',
          button: 'bg-primary-600 hover:bg-primary-700'
        };
    }
  };

  return (
    <section id="products" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-gradient">Productivity Stack</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each kit is designed to solve specific productivity challenges. 
            Pick the one that matches your goals.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const colors = getColorClasses(product.color);
            const IconComponent = product.icon;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`card relative ${product.popular ? 'ring-2 ring-primary-500' : ''}`}
              >
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 ${colors.text}`} />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.subtitle}</p>

                  {/* Price */}
                  <div className="flex items-center mb-4">
                    <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-lg text-gray-500 line-through ml-2">{product.originalPrice}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6">{product.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href={product.gumroadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${colors.button} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Buy Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Need help choosing? <a href="#contact" className="text-primary-600 hover:text-primary-700 font-medium">Contact us</a>
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>Instant digital delivery • 30-day money-back guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCards;
