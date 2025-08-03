import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Heart,
  MessageCircle,
  Globe,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutFounder = () => {
  const achievements = [
    { icon: GraduationCap, text: "Computer Science Graduate", color: "text-blue-600" },
    { icon: Briefcase, text: "5+ Years in Tech Industry", color: "text-green-600" },
    { icon: Heart, text: "Passionate about AI & Productivity", color: "text-red-600" },
    { icon: Globe, text: "Helped 500+ Students & Creators", color: "text-purple-600" }
  ];

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Founder Image & Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            {/* Placeholder for founder image */}
            <div className="w-48 h-48 mx-auto lg:mx-0 mb-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
              <User className="w-24 h-24 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet the Founder
            </h2>
            
            <h3 className="text-xl font-semibold text-primary-600 mb-4">
              SANCHIT SAINI
            </h3>
            <p className="text-sm text-gray-500 mb-4">LEADING: SanchitVerse</p>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Hi! I'm a tech enthusiast who believes that the right tools can transform how we work and learn. 
                             After struggling with scattered productivity systems myself, I created NeuroBit to help students, 
              creators, and young professionals achieve more with less stress.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              My mission is simple: democratize AI-powered productivity tools that actually work. 
              No fluff, no complexity—just smart solutions that help you focus on what matters most.
            </p>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <IconComponent className={`w-5 h-5 ${achievement.color}`} />
                    <span className="text-sm text-gray-600">{achievement.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto lg:mx-0"
            >
              <Link to="/contact" className="btn-primary flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Let's Connect
              </Link>
            </motion.div>
          </motion.div>

          {/* Story & Values */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                The Story Behind NeuroBit
              </h3>
              <p className="text-gray-600 leading-relaxed">
                It all started when I was juggling multiple projects in college—studies, side hustles, 
                and personal development. I tried every productivity app out there, but nothing clicked. 
                That's when I realized the problem wasn't the tools, but how they were designed.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Philosophy
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Quality Over Quantity</h4>
                    <p className="text-gray-600 text-sm">Every tool is tested and refined until it actually works.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-4 h-4 text-secondary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">User-First Design</h4>
                    <p className="text-gray-600 text-sm">Built by someone who's been in your shoes.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Accessible Innovation</h4>
                    <p className="text-gray-600 text-sm">Making AI tools available to everyone, not just tech experts.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl">
              <blockquote className="text-gray-700 italic mb-4">
                "The best productivity tools are the ones you actually use. 
                That's why every NeuroBit product is designed with real users in mind."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Founder, NeuroBit</div>
                 <div className="text-xs text-gray-500">by SanchitVerse</div>
                  <div className="text-sm text-gray-600">Building for the future</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounder; 