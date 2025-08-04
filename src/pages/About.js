import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Heart,
  MessageCircle,
  Globe,
  Award,
  Target,
  Users,
  Clock,
  Zap,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Download,
  Star,
  Mail,
  Calendar,
  Shield
} from 'lucide-react';

const About = ({ user }) => {
  const achievements = [
    { icon: GraduationCap, text: "Computer Science Graduate", color: "text-blue-600" },
    { icon: Briefcase, text: "5+ Years in Tech Industry", color: "text-green-600" },
    { icon: Heart, text: "Passionate about AI & Productivity", color: "text-red-600" },
    { icon: Globe, text: "Helped 500+ Students & Creators", color: "text-purple-600" }
  ];

  const values = [
    {
      icon: Award,
      title: "Quality Over Quantity",
      description: "Every tool is tested and refined until it actually works.",
      color: "primary"
    },
    {
      icon: Heart,
      title: "User-First Design",
      description: "Built by someone who's been in your shoes.",
      color: "secondary"
    },
    {
      icon: Globe,
      title: "Accessible Innovation",
      description: "Making AI tools available to everyone, not just tech experts.",
      color: "green"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started as a student struggling with productivity tools and scattered systems."
    },
    {
      year: "2021",
      title: "First Breakthrough",
      description: "Created personal Notion system that actually worked and improved productivity 3x."
    },
    {
      year: "2022",
      title: "AI Integration",
      description: "Discovered GPT and began integrating AI into productivity workflows."
    },
    {
      year: "2023",
      title: "Community Building",
      description: "Started sharing tools with friends and fellow students, saw amazing results."
    },
    {
      year: "2024",
      title: "NeuroBit Launch",
      description: "Launched NeuroBit by SanchitVerse to help more people achieve their goals."
    }
  ];

  return (
    <div className="min-h-screen gradient-bg pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* User Profile Section - Only shown when user is logged in */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl p-6 mb-16 border border-purple-100"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.displayName || 'NeuroBit User'}
                </h2>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-purple-500" />
                    <span>{user.email}</span>
                  </div>
                  
                  {user.metadata && (
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>Member since {new Date(parseInt(user.metadata.creationTime)).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-50 rounded-lg p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Account Status</h3>
                      <p className="text-sm text-gray-600">
                        {user.emailVerified ? 'Verified Account' : 'Email verification pending'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Authentication</h3>
                      <p className="text-sm text-gray-600">
                        {user.providerData && user.providerData[0]?.providerId === 'google.com' 
                          ? 'Google Sign-In' 
                          : 'Email & Password'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-start">
                  <Link 
                    to="/" 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium hover:scale-105"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient">NeuroBit</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to democratize AI-powered productivity tools that actually work. 
            No fluff, no complexity—just smart solutions that help you focus on what matters most.
          </p>
        </motion.div>

        {/* Founder Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
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
              Building the Future of Productivity
            </h3>
            <p className="text-sm text-gray-500 mb-4">by SanchitVerse</p>
            
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
                    animate={{ opacity: 1, y: 0 }}
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
              animate={{ opacity: 1, y: 0 }}
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
            animate={{ opacity: 1, x: 0 }}
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
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  const colorClasses = {
                    primary: 'bg-primary-100 text-primary-600',
                    secondary: 'bg-secondary-100 text-secondary-600',
                    green: 'bg-green-100 text-green-600'
                  };
                  
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 ${colorClasses[value.color]} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{value.title}</h4>
                        <p className="text-gray-600 text-sm">{value.description}</p>
                      </div>
                    </div>
                  );
                })}
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

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start space-x-6"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
                  
                  <div className="ml-12">
                    <div className="text-sm font-semibold text-primary-600 mb-1">
                      {item.year}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">5,000+</h3>
            <p className="text-gray-600">Happy Users</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-secondary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">35,000+</h3>
            <p className="text-gray-600">Downloads</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">4.9</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
            <p className="text-gray-600">Support</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;