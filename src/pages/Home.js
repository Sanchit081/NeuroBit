import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCards from '../components/ProductCards';
import AboutFounder from '../components/AboutFounder';
import EmailWaitlist from '../components/EmailWaitlist';
import AuthModal from '../components/AuthModal';
import FloatingAITools from '../components/FloatingAITools';
import Header from '../components/Header';
import { auth, provider } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';

const Home = ({ email, setEmail, onSubmit, isSubmitted, showLoginModal, setShowLoginModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [user, setUser] = useState(null);

  // Watch Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setShowLoginModal(false);
        console.log(`Welcome ${currentUser.displayName || 'Back'}!`);
      }
    });

    return () => unsubscribe();
  }, [setShowLoginModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = formData;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in successfully!');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await userCredential.user.updateProfile({ displayName: name });
        console.log('Signed up successfully!');
      }

      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Auth error:', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <FloatingAITools />

      {/* Coming Soon Banner */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-400 text-black font-bold text-lg px-6 py-3 rounded-full shadow-lg animate-bounce">
        🚧 Coming Soon
      </div>

      <Header user={user} onGetStarted={() => setShowLoginModal(true)} />

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
