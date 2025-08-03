import React, { useState } from 'react';
import Hero from '../components/Hero';
import ProductCards from '../components/ProductCards';
import AboutFounder from '../components/AboutFounder';
import EmailWaitlist from '../components/EmailWaitlist';
import AuthModal from '../components/AuthModal';

const Home = ({ email, setEmail, onSubmit, isSubmitted }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Failed');
      alert(`${isLogin ? 'Logged in' : 'Signed up'} successfully!`);
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Floating Banner */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-400 text-black font-bold text-lg px-6 py-3 rounded-full shadow-lg animate-bounce">
        🚧 Coming Soon
      </div>

      {/* Login Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-5 py-2 rounded-lg shadow hover:bg-gray-800 transition-all"
        >
          Login / Sign Up
        </button>
      </div>

      {/* Auth Modal */}
      {showModal && (
        <AuthModal
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
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
