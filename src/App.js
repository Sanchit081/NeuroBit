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
import { ToastProvider, useToast } from './components/Toast'; // custom toast

function AppContent() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const { showToast } = useToast();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail('');
    showToast("You're on the waitlist!");

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleGetStarted = () => {
    setShowLoginModal(true);
  };

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          setUser({
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          });
          showToast(`Welcome ${user.displayName || 'User'}!`);
        }
      } catch (error) {
        console.error('Redirect Sign-In Error:', error);
        if (error.code !== 'auth/credential-already-in-use') {
          showToast(`Sign-In failed: ${error.message}`, 'error');
        }
      }
    };

    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          avatar: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
              setUser={setUser}
              user={user}
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
  );
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  );
}

export default App;
