import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCards from '../components/ProductCards';
import AboutFounder from '../components/AboutFounder';
import EmailWaitlist from '../components/EmailWaitlist';
import AuthModal from '../components/AuthModal';

const Home = ({ email, setEmail, onSubmit, isSubmitted, showLoginModal, setShowLoginModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [user, setUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For now, just show a success message since backend isn't connected yet
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set user data after successful login
      setUser({
        name: formData.name || 'User',
        email: formData.email,
        avatar: 'https://ui-avatars.com/api/?name=' + (formData.name || 'User') + '&background=random'
      });
      
      alert(`${isLogin ? 'Logged in' : 'Signed up'} successfully!`);
      setShowLoginModal(false);
      setFormData({ name: '', email: '', password: '' });
      
      // Redirect to products page after successful login
      window.location.href = '/products';
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowProfileDropdown(false);
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Floating Banner */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-400 text-black font-bold text-lg px-6 py-3 rounded-full shadow-lg animate-bounce">
        🚧 Coming Soon
      </div>

      {/* User Profile (only show if user is logged in) */}
      {user && (
        <div className="fixed top-4 right-6 z-50">
          <div className="relative profile-dropdown">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 bg-white rounded-lg shadow-lg px-4 py-2 hover:bg-gray-50 transition-all duration-200"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    // Add about functionality here
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  About
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showLoginModal && (
        <AuthModal
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      {/* Page Content */}
      <Hero />
      <ProductCards />
      <AboutFounder />
      <EmailWaitlist 
        email={email}
        setEmail={setEmail}
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
      />
    </div>
  );
};

export default Home;
