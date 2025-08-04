import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCards from '../components/ProductCards';
import AboutFounder from '../components/AboutFounder';
import EmailWaitlist from '../components/EmailWaitlist';
import AuthModal from '../components/AuthModal';
import FloatingAITools from '../components/FloatingAITools';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ email, setEmail, onSubmit, isSubmitted, showLoginModal, setShowLoginModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
        toast.success('Logged in successfully!');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await userCredential.user.updateProfile({ displayName: name });
        toast.success('Signed up successfully!');
      }

      setShowLoginModal(false);
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success('Logged in with Google!');
      setShowLoginModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative">
      {/* Floating Tool */}
      <FloatingAITools />

      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop pauseOnHover />

      {/* Coming Soon Banner */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9998] bg-yellow-400 text-black font-bold text-lg px-6 py-3 rounded-full shadow-lg animate-bounce">
        🚧 Coming Soon
      </div>

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
          handleGoogleSignIn={handleGoogleSignIn}
        />
      )}

      {/* Sections */}
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
