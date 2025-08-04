import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Templates from './pages/Templates';
import Admin from './pages/Admin';
import { auth, provider } from './firebase';
import { getRedirectResult, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleGetStarted = () => {
    setShowLoginModal(true);
  };

  // Handle redirect result from Firebase authentication
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // User is signed in
          const user = result.user;
          console.log('Redirect Sign-In Success:', user);
          setUser(user);
          alert(`Welcome ${user.displayName}`);
        }
      } catch (error) {
        console.error('Redirect Sign-In Error:', error);
        if (error.code !== 'auth/credential-already-in-use') {
          alert(`Sign-In failed: ${error.message}`);
        }
      }
    };
    
    handleRedirectResult();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('Auth state changed:', currentUser);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Keyboard shortcut for admin access (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        window.location.href = '/admin';
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <Router>
      <div className="min-h-screen gradient-bg">
        <Header onGetStarted={handleGetStarted} user={user} />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                email={email}
                setEmail={setEmail}
                onSubmit={handleEmailSubmit}
                isSubmitted={isSubmitted}
                showLoginModal={showLoginModal}
                setShowLoginModal={setShowLoginModal}
              />
            } 
          />
          <Route path="/products" element={<Products />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/about" element={<About user={user} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
