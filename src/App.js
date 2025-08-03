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

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

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
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                email={email}
                setEmail={setEmail}
                onSubmit={handleEmailSubmit}
                isSubmitted={isSubmitted}
              />
            } 
          />
          <Route path="/products" element={<Products />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
