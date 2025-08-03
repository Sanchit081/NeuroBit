import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Brain, 
  Palette, 
  CheckCircle, 
  ExternalLink,
  Download,
  Sparkles,
  Star,
  Users,
  Clock,
  Shield
} from 'lucide-react';

const Products = () => {
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
        "Instant digital delivery",
        "Lifetime updates",
        "Community access"
      ],
      icon: FileText,
      color: "primary",
      gumroadLink: "https://gumroad.com/l/notion-gpt-kit",
      popular: true,
      stats: {
        users: "2,500+",
        rating: "4.9",
        downloads: "15,000+"
      }
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
        "PDF guides included",
        "Regular updates",
        "Support included"
      ],
      icon: Brain,
      color: "secondary",
      gumroadLink: "https://gumroad.com/l/gpt-tools-pack",
      popular: false,
      stats: {
        users: "1,800+",
        rating: "4.8",
        downloads: "12,000+"
      }
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
        "Analytics dashboards",
        "Creator community",
        "1-on-1 support"
      ],
      icon: Palette,
      color: "purple",
      gumroadLink: "https://gumroad.com/l/creator-kit",
      popular: false,
      stats: {
        users: "950+",
        rating: "4.9",
        downloads: "8,500+"
      }
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
    <div className="min-h-screen gradient-bg pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-gradient">Productivity Tools</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect productivity stack for your needs. Each kit is designed to solve specific challenges and boost your efficiency.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => {
            const colors = getColorClasses(product.color);
            const IconComponent = product.icon;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                
                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center mb-6`}>
                    <IconComponent className={`w-8 h-8 ${colors.text}`} />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-6">{product.subtitle}</p>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{product.stats.users} users</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{product.stats.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{product.stats.downloads}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-lg text-gray-500 line-through ml-3">{product.originalPrice}</span>
                    <span className="ml-2 text-sm text-green-600 font-medium">60% OFF</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href={product.gumroadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${colors.button} text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center text-lg`}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Buy Now
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help Choosing?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Not sure which kit is right for you? Check out our Notion + ChatGPT templates or reach out to us for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/templates" className="btn-primary">
              View Templates
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Products; 