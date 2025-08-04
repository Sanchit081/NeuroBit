import React, { useState } from 'react';
import Hero from '../components/Hero';
import ProductCards from '../components/ProductCards';
import AboutFounder from '../components/AboutFounder';
import EmailWaitlist from '../components/EmailWaitlist';
import AuthModal from '../components/AuthModal';
import FloatingAITools from '../components/FloatingAITools';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useToast } from '../components/Toast';

const Home = ({
  email,
  setEmail,
  onSubmit,
  isSubmitted,
  showLoginModal,
  setShowLoginModal,
  setUser,
  user,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = formData;

    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        showToast(`Welcome back, ${result.user.displayName || 'User'}!`);
        setUser({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        });
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await result.user.updateProfile({ displayName: name });
        showToast('Account created successfully!');
        setUser({
          name,
          email: result.user.email,
          avatar: result.user.photoURL,
        });
      }

      setShowLoginModal(false);
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser({
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      });
      showToast(`Signed in as ${result.user.displayName || 'User'}!`);
      setShowLoginModal(false);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <FloatingAITools />

      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-400 text-black font-bold text-lg px-6 py-3 rounded-full shadow-lg animate-bounce">
        🚧 Coming Soon
      </div>

      {/* Modal is triggered by Header or CTA */}
      {showLoginModal && (
        <AuthModal
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={() => setShowLoginModal(false)}
          handleGoogleSignIn={handleGoogleSignIn}
        />
      )}

      <Hero user={user} />
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
