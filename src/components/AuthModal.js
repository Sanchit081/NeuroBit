import React from 'react';
import { auth, provider, signInWithPopup } from '../firebase';

const AuthModal = ({
  isLogin,
  setIsLogin,
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  onClose,
}) => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Sign-In Success:', user);

      const token = await user.getIdToken();
      // Optional: Send token to your backend if needed

      alert(`Welcome ${user.displayName}`);
      onClose();
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert('Google Sign-In failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden relative">
        {/* Side Illustration */}
        <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-6">
          <img
            src="/students-working.svg"
            alt="Students working"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Login / Signup Form */}
        <div className="w-full md:w-1/2 p-8 relative">
          <h2 className="text-2xl font-bold text-center mb-2">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {isLogin ? 'Access your account' : 'Create a new account'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full border border-gray-300 mt-4 py-2 rounded hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>

          {/* Toggle Login/Signup */}
          <p className="text-center text-sm mt-4 text-gray-600">
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <span
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Login
                </span>
              </>
            )}
          </p>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
